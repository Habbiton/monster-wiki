import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const MonsterGenders: string[] = ['female', 'male', 'other'];
export const MonsterNationalities: string[] = ['US', 'SP', 'DE'];

export type MonsterDocument = HydratedDocument<Monster>;

@Schema()
export class Monster {
  @Prop({ type: { first: String, last: String, title: String }, _id: false })
  name: { first: string; last: string; title: string };

  @Prop()
  gender: string;

  @Prop()
  description: string;

  @Prop()
  nationality: Array<string>;

  @Prop()
  image: string;

  @Prop()
  goldBalance: number;

  @Prop()
  speed: number;

  @Prop()
  health: number;

  @Prop({ select: false })
  secretNotes: string;

  @Prop({ select: false })
  password: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
