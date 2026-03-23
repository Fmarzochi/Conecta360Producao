import { CreateUserPFDTO } from "src/dtos/CreateUserPFDTO";
import { UserModel } from "../entities/User";
import { cpf } from "cpf-cnpj-validator";
import { hash } from "bcrypt";


export class CreateUserPFService {
    async execute(data: CreateUserPFDTO) {
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

        return user;

    }
}
