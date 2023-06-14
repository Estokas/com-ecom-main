import express from 'express';
import { ServiceModel } from '../entity/Service';
import { ProductModel } from '../entity/Product';
import _ from 'lodash';
import multerStorage from "../multerStorage";
import multer from 'multer';

const upload = multer({ storage: multerStorage })
const router = express.Router();

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
    ServiceModel.distinct('shop', function(err: any, serviceShopNames: any) {
        if (err) throw err;
        console.log('Shop names in the service collection:', serviceShopNames);
        
        // Retrieve all the shop names from the product collection
        ProductModel.distinct('shop', function(err: any, productShopNames: any) {
          if (err) throw err;
          console.log('Shop names in the product collection:', productShopNames);
          
          // Combine the shop names from both collections and remove duplicates
          const allShopNames = [...new Set([...serviceShopNames, ...productShopNames])];
          console.log('All shop names in the database:', allShopNames);
          
          return res.send(allShopNames)
        });
      });
})

router.get('/shops/:name', async (req, res) => {
    ServiceModel.find({ shop: req?.params?.name }, function(err: any, services: any) {
      if (err) throw err;
      console.log('Services for', req?.params?.name, ':', services);
      
      // Retrieve the products for the specified shop name
      ProductModel.find({ shop: req?.params?.name }, function(err: any, products: any) {
        if (err) throw err;
        console.log('Products for', req?.params?.name, ':', products);
        
        return res.send({"services": services, "products": products})
      });
    });
})

export default router