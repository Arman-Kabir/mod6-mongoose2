const Product = require('../models/Product');

exports.getProducts =  async (req, res, next) => {

    try {
        // const products = await Product.where("name").equals(/\w/).where("quantity").gt(100).limit(2) ;

        const product = await Product.find({});

        res.status(200).json({
            status: "success",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message
        })
    }
};

exports.createProduct =  async (req, res) => {

    try {
        // to store in db --- save or create
        // const result = await Product.create(req.body);
        const product = new Product(req.body)
        // instance creation -> Do Something -> save()
        // if (product.quantity == 0) {
        //     product.status = 'out-of-stock'
        // }
        const result = await product.save();
        result.logger();
        res.status(200).json({
            status: 'Success',
            message: 'Data inserted successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "data is not inserted",
            error: error.message
        })
    }
    // console.log(req.body);
    // console.log("hello");
};