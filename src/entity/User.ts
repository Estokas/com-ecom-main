import { prop, getModelForClass } from '@typegoose/typegoose';


export class User {
    _id?: string

    @prop({ required: true })
    firstName?: string

    @prop({ required: true })
    lastName?: string

    @prop({ required: true })
    email?: string

    @prop({ required: true })
    password?: string

    @prop({ default: true })
    enable?: boolean

    @prop()
    role?: string    //ADMIN, CUSTOMER
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });