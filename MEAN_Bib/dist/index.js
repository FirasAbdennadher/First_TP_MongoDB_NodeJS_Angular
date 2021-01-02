"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_model_1 = __importDefault(require("./books.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const uri = "mongodb://localhost:27017/biblio";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Connection Mongo avec succes");
});
const app = express_1.default();
app.get("/", (req, resp) => {
    resp.send("Helllo");
});
app.use(body_parser_1.default.json());
app.get("/books", (req, resp) => {
    books_model_1.default.find((err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
app.get("/pbooks", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 3);
    books_model_1.default.paginate({}, { page: p, limit: size }, (err, resultat) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(resultat);
    });
});
app.get("/books-search", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 3);
    let kw = req.query.kw || "";
    books_model_1.default.paginate({ title: { $regex: ".*(?i)" + kw + ".*" } }, { page: p, limit: size }, (err, resultat) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(resultat);
    });
});
app.get("/books/:id", (req, resp) => {
    books_model_1.default.findById(req.params.id, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.post("/books", (req, resp) => {
    let book = new books_model_1.default(req.body); //nouveau books et els donés du books envoyé dans le corsps du requette sous foramt json
    book.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.put("/books/:id", (req, resp) => {
    books_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Book " + req.params.id + " Updatated");
    });
});
app.delete("/books/:id", (req, resp) => {
    books_model_1.default.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Book " + req.params.id + " Deleted");
    });
});
app.listen(7777, () => {
    console.log("server demaré");
});
