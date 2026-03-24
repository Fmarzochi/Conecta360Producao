import { CreateUserPFDTO } from "src/dtos/CreateUserPFDTO";
import { UserModel } from "../entities/User";
import { UserCompanyModel } from "../entities/UserCompany";
import { cpf } from "cpf-cnpj-validator";
import { hash } from "bcrypt";
import mongoose from "mongoose";


export class CreateUserPFService {
    async execute(data: CreateUserPFDTO) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            if (!cpf.isValid(data.cpf)) throw new Error("CPF Inválido");
            const userExists = await UserModel.findOne({ email: data.email, tenantId: data.tenantId });
            
            if (userExists) {
                throw new Error("Este usuário já existe");
            }

            const passwordHash = await hash(data.password, 8);
            const { password, ...userData } = data;

            const user = await UserModel.create({
                ...userData, 
                passwordHash
            });

            if (data.companyId) {
                await UserCompanyModel.create([{
                    tenantId: data.tenantId,
                    userId: user._id,
                    companyId: data.companyId,
                    relationshipType: data.relationshipType || 'EMPLOYEE',
                    status: 'ACTIVE'
                }], { session });
                await session.commitTransaction();
                return user;
            }
        } catch (error) {
            await session.abortTransaction();
            throw error;
        }
        session.endSession();

    }
}

