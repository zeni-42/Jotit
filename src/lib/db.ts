import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const DBNAME="JotIt"
const connection: ConnectionObject = {};

export async function DBconnect(){
    if (connection.isConnected) {
        console.log("DB EXIST");
        return;
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`)
        connection.isConnected = db.connections[0].readyState;

        console.log("DB CONNECTED");
    } catch (error) {
        console.error("DB FAILED", error);
        process.exit(1);
    }
}