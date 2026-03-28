import { CreateUserPJServices } from '../src/services/CreateUserPJServices'; 
import { UserCompanyModel } from '../src/entities/UserCompany';
import { CompanyModel } from '../src/entities/Company';
import { UserModel } from '../src/entities/User';
import { TenantModel } from '../src/entities/Tenant';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

jest.mock('../src/entities/User');
jest.mock('../src/entities/Company');
jest.mock('../src/entities/Tenant');
jest.mock('../src/entities/UserCompany');
jest.mock('cpf-cnpj-validator');
jest.mock('bcrypt');

describe('CreateUserPJService', () => {
    let createUserPjService: CreateUserPJServices;

    const mockSession = {
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
    };

    const userId = new mongoose.Types.ObjectId();
    const companyData = {
        cnpj: '12345678000199',
        legalName: 'Empresa Teste LTDA',
        tradeName: 'Empresa Teste',
        corporateEmail: 'contato@empresa.com',
        user: {
            _id: userId, 
            cpf: '12345678909',
            password: 'password123',
            fullName: 'Dono da Empresa',
            email: 'dono@empresa.com'
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        createUserPjService = new CreateUserPJServices();
        jest.spyOn(mongoose, 'startSession').mockResolvedValue(mockSession as any);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });


    it("Deve lançar um erro se o CNPJ for inválido", async () => {
        (cnpj.isValid as jest.Mock).mockReturnValue(false);

        await expect(createUserPjService.execute(companyData as any)).rejects.toThrow("CNPJ Inválido");

        expect(mockSession.abortTransaction).toHaveBeenCalled();
    });

    it("Deve lançar erro se cpf do representante for inválido", async () => {
        (cnpj.isValid as jest.Mock).mockReturnValue(true);
        (cpf.isValid as jest.Mock).mockReturnValue(false);

        await expect(createUserPjService.execute(companyData as any))
            .rejects
            .toThrow("CPF do representante inválido");

        expect(mockSession.abortTransaction).toHaveBeenCalled();    
    });

    it("Deve criar Tenant, Usuário associado e relacionamento com a empresa com sucesso", async () => {
        (cnpj.isValid as jest.Mock).mockReturnValue(true);
        (cpf.isValid as jest.Mock).mockReturnValue(true);
        (hash as jest.Mock).mockResolvedValue('pj_hash');

        const mockTenantId = new mongoose.Types.ObjectId();
        const mockTenant = [{ _id: mockTenantId, name: companyData.tradeName}];
        (TenantModel.create as jest.Mock).mockResolvedValue(mockTenant);

        const mockUser = [{ userId, ...companyData.user}];
        (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

        const mockCompanyId = new mongoose.Types.ObjectId();
        const mockCompany = [{ _id: mockCompanyId, cnpj: companyData.cnpj}];
        (CompanyModel.create as jest.Mock).mockResolvedValue(mockCompany);

        const r = await createUserPjService.execute(companyData as any);

        expect(TenantModel.create).toHaveBeenCalledWith([{
            name: companyData.tradeName,
            status: 'ACTIVE'
        }], { session: mockSession });

        expect(UserModel.create).toHaveBeenCalledWith([{
            ...companyData.user,
            tenantId: mockTenantId,
            passwordHash: 'pj_hash',
            role: 'ADMIN',
            status: 'ACTIVE'
        }], { session: mockSession });

        expect(CompanyModel.create).toHaveBeenCalledWith([{
            tenantId: mockTenantId,
            cnpj: companyData.cnpj,
            legalName: companyData.legalName,
            tradeName: companyData.tradeName,
            corporateEmail: companyData.corporateEmail,
            status: 'ACTIVE'
        }], { session: mockSession });

        expect(UserCompanyModel.create).toHaveBeenCalledWith([{
            tenantId: mockTenantId,
            userId: companyData.user._id,
            companyId: mockCompanyId,
            relationshipType: 'OWNER',
            status: 'ACTIVE'
        }], { session: mockSession });

        expect(hash).toHaveBeenCalledWith(companyData.user.password, 8);
        expect(mockSession.commitTransaction).toHaveBeenCalled();
        expect(mockSession.endSession).toHaveBeenCalled();

        expect(r).toEqual({ user: mockUser[0], company: mockCompany[0] });

        
    });







});