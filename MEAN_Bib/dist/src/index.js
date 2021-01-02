"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_model_1 = __importDefault(require("../model/books.model"));
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
app.get("/books", (req, resp) => {
    books_model_1.default.find((err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
app.listen(7777, () => {
    console.log("server demaré");
});
