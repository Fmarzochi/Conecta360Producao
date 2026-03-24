import { Document, model, Schema, Types } from 'mongoose';

export interface ITenant extends Document {
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
}

const TenantSchema = new Schema<ITenant>({
    name: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });

export const TenantModel = model<ITenant>('tenants', TenantSchema);