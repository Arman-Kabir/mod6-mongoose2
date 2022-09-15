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
            value: ["kg", "litre", "pcs"],
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
        required:true,
        enum: {
            value: ["in-stock", "out-of-stock", "discontinued"],
            message:"Status can't be {VALUE}"
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
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier"
    },
    categories:[{
        name:{
            type:String,
            required:true
        },
        _id:mongoose.Schema.Types.ObjectId
    }]

    
},{
    timestamps:true
})

app.get('/', (req, res) => {
    res.send("Route is workigng");
});


module.exports = app;