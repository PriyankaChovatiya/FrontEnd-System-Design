import express from 'express';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());

app.all('/', (req, res) => {
    // console.log('Request > ' , req);
    // console.log('Response > ' , res);
    res.send(`I'm up! `);
});

const todos = [
    {
        id : 1,
        title : 'Learn React',
        completed : false
    },
    {
        id : 2,
        title : 'Learn Security',
        completed : false
    },
    {
        id : 3,
        title : 'Learn Javascript',
        completed : false
    }
]

//READ
app.get('/todos' , (req, res)=>{
    res.json(todos);
});


//CREATE
app.post('/todos', (req,res) =>{
    const newTodos = req.body;
    todos.push(newTodos);
    res.json({
        message : "New Todo Added! "
    });
});


//UPDATE
app.put('/todos/:id', (req, res) =>{
    const newtodosData = req.body;
    const paramsId = req.params.id;
    const todoIndex = todos.findIndex(td => td.id === paramsId );

    if (todoIndex !== -1){
        todos[todoIndex] = {
            id: paramsId,
            ...newtodosData,
        }
    }

    res.json({
        message : "Updated successfully "
    });
});


//DELETE
app.delete('/todos/:id', (req, res) =>{
    const paramsId =req.params.id;
    const todoIndex = todos.findIndex(td => td.id === paramsId );

    if (todoIndex !== -1){
        todos.splice(todoIndex, 1);
    }
    res.json({
        message : "Deleted successfully "
    });

});




const PORT = 5111;
app.listen(PORT, () => {
   console.log(`The server is running at port ${PORT} `);
});
