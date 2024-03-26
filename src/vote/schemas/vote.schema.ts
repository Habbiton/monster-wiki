import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Monster' })
  monster: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
