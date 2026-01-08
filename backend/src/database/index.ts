import {connect} from "mongoose"

export const connectToDatabase = async () => {
    await connect('mongodb+srv://admin:qrk8YwdPlXvufjjP@cluster0.f3ckqou.mongodb.net/?appName=Cluster0')
    console.log("database connected");
    
}