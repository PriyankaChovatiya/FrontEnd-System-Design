const PROTO_PATH = './customers.proto';

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");


const packageDefinition = protoLoader.loadSync(PROTO_PATH ,{
   keepCase: true,
   longs: String,
   enums: String,
   arrays:true
}
 );

 const customersProto = grpc.loadPackageDefinition(packageDefinition);

 const server = new grpc.Server();

 const customers =[{
    id: 'P1',
    name: 'Priyaa',
    age: 22,
    address: 'Banglore'

 },
 {
    id: 'P2',
    name: 'Akshat',
    age: 24,
    address: 'Banglore'

 }]
 server.addService(customersProto.CustomerService.service, {

    //getALl
    getAll: (call,callback)=>{
        callback(null,{customers});
    },

    //get
    get: (call,callback)=>{
        let customer = customers.find(n=>n.id == call.request.id);

        if(customer){
            callback(null,customer);
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Customer not found'
            });
        }
    },

    //Insert
    insert: (call,callback)=>{
        let customer = call.request;

        customer.id = Math.random();  //uuidv4
        customers.push(customer);
        callback(null, customer);
    },

    //Update
    update: (call,callback)=>{
        let existingCustomer = customers.find(n =>n.id == call.request.id);

        if(existingCustomer){
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Customer not found'
            });
        }
    },

    //remove
    remove: (call,callback)=>{
        let existingCustomerIndex = customers.find(n =>n.id == call.request.id);

        if(existingCustomerIndex != -1){
            customers.splice(existingCustomerIndex,1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Customer not found'
            })
        }
    },
 })

 server.bindAsync("127.0.0.1:50051",grpc.ServerCredentials.createInsecure(),(err, port) =>{
    if(err){
        console.log(`Error starting gRPC server : ${err}`);
       } else {
        //server.start();
        console.log(`gRPC server running on port: ${port}`);
       }
 });



 