const express = require("express");
const app = express();
const mongoose = require("mongoose"); // for database mongoose package connect with mongo database
const Listing = require("./models/listing.js");

// for routing
const path = require("path");
const listing = require("./models/listing.js");


app.set("view engine","ejs");   //for pages 
app.set("views",path.join(__dirname,"views")); //for pages  inside in views directory(folder)
app.use(express.urlencoded({extended:true}));


// to build  database connection
main()
.then (() =>{
 console.log( "connect to db")
}).catch(err => console.log(err));
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/pizza') // pizza is name of data base in mongo db

}

app.get("/",(req,res)=>{
  res.send(" hi hello ")
})

// index route
app.get("/listings", async (req,res)=>{
   const allListing = await Listing.find({}) ;
   res.render("./listings/index.ejs",{allListing})

})
 // new route

app.get("/listings/new",  (req,res)=>{
      res.render("./listings/new.ejs")
   })


// show route
app.get(" /listings/:id" ,  async(req,res) =>{
  let {id} = req.params;
     const listing = await listing.findById(id);
     res.render("./listings/show.ejs" , {listing})
    })


//create route
app.post("/listings" , async(req,res)=>{
   // let { title,description,image,price,location,country}= req.body ;
 const  newListing = new Listing (req.body.listing);
  await newListing.save()

  res.redirect("/listings")


})




// app.get("/test", async(req,res)=>{
//   const sampleListing= new Listing({
//     title:"Bold BBQ Veggies",
//     description:"Our signature pan sauce, with BBQ Sauce drizzle, topped with mushroom, onion, green capsicum, & red paprika (PAN Per/Med-242 Kcal/100g |TnC- 266 Kcal/100g)",
//     image:"https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/bold-bbq-veggies.8cd7bdc4b90ad70c7acfbfdf86a812a1.1.jpg?width=251",
//     price :340,
//     location:"rohini",
//     country : "Delhi"
//   });

//   await smplListing.save();
//   console.log(" save ");
//   res.send(" successful saved")
// })
app.listen(8080,()=>{
  console.log("connection bn chuka h")
})
