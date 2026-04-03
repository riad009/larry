import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env.local or Vercel Environment Variables");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
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

/**
 * Returns the application database.
 * The name is read from MONGODB_DB env var (set this in Vercel dashboard too).
 * Falls back to "smartRoute" if the env var is missing.
 */
export async function getDb(): Promise<Db> {
    const dbName = process.env.MONGODB_DB || "smartRoute";
    const resolvedClient = await clientPromise;
    return resolvedClient.db(dbName);
}

// Export a module-scoped MongoClient promise.
// By doing this in a separate module, the client can be shared across functions.
export default clientPromise;