import { Client, Databases, Storage } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682c80a000041d068fb1')

const databases = new Databases(client);
const storage = new Storage(client);

export const fetchProducts = async (queries: string[]) => {
    const response = await databases.listDocuments(
    `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_COLLECTION_ID}`,
    queries
    );
    return response.documents
}



export { databases, storage }