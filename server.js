const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
// const campaignRoutes = require('./routes/campaign');

const uri = "mongodb+srv://yash:yash@fypbackend.ebxo6pn.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoose");
    } catch (error) {
        console.log(error);
    }
}

connect();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

app.use('/api', authRoutes);
// app.use('/api', campaignRoutes);

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

