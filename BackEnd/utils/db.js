const mongoose=require('mongoose')

URI=process.env.MONGO_DB_URI;

const connectDB=async ()=>{
try {
    await mongoose.connect(URI);
    console.log('database connected successfully..')
} catch (error) {
    console.error('database connection failed..',error)
}
}

module.exports = connectDB;