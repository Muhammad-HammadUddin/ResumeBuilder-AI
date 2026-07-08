import mongoose from "mongoose";
const connectDB = async() => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("database connected Successfully")
        })

        let mongodbURI = process.env.MONGODB_URI
        const projectName = 'resume-builder'
        if (!mongodbURI) {
            throw new Error("MongoURL not set")
        }
        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1)

        }
        await mongoose.connect(`${mongodbURI}/${projectName}`)

    } catch (error) {
        console.error("Error connecting to mongodb", error)

    }
}

export default connectDB