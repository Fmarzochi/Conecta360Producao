export interface OptionalUserPFDTO {
    address: { street: string; number: string; city: string; state: string; cep: string; };
    pcd: { hasDisability: string; disabilityType: string; cid: string; };
    resume: { fileUrl: string; fileName: string; };
}

export interface CreateUserPFDTO extends OptionalUserPFDTO {
    tenantId?: string;
    email: string;
    password: string;
    fullName: string;
    cpf: string;
    birthDate?: Date;
    phoneNumber?: number;
}