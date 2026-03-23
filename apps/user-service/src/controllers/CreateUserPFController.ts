import { Request, Response } from 'express';
import { CreateUserPFService } from '../services/CreateUserPFServices';


export class CreateUserPFController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createUser = new CreateUserPFService();

        try {
            const payload = req.body;

            const user = await createUser.execute(payload);
            return res.status(201).json({ user });
        } catch (error: any) {
            console.error("--- [PF Register] Erro detalhado:", error);
            return res.status(400).json({ message: "Não foi possível registrar o usuário.", error})
        }

    }
}
