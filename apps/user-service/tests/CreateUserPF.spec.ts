import { CreateUserPFService } from '../src/services/CreateUserPFServices'; 
import { UserModel } from '../src/entities/User';
import { UserCompanyModel } from '../src/entities/UserCompany';
import { cpf } from 'cpf-cnpj-validator';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

jest.mock('../src/entities/User');
jest.mock('../src/entities/UserCompany');
jest.mock('cpf-cnpj-validator');
jest.mock('bcrypt');

describe('CreateUserPFService', () => {
    let createUserPFService: CreateUserPFService;

    const mockSession = {
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
    };

    const userData = {
        tenantId: new mongoose.Types.ObjectId(),
        companyId: new mongoose.Types.ObjectId(),
        email: 'testeunitario@example.com',
        cpf: '12345678909',
        password: 'password123',
        fullName: 'Nome Completo',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        createUserPFService = new CreateUserPFService();
        jest.spyOn(mongoose, 'startSession').mockResolvedValue(mockSession as any);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Deve lançar um erro se cpf for inválido', async () => {
        (cpf.isValid as jest.Mock).mockReturnValue(false);

        await expect(createUserPFService.execute(userData as any))
            .rejects
            .toThrow("CPF Inválido");

        expect(mockSession.abortTransaction).toHaveBeenCalled();
    });

    it('Deve lançar erro se usuário já existir', async () => {
        (cpf.isValid as jest.Mock).mockReturnValue(true);

        const existingUser = { 
            email: userData.email,
            tenantId: userData.tenantId
        };

        (UserModel.findOne as jest.Mock).mockResolvedValue(existingUser);

        await expect(createUserPFService.execute(userData as any)).rejects.toThrow("Este usuário já existe");

        await expect(UserModel.findOne).toHaveBeenCalledWith({
            email: userData.email,
            tenantId: userData.tenantId,
        })
        expect(UserModel.create).not.toHaveBeenCalled();
        expect(mockSession.abortTransaction).toHaveBeenCalled();
    });

     it('deve criar um usuário com sucesso', async () => {
        (cpf.isValid as jest.Mock).mockReturnValue(true);
        (UserModel.findOne as jest.Mock).mockResolvedValue(null); 
        (hash as jest.Mock).mockResolvedValue('senha_hash');

        const newUser = {
            _id: new mongoose.Types.ObjectId(), 
            ...userData
        };

        (UserModel.create as jest.Mock).mockResolvedValue(newUser);

        const r = await createUserPFService.execute(userData as any);

        expect(hash).toHaveBeenCalledWith(userData.password, 8);

        //pro caso do usuário ter preencido o campo companyId
        expect(UserCompanyModel.create).toHaveBeenCalledWith(
            [{
                tenantId: userData.tenantId,
                userId: newUser._id, 
                companyId: userData.companyId,
                relationshipType: 'EMPLOYEE', 
                status: 'ACTIVE'              
            }], { session: mockSession } 
        );

        expect(mockSession.commitTransaction).toHaveBeenCalled();
        expect(r).toEqual(newUser);
    });


});

