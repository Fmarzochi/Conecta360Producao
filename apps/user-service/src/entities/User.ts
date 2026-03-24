import { Document, model, Schema, Types } from 'mongoose';

export interface IUserAddress { 
    street: string,
    number: string,
    city: string,
    state: string,
    cep: string,
    complement: string,
    district: string,
    country: string,
}

export interface IUserPCD {
    hasDisability: string,
    disabilityType: string,
    cid: string,
    conditionDescription: string,
}

export interface IUserResume {
    fileUrl: string,
    fileName: string,
}

export interface IUser extends Document {
    tenantId?: Types.ObjectId,
    companyId?: Types.ObjectId,
    email: string,
    passwordHash: string,
    fullName: string,
    cpf: string,
    birthDate?: Date,
    phoneNumber?: number,
    address?: IUserAddress,
    pcd?: IUserPCD,
    resume?: IUserResume,
    role: string,
    status: string,
}

const UserSchema = new Schema<IUser>({
    tenantId: {type: Schema.Types.ObjectId, ref: 'tenants', index: true},
    companyId: { type: Schema.Types.ObjectId, ref: 'companies'},
    email: { type: String, required: true, unique: true, lowercase: true},
    passwordHash: { type: String, required: true},
    fullName: { type: String, required: true },
    cpf: { type: String, required: true, unique: true},
    birthDate: { type: Date},
    phoneNumber: { type: Number, unique: true},
    address: {
        street: { type: String },
        number: { type: String },
        city: { type: String },
        state: { type: String },
        cep: { type: String },
        complement: { type: String },
        district: { type: String },
        country: { type: String },
    },
    pcd: {
        hasDisability: { type: String },
        disabilityType: { type: String },
        cid: { type: String },
        conditionDescription: { type: String }
    },
    resume: {
        fileUrl: { type: String },
        fileName: { type: String },
    },
    role: { type: String, default: 'USER'},
    status: { type: String, default: 'ACTIVE'},
}, { timestamps: true });

export const UserModel = model<IUser>('user', UserSchema);
