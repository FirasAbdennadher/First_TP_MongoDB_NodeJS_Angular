import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "./books.model";
import bodyParser from "body-parser";

const uri="mongodb://localhost:27017/biblio";
mongoose.connect(uri,(err)=>{
if(err) console.log(err);
else console.log("Connection Mongo avec succes");
});

const app=express()
app.get("/",(req:Request,resp:Response)=>{
resp.send("Helllo");
})
app.use(bodyParser.json())
app.get("/books",(req:Request,resp:Response)=>{
    Book.find((err,books)=>{
        if(err) resp.status(500).send(err);
        else resp.send(books);
    });
});

app.get("/pbooks",(req:Request,resp:Response)=>{
    let p :number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 3);
    Book.paginate({},{page:p,limit:size},(err,resultat)=>{
        if(err) resp.status(500).send(err);
        else resp.send(resultat);
    })
});

app.get("/books-search",(req:Request,resp:Response)=>{
    let p :number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 3);
    let kw:string=req.query.kw || "";
    Book.paginate({title:{$regex:".*(?i)"+kw+".*"}},{page:p,limit:size},(err,resultat)=>{
        if(err) resp.status(500).send(err);
        else resp.send(resultat);
    })
});




app.get("/books/:id",(req:Request,resp:Response)=>{
    Book.findById(req.params.id,(err,book)=>{
        if(err) resp.status(500).send(err);
        else resp.send(book);
    });
});





app.post("/books",(req:Request,resp:Response)=>{
   let book= new Book(req.body);//nouveau books et els donés du books envoyé dans le corsps du requette sous foramt json
   book.save(err=>{
       if(err) resp.status(500).send(err);
       else resp.send(book);
   });
});


app.put("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,(err)=>{
        if(err) resp.status(500).send(err);
        else resp.send("Book "+req.params.id+ " Updatated");
    });
 });

 app.delete("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndDelete(req.params.id,(err)=>{
        if(err) resp.status(500).send(err);
        else resp.send("Book "+req.params.id+ " Deleted");
    });
 });


app.listen(7777,()=>{
    console.log("server demaré")
    })