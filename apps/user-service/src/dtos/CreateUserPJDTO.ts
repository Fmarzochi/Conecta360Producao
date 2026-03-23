export interface CreateUserPJDto {
    tenantId: string;
    user: {
        email: string;
        password: string;
        fullName: string;
        cpf: string;
    }
    company: {
        legalName: string;
        tradeName: string;
        cnpj: string;
        corporateEmail: string;
        phoneNumber?: string;
    }
}