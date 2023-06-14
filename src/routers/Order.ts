import express from 'express';
import _, { omit } from 'lodash';
import { OrderModel, OrderStatus } from '../entity/Order';
import { ProductOrderModel } from '../entity/ProductOrder';
import { ServiceOrderModel } from '../entity/ServiceOrder';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/orders', async (req, res) => {
    let user = res.locals?.payload?.user
    const matched = user.role == 'USER' ? [{
        $match: {
            user: new mongoose.Types.ObjectId(user?._id)
        }
    }] : []

    const orders = await OrderModel.aggregate([
        ...matched,

        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $addFields: {
                user: { $arrayElemAt: ['$user', 0] }
            }
        }
    ]).sort({ _id: -1 })

    res.json(orders)
})

router.get('/order/:id', async (req, res) => {
    const order = await OrderModel.findById(req?.params?.id)
    res.json(order)
})

router.post('/add/order', async (req, res) => {
    let order = req?.body
    let user = res.locals?.payload?.user
    order.orderId = Date.now()?.toString()
    order = await OrderModel.create({
        ...omit(order, ['productOrder', 'serviceOrder']),
        user,
        status: OrderStatus.PROCESSING
    })

    console.log(order)

    let productOrder = req?.body?.productOrder
    let serviceOrder = req?.body?.serviceOrder

    await ProductOrderModel.insertMany(
        productOrder?.map((item: any) => ({
            ...item,
            orderDetails: order,
        })) || []
    )
    
    await ServiceOrderModel.insertMany(
        serviceOrder?.map((item: any) => ({
            ...item,
            orderDetails: order,
        })) || []
    )

    return res.send(order)
})

router.put('/update/order/:id', async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(order)
})


export default router