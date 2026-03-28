import { CreateUserPFDTO } from "src/dtos/CreateUserPFDTO";
import { UserModel } from "../entities/User";
import { UserCompanyModel } from "../entities/UserCompany";
import { cpf } from "cpf-cnpj-validator";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import { logger } from "../config/logger";


export class CreateUserPFService {
    async execute(data: CreateUserPFDTO) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            logger.info({ email: data.email, tenantId: data.tenantId }, 'Registro de novo usuário PF');

            if (!cpf.isValid(data.cpf)) {
                logger.warn({ cpf: data.cpf }, 'Tentativa de cadastro com CPF inválido');
                throw new Error("CPF Inválido");
            }

            const userExists = await UserModel.findOne({ email: data.email, tenantId: data.tenantId });
            if (userExists) {
                logger.warn({ email: data.email }, 'Tentativa de cadastro com e-mail já existente');
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
            } 

            logger.info({ tenantId: data.tenantId, userId: user._id }, 'Usuário PF registrado com sucesso');

            await session.commitTransaction();
            return user;
            
        } catch (error: any) {
            await session.abortTransaction();
            logger.error({ error: error.message }, 'Falha ao registrar usuário PF');
            throw error;
        } finally {
            session.endSession();
        }
        
    }
}
