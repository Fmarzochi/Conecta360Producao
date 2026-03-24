import { Request, Response } from 'express';
import { CreateUserPJServices } from '../services/CreateUserPJServices';

export class CreateUserPJController {
  async handle(req: Request, res: Response) {
    const createUserPJ = new CreateUserPJServices();

    try {
      const newCompany = await createUserPJ.execute(req.body);

      return res.status(201).json(newCompany);
    } catch (error: any) {
      return res.status(400).json({
        message: "Não foi possível realizar o cadastro da Pessoa Jurídica.",
        details: error.message
      });
    }
  }
}