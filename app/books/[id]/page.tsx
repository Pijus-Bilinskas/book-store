import Book from "@/components/Book"
import { getBook } from "@/lib/books"



export default async function BookPage ({params}: {params:{id: string}}) {
    const { id } = await params
    const book = await getBook({ id })

    if (!book) {
    return <div><h1>Book not found</h1></div>;
    }

    return(
        <div>
            <Book book={book} />
        </div>
    )
} 