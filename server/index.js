const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('patike',['naruceno'])


const app = express();

app.use(express.json());

app.post('/naruci',(req,res) => {
    
    
    db.naruceno.insert({
        name : req.body.ime,
        lastName : req.body.prezime,
        email : req.body.email,
        phone : req.body.telefon,
        city : req.body.grad,
        street : req.body.ulica,
       orderedSneakers : req.body.ordered_sneakers
    },(error,data) => {
       if(data){
           res.send('ok')
       }
       
    })
    
})




app.listen(9000,()=>{
    console.log('Listening to port 9000');
    
})