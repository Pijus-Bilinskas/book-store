import Book from "@/components/Book"
import { getBook } from "@/lib/books"




export default async function BookPage ({ params }: {params: {id: string}}) {
    const { id } =  params
    const book = await getBook({ id })

    return(
        <div>
            <Book book={book} />
        </div>
    )
}  