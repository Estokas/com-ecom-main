import { prop, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Service } from "./Service"
import { Order } from './Order';

export enum ServiceStatus {
    CANCELLED,
    COMPLETED,
    TROUBLESHOOTING,
    PROCESSING
}

export class ServiceOrder {
    _id?: string

    /*
        -1 = Cancelled
        0 = Compelted
        1 = Troubleshooting
    */
        
    @prop({ ref: 'Service', required: true })
    service?: Ref<Service>

    @prop({ ref: 'Order', required: true })
    orderDetails?: Ref<Order>
}

export const ServiceOrderModel = getModelForClass(ServiceOrder, { schemaOptions: { timestamps: true } });