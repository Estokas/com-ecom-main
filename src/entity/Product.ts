import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
export class Product {
   _id?: string

    @prop({ required: true })
    name?: string

    @prop({ required: true })
    category?: string

    @prop({ required: true })
    shop?: string

    @prop()
    description?: string

    @prop({ required: true })
    price?: number

    @prop()
    variant?: string

    @prop({ default: true })
    enable?: boolean

    @prop()
    image?: Express.Multer.File
}

export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } });