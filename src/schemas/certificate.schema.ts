import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificateDocument = Certificate & Document;

@Schema()
export class Certificate {
  @Prop()
  title: string;

  @Prop()
  logo: string;

  @Prop()
  text: string;

  @Prop()
  signature: string;

  @Prop()
  signaturePersonTitle: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
