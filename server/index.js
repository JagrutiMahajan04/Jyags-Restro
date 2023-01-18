import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from "./models/User.js";
import FoodItem from "./models/FoodItem.js";
import Table from "./models/Table.js";
import Order from "./models/Order.js"

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URL, ()=>{
   console.log('Connected to MongoDB');
})

//api routes starts here

app.post('/signup',async(req, res)=>{
    const {name, phone, email, password, role} = req.body;

  //validation  to check if all fields are filled starts here

   const emptyFields =[];

   if (!name) emptyFields.push('name');
   if (!phone) emptyFields.push('phone');
   if (!email) emptyFields.push('email');
   if (!password) emptyFields.push('password');
   if (!role) emptyFields.push('role');

   if(emptyFields.length > 0) {
    return res.json({
        success:false,
        message:`${emptyFields.join(',')} are required`
    })
   }
   // validation  to check if all fields are filled ends here

   //validation  to check if email already exists starts here
   const existingUser = await User.findOne({ email: email});
   if (existingUser) {
    return res.json({
        success: false,
        message : "Email already exists"
    })
   }
   //validation  to check if email already exists ends here

   //validation  to check if phone already exists starts here

   const existingUserPhone = await User.findOne({ phone: phone});
   if (existingUserPhone) {
    return res.json({
        success: false,
        message : "Phone already exists"
    })
   }
 //validation  to check if phone already exists ends here

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role:role
    })

    const savedUser = await user.save();

    res.json({
        success:true,
        message: "User created successfully",
        data: savedUser
    })
})

app.post('/login', async (req, res)=> {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message:"Email and passsword are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password});

    if(existingUser){
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else
    {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

app.post('/createFoodItem', async(req,res)=>{
    const {title, description, imgUrl, price, category} = req.body;

    const foodItem = new FoodItem({
        title: title,
        description:description,
        imgUrl: imgUrl,
        price:price,
        category:category
    })

    const savedFoodItem = await foodItem.save();

    res.json({
        success: true,
        message: "Food Item created successfully",
        data: savedFoodItem
    })
})

//http://localhost:5000/foodItemByCategory?category=pizza
app.get("/foodItemsByCategory", async(req, res)=>{
    const {category} = req.query;

    const foodItems = await FoodItem.find({
        category: category
    })

    res.json({
        success: true,
        message:"Food Items fetched successfully",
        data: foodItems
    })
})

//http://localhost:5000/allfoodItems

app.get("/allfoodItems", async(req, res)=>{

    const foodItems = await FoodItem.find()
      
      res.json({
        success: true,
        message:"Food Items fetched successfully",
        data: foodItems
      })
})

//http://localhost:5000/foodItems?title=pizza
app.get("/foodItems", async(req, res)=>{
    const {title} = req.query;

    const foodItems = await FoodItem.find({
        title: {$regex: title, $options: 'i'}
    })

    res.json({
        success: true,
        message:"Food Items fetched successfully",
        data: foodItems
    })
})

app.post("/createTable", async(req,res)=>{
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({tableNumber: tableNumber});
    if (existingTable){
        return res.json({
            success:false,
            message:"Table already exists"
        })
    }

    const table = new Table({
        tableNumber: tableNumber,
        booked:false
    })

    const savedTable = await table.save();

    res.json({
        success:true,
        message:"Table created successfully",
        data:savedTable
    })
})

app.post("/bookTable", async (req, res)=>{
    const  { tableNumber, userId } = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber});
    if (existingTable && existingTable.booked) {
        return res.json({
            success: false,
            message: "Table already booked."
        })
    }

    if(existingTable){
        existingTable.booked = true;
        existingTable.bookedBy = userId;
        await existingTable.save();
    }

    res.json({
        success:true,
        message:"Table booked successfully",
        data:existingTable
    })
})

app.post("/unbookTable", async (req, res)=> {
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });

    if(existingTable){
        existingTable.booked = false;
        existingTable.bookedBy = null;
        await existingTable.save();
    }

    res.json({
        success:true,
        message:"Table unbooked successfully",
        data:existingTable
    })
});

app.get("/availableTables", async (req, res)=> {
    const availableTables = await Table.find({ booked : false });

    res.json({

        success:true,
        message:"Available tables fetched successfully",
        data: availableTables
    })
})

app.post("/orderFoodItems", async(req,res )=>{
    const {userId, tableNumber, items} = req.body
     
    // generate 5 digit unique order id with currrent hours and minutes
    //const orderId ="ord" + new Date().getHours() + "" + new Date.getMinutes() + "" + Math.floor(100 + Math.random() * 900);

    // count total orders

    const totalOrders = await Order.countDocuments();
     
    const orderId = totalOrders + 1;

    const order = new Order({
        orderId: orderId, 
        userId: userId,
        tableNumber: tableNumber,
        items:items
    })

    const savedOrder = await order.save();

    res.json({
        success: true,
        message: "Order placed successfully",
        data: savedOrder
    })


})

app.get("/order", async(req, res)=>{
    const {orderId} = req.query;

    const order = await Order.findOne({orderId: orderId});

    res.json({
        success: true,
        message: "Order fetched succcessfully",
        data: order
    })
})


app.get("/ordersByUserId", async(req, res)=>{
    const {userId} = req.query;

    const orders = await Order.find({userId: userId});

    res.json({
        success: true,
        message: "Orders fetched succcessfully",
        data:orders
    })
})


//api routes ends here

app.listen(5000, ()=>{
    console.log(`Server is ruuning on port ${PORT}`);
})