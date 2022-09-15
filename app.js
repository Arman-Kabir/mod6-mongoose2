const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// Schema Design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name mus tbe at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unique value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }

    }
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // },
    // updatedAt:{
    //     type:Date,
    //     default:Date.now
    // }
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]


}, {
    timestamps: true
})

// Schema -> Model -> Query

const Product = mongoose.model('Product', productSchema)


app.get('/', (req, res) => {
    res.send("Route is workigng");

});


// post route - posting to db
app.post('/api/v1/product', async (req, res) => {

    try {
        // to store in db --- save or create

        // const result = await Product.create(req.body);

        const product = new Product(req.body)
        

        // instance creation -> Do Something -> save()
        if (product.quantity == 0) {
            product.status = 'out-of-stock'
        }
        const result = await product.save();


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
})

module.exports = app;