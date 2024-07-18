const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO:  to expose rest call
// which internally call gRPC server function using gRPC client 

app.get('/',(req, res) => {
  client.get(null,(err,data) =>{
    if(!err){
    res.send(data.customers);
    }
  });
})

//creating customer 
app.post('/create',(req, res) =>{
    let newCustomer ={
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    client.insert(newCustomer,(err,data)=>{
        if(err) throw err;

        console.log("Customer created successfully", data);
        res.send({ message :"Customer created Successfully."});
    });
})



//Updating Cuatomer
app.post('/update',(req, res) =>{
    let updateCustomer ={
        id:req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    client.insert(updateCustomer,(err,data)=>{
        if(err) throw err;

        console.log("Customer updated successfully", data);
        res.send({ message :"Customer updated Successfully."});
    });
})


//Removing Customer 
app.post('/remove',(req, res) =>{
    client.remove({
        id:req.body.customer_id
    }, (err, _));

    if(err) throw err;

    console.log("Customer removed succesfully");
    res.send({ message :"Customer removed Successfully."});

})

const PORT = process.env.PORT || 5111;

app.listen(PORT , () => {
    console.log("Server is running on port at %d " , PORT);
});
