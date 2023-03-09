import app from './server.js';
import dotenv from "dotenv";
dotenv.config()
import mongodb from 'mongodb';
// import ReviewsDAO from ".dao/reviewsDAO.js"


const MongoClient = mongodb.MongoClient

const mongo_username = process.env.REACT_APP_MONGO_USERNAME
const mongo_password = process.env.REACT_APP_MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.jfvsoxd.mongodb.net/test`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err=>{
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    app.listen(port,()=>{
        console.log(`listening to port ${port}`)
    })
})