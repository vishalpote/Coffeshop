const express=require('express')
const mongoose=require('mongoose')
const bodypars=require('body-parser')
const path=require('path')
const app=express()

app.use(bodypars.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/Cafe-Day-Night")
.then(()=>console.log("Database are connected"))
.catch((err)=>console.log(err))

const signupschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String

})

const singup=new mongoose.model("signup",signupschema)


const loginschema=new mongoose.Schema({
    username:String,
    password:String

})

const logs1=new mongoose.model("logs1",loginschema)


const contactschema=new mongoose.Schema({
    name:String,
    email:String,
    message:String,
})

const contact=new mongoose.model("contact",contactschema)



const paymentschema=new mongoose.Schema({
    name:String,
    card:Number,
    expiry:String,
    cvv:Number,
    zipcode:String
})

const payments=new mongoose.model("payments",paymentschema)


const orderschema=new mongoose.Schema({
    name:String,
    email:String,
    product:String,
    quantity:Number,
    message:String
})

const orders=new mongoose.model("orders",orderschema)



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})

app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'about.html'))
})


app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})


app.post("/login", async (req,res)=>{

    const {username,password}=req.body
    const newuser=new logs1({
        username:username,
        password:password
    })
    try{
        await newuser.save()
        res.sendFile(path.join(__dirname,'home.html'))
    }
    catch(err)
    {
        console.error(err)
        res.send("error in add to database")
    }
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'))
})

app.post("/signup", async (req,res)=>{

    const {name,email,password}=req.body
    const newuser=new singup({
        name:name,
        email:email,
        password:password
    })
    try{
        await newuser.save()
        // res.sendFile(path.join(__dirname,'login.html'))
        res.sendFile(path.join(__dirname,'login.html'))
    }
    catch(err)
    {
        console.error(err)
        res.send("error in add to database")
    }
})


app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})


app.post("/contact", async (req,res)=>{

    const {name,email,message}=req.body
    const newuser=new contact({
        name:name,
        email:email,
        message:message
    })
    try{
        await newuser.save()
        // res.sendFile(path.join(__dirname,'login.html'))
        res.sendFile(path.join(__dirname,'thankyou.html'))
    }
    catch(err)
    {
        console.error(err)
        res.send("error in add to database")
    }
})


app.get('/orderpage',(req,res)=>{
    res.sendFile(path.join(__dirname,'orderpage.html'))
})


app.post("/orderpage", async (req,res)=>{
    
    const {name,email,product,quantity,message}=req.body
    const newuser=new orders({
        name:name,
        email:email,
        product:product,
        quantity:quantity,
        message:message
    })
    try{
        await newuser.save()
        res.sendFile(path.join(__dirname,'payment.html'))
        // res.send("order success")
    }
    catch(err)
    {
        console.error(err)
        res.send("error in add to database")
    }
})


app.get('/payment',(req,res)=>{
    res.sendFile(path.join(__dirname,'payment.html'))
})

app.post("/payment", async (req,res)=>{

    const {name,card,expiry,cvv,zipcode}=req.body
    const newuser=new payments({
        name:name,
        card:card,
        expiry:expiry,
        cvv:cvv,
        zipcode:zipcode
    })
    try{
        await newuser.save()
        res.sendFile(path.join(__dirname,'thankyou.html'))
        // res.send("payment success")
    }
    catch(err)
    {
        console.error(err)
        res.send("error in add to database")
    }
})

app.listen(port=3000,()=>console.log(`port running on 3000`))