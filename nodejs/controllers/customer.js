const Customer = require("../models/customer");
const getAll = async (req, res) => {
    let customers = await Customer.find();
    
    return res.send(customers);
}
const getById = async (req, res) => {
    console.log('come2');
    let { id } = req.params;
    let customer = await Customer.findById(id);
    if (!customer)
        return res.status(404).send("There is no such customer");
    return res.send(customer);
}

const getByMail = async (req, res) => {
    console.log('comee');
    let  currentMail  = req.params.mail;
    let customer = await Customer.find( { mail: currentMail } );
    if (!customer)
        return res.status(404).send("There is no such customer");
    return res.send(customer);
}
const postCustomer = async (req, res) => {
    console.log('reach here');
    let customer = req.body;
    console.log('cust is:', customer);
    
    let newCustomer = new Customer(customer);
    try {
        await newCustomer.save();
        return res.send(newCustomer);
    }
    catch (err) {
        console.log('err is:', err.message);
        
        return res.status(400).send(err.message)
    }
}
const updateCustomer = async (req, res) => {
    let customerBody = req.body;
    let { id } = req.params;
    let customer = await Customer.findById(id);
    if (!customer)
        return res.status(404).send("There is no such customer");
    customer.name = customerBody.name || customer.name;
    customer.lastName = customerBody.lastName || customer.lastName;
    customer.address = customerBody.address || customer.address;
    customer.email = customerBody.email || customer.email;
    customer.height = customerBody.height || customer.height;
    customer.customerWeights = customerBody.customerWeights || customer.customerWeights;
    customer.gender = customerBody.gender || customer.gender;
    customer.password=customerBody.password|| customer.password;
    customer.phone = customerBody.phone || customer.phone;
    customer.chest = customerBody.chest || customer.chest;
    customer.waist = customerBody.waist || customer.waist;
    customer.pelvis = customerBody.pelvis || customer.pelvis;
    customer.joinDate = customerBody.joinDate || customer.joinDate;
    try {
        await customer.save();
        return res.send(customer);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const deleteCustomer = async (req, res) => {
    
    
    let { id } = req.params;
    let deleted = await Customer.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such customer");
    return res.send(deleted);
}
module.exports = {
    getAll, getById, postCustomer, updateCustomer, deleteCustomer, getByMail
}