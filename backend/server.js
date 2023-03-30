const express = require('express')
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next()
})


const productRouter = require("./routes/food");
app.use("/foods", productRouter);


mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(port, () => {
        console.log(`Server ${port} da ishlamoqda va MongDB ga ulandi`);
    })
})
.catch((err) => {
    console.log(err); 
})
