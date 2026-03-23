import { Document, model, Schema, Types } from 'mongoose';

export interface ICompany extends Document {
    tenantId: Types.ObjectId;
    legalName: string;
    tradeName: string;
    cnpj: string;
    corporateEmail: string;
    status: 'ACTIVE' | 'INACTIVE';
}

const CompanySchema = new Schema<ICompany>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'tenants', required: true, index: true },
    legalName: { type: String, required: true },
    tradeName: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true }, 
    corporateEmail: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });

export const CompanyModel = model<ICompany>('user', CompanySchema);