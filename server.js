const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaign');

const uri = "mongodb+srv://yash:yash@fypbackend.ebxo6pn.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to mongoose");
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', campaignRoutes);

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

