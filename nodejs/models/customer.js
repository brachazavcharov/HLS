const { fileLoader } = require("ejs");
const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        lowercase: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    },
    mail: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "please enter a valid email!"],
        unique: true,
        message: '{VALUE} is not supported'
    },
    height: {
        type: Number,
        required: true,
        // min: 100,
        // max: 200,
        message: 'enter your real height'
    },
    gender: {
        type: Boolean,
        //enum: { values: ["male", "female"] },
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}\d{3}\d{4}/.test(v);
            },
            message: "enter a valid phone number!"
        },
        required: [true, 'User phone number required']
    },
    password: {
        type: String,
        required: true
    },
    chest: {
        type: Number,
        required: [true, "enter your chest size"]
    },
    waist: {
        type: Number,
        required: [true, "enter your waist size"]
    },
    pelvis: {
        type: Number,
        required: [true, "enter your pelvis size"]
    },
    joinDate: {
        type: Date,
        value:new Date(),
        required: [true, "enter a join date"]
    },
    customerWeights: {
        type: [{
            date: {
                type: Date,
                value:new Date(),
                required: true
            },
            currentWeight: {
                type: Number,
                min: 40,
                max: 300,
                required: true
            }
        }],
        required: true
    },
    weightImg: {
        type:{
            date: {
                type: Date,
                value:new Date(),
                required: true,
                default:new Date(),
            },
            currentImg:{
                type: String,
            }
        }
    },
    //קובץ תפריט
    menu: {
        breakfast: {
            type: String
        },
        lunch: {
            type: String
        },
        dinner: {
            type: String
        }
    }
})
const Customer = mongoose.model("Customer", customerSchema,"customer");
module.exports = Customer;


