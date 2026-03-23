import { Document, model, Schema, Types } from 'mongoose';

export interface IUserCompany extends Document {
    tenantId: Types.ObjectId;
    userId: Types.ObjectId;
    companyId: Types.ObjectId;
    relationshipType: 'OWNER' | 'EMPLOYEE' | 'PARTNER';
    status: string;
}

const UserCompanySchema = new Schema<IUserCompany>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'tenants', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'companies', required: true },
    relationshipType: { 
    type: String, 
    enum: ['OWNER', 'EMPLOYEE', 'PARTNER'], 
    required: true 
  },
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true })

UserCompanySchema.index({ userId: 1, companyId: 1 }, { unique: true });

export const UserCompanyModel = model<IUserCompany>('user', UserCompanySchema);
