import express from 'express';
import { ProductModel } from '../entity/Product';
import _ from 'lodash';
import multerStorage from "../multerStorage";
import multer from 'multer';

const upload = multer({ storage: multerStorage })
const router = express.Router();

router.get('/products', async (req, res) => {
    const products = await ProductModel.find({})
    res.json(products)
})

router.get('/product/:id', async (req, res) => {
    const product = await ProductModel.findById(req?.params?.id)
    res.json(product)
})

router.post('/add/product', upload.single('image'), async (req, res) => {
    let product = req?.body
    product.name = _.startCase(product.name)
    product.category = product.category
    product.variant = product.variant?.toLocaleLowerCase()
    product.image = req.file

    product = await ProductModel.create(product)
    return res.send(product)
})

router.put('/update/product/:id', async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(product)
})
 

export default router