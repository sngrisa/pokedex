import { NotFoundException } from "@nestjs/common";
import { connect } from "mongoose";

let urlBase: string = "mongodb://localhost:27017";

export const connectWithMongoDB = async (database: string): Promise<void> => {
    try {
        await connect(`${urlBase}/${database}`);
        console.info("Connected with MongoDB Database with Mongoose");
    } catch (err: unknown) {
        throw new NotFoundException(err);
    }
}