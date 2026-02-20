// // lib/mongo.ts
// import { MongoClient } from "mongodb";
//
// const uri = process.env.MONGODB_URI!;
// const options = {};
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;
//
// declare global {
//     // eslint-disable-next-line no-var
//     var _mongoClientPromise: Promise<MongoClient> | undefined;
// }
//
// if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
// }
//
// clientPromise = global._mongoClientPromise!;
// export default clientPromise;


import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Keep the global definition from your first code
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    // In development, use a global variable to preserve the value
    // across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise.
// By doing this in a separate module, the client can be shared across functions.
export default clientPromise;