const mongoose=require('mongoose');
const connectDB=async ()=>{
try {
    const conn= await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(`database connected ${conn.connection.host}`)
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

module.exports = connectDB