import { Client, Databases, Storage, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client)

export const fetchProducts = async (queries: string[]) => {
    const response = await databases.listDocuments(
    `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_COLLECTION_ID}`,
    queries
    );
    return response.documents
}



export { databases, storage, account }