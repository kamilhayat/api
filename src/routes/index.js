const express = require('express')
const productSchema = require('../schema')
require('dotenv').config();

const router = express.Router();


router.post('/', async (req, res) => {

    const { name, company, price,  imageURI, description, category, featured } = req.body;
    if (!name || !company || !price  || !imageURI || !description || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const product = new productSchema({
            name,
            company,
            price,
            imageURI,
            description,
            category,
            featured
        })
        await product.save();
        res.status(201).json({ message: 'Product added succesfully' })

    }
    catch (error) {
        res.status(400).json({ message: 'Error creating product',error });
    }

})

router.get('/', async (req, res) => {
    try {
        const products = await productSchema.find();
        res.json(products);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching products' });
    }
})

router.get('/featured', async (req, res) => {
    try {
        const products = await productSchema.find({ featured: true });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured products', error });

    }
})

router.delete('/:id', async(req,res)=>{
    const {id}= req.params;

    try{
        const deletedProduct = await productSchema.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' }); 
          }
        res.json({message: 'product deleted', deletedProduct})
    }
    catch(error){
        

        res.status(400).json({message: 'Error deleting product',error})
    }
})
module.exports = router;