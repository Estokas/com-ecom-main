import { prop, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Product } from "./Product"
import { Order } from './Order';



export class ProductOrder {
    _id?: string

    @prop()
    deliveryDate?: Date

    @prop({ required: true })
    quantity?: number

    @prop({ ref: 'Product', required: true })
    product?: Ref<Product>

    @prop({ ref: 'Order', required: true })
    orderDetails?: Ref<Order>
}


export const ProductOrderModel = getModelForClass(ProductOrder, { schemaOptions: { timestamps: true } });