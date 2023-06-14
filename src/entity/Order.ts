import { Ref, getModelForClass, prop } from "@typegoose/typegoose"
import { User } from "./User"

export enum OrderStatus {
    CANCELLED,
    COMPLETED,
    PROCESSING,
    TO_REVIEW
}

export class Order {
    _id?: string

    @prop({ required: true })
    orderId?: string

    @prop({ required: true })
    totalQuantity?: number
    
    @prop({ required: true })
    totalPrice?: number

    @prop({ ref: 'user', required: false })
    user?: Ref<User>

    @prop({ enum: OrderStatus, required: true })
    status?: OrderStatus

    @prop()
    deliveryDate?: Date

    // @prop({ ref: 'Service' })
    // serviceOrder?: mongoose.Types.Array<Ref<ServiceOrder>>

    // @prop({ ref: 'ProductOrder' })
    // productOrder?: mongoose.Types.Array<Ref<ProductOrder>>
        
    @prop({ required: true })
    address?: string
}

export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } });