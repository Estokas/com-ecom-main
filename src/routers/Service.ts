import express from 'express';
import { ServiceModel } from '../entity/Service';
import _ from 'lodash';
import multerStorage from "../multerStorage";
import multer from 'multer';
import { ProductModel } from '../entity/Product';

const upload = multer({ storage: multerStorage })
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/services', async (req, res) => {
    const services = await ServiceModel.find({})
    res.json(services)
})

router.get('/service/:id', async (req, res) => {
    const service = await ServiceModel.findById(req?.params?.id)
    res.json(service)
})

router.post('/add/service', upload.single('image'), async (req, res) => {
    let service = req?.body

    service.name = _.startCase(service.name)
    service.category = _.lowerCase(service.category)
    service.image = req.file
    service.shop = _.startCase(service.shop)
    service.description = _.startCase(service.description)
    service.fee = _.startCase(service.fee)
    service.enable = service.enable

    service = await ServiceModel.create(service)
    return res.send(service)
})

router.put('/update/service/:id', async (req, res) => {
    const service = await ServiceModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(service)
})


router.get('/shops', async (req, res) => {
  let serviceShopNames = await ServiceModel.distinct('shop');
  let productShopNames = await ProductModel.distinct('shop');

  let shopNames = [...new Set([...serviceShopNames, ...productShopNames])];
  return res.send(shopNames);
})
 
router.get('/shops/:name', async (req, res) => {
    console.log(req?.params?.name);
    let services = await ServiceModel.find({ shop: req?.params?.name })
    let products = await ProductModel.find({ shop: req?.params?.name })
    
    console.log('Services for', req?.params?.name, ':', services);
    console.log('Products for', req?.params?.name, ':', products);
    let services_products = [...new Set([...services, ...products])];
    return res.send(services_products);
})

router.get('/category/service',async (req, res) => {
  let serviceCategoryNames = await ServiceModel.distinct('category')
  return res.send(serviceCategoryNames)
})

export default router