import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UserModel } from '../entities/User';
import { CompanyModel } from '../entities/Company';
import { UserCompanyModel } from '../entities/UserCompany';
import { TenantModel } from '../entities/Tenant';
import { logger } from "../config/logger";


export class CreateUserPJServices {
  async execute(data: any) {
    if (!cnpj.isValid(data.cnpj)) throw new Error("CNPJ Inválido");
    if (!cpf.isValid(data.user.cpf)) throw new Error("CPF do representante inválido");
    logger.warn({ cpf: data.user.cpf }, 'Tentativa de cadastro com CPF inválido');
    

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      logger.info({ tradeName: data.tradeName, tenantId: data.tenantId }, 'Registro de novo usuário PJ');
      
      const [newTenant] = await TenantModel.create([{ 
        name: data.tradeName,
        status: 'ACTIVE' 
      }], { session });
      
      const tenantId = newTenant._id; 
      logger.info({ tenantId: data.tenantId, tradeName: data.tradeName }, 'Tenant criado com sucesso');

      const passwordHash = await hash(data.user.password, 8);
      const [user] = await UserModel.create([{
        ...data.user,
        tenantId,
        passwordHash,
        role: 'ADMIN', 
        status: 'ACTIVE'
      }], { session });

      logger.info({ tenantId: data.tenantId, role: data.user.role }, 'Usuário criado com sucesso');


      const [company] = await CompanyModel.create([{
        tenantId,
        cnpj: data.cnpj,
        legalName: data.legalName,
        tradeName: data.tradeName,
        corporateEmail: data.corporateEmail,
        status: 'ACTIVE'
      }], { session });

      logger.info({ legalName: data.legalName, corporateEmail: data.corporateEmail }, 'Company criado com sucesso');

      await UserCompanyModel.create([{
        tenantId,
        userId: data.user._id,
        companyId: company._id,
        relationshipType: 'OWNER',
        status: 'ACTIVE'
      }], { session });
      logger.info({ userId: data.user._id, companyId: company._id }, 'UserCompany criado com sucesso');

      await session.commitTransaction();
            
      return { user, company };

    } catch (error: any) {
      await session.abortTransaction();
      logger.error({ error: error.message }, 'Falha ao registrar usuário PJ');
      throw error;
    } finally {
      session.endSession();
    }
  }
}