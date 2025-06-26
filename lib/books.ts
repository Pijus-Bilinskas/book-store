import { databases, storage } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = `${process.env.NEXT_PUBLIC_DATABASE_ID}`;
const COLLECTION_ID = `${process.env.NEXT_PUBLIC_COLLECTION_ID}`;
const BUCKET_ID = `${process.env.NEXT_PUBLIC_BUCKET_ID}`;


export async function getBook({ id }: {id: string}) {
    try{
            const response = await databases.getDocument(DB_ID, COLLECTION_ID, `${id}`)

            return response
        } catch (error) {
            console.error("Error in fetching book", error)
            return []
        }
}

export async function getBooksByCategory({ category }: {category: string}) {
    try{
        console.log("fetching category:", category)
        const response = await databases.listDocuments(DB_ID, COLLECTION_ID,
            [
                Query.equal("category", category)
            ]
        )

        return response.documents
    } catch (error) {
        console.error("Error fetching books by category", error)
        return []
    }
}



export async function getBooks() {
    try{
       const response = await databases.listDocuments(
        DB_ID,
        COLLECTION_ID,
        [Query.limit(6)]
       )

       const books = response.documents.map((book) => {
        
       const imageUrl = storage.getFilePreview(BUCKET_ID, book.imageId);

        return {
            ...book,
            imageUrl
        }
       })

       return books;
    } catch(error) {
        console.error("Error fetching books", error);
        return [];
    }
}
