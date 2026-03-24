import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UserModel } from '../entities/User';
import { CompanyModel } from '../entities/Company';
import { UserCompanyModel } from '../entities/UserCompany';
import { TenantModel } from '../entities/Tenant';


export class CreateUserPJServices {
  async execute(data: any) {
    if (!cnpj.isValid(data.cnpj)) throw new Error("CNPJ Inválido");
    if (!cpf.isValid(data.user.cpf)) throw new Error("CPF do representante inválido");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [newTenant] = await TenantModel.create([{ 
        name: data.tradeName,
        status: 'ACTIVE' 
      }], { session });

      const tenantId = newTenant._id; 

      const passwordHash = await hash(data.user.password, 8);
      const user = await UserModel.create([{
        ...data.user,
        tenantId,
        passwordHash,
        role: 'ADMIN', 
        status: 'ACTIVE'
      }], { session });

      const [company] = await CompanyModel.create([{
        tenantId,
        cnpj: data.cnpj,
        legalName: data.legalName,
        tradeName: data.tradeName,
        corporateEmail: data.corporateEmail,
        status: 'ACTIVE'
      }], { session });

      await UserCompanyModel.create([{
        tenantId,
        userId: data.user._id,
        companyId: company._id,
        relationshipType: 'OWNER',
        status: 'ACTIVE'
      }], { session });

      await session.commitTransaction();
            
      return { user, company };

    } catch (error: any) {
      await session.abortTransaction();
      console.error("[ERRO] Cadastro cancelado. Motivo:", error.message);
    } finally {
      session.endSession();
    }
  }
}