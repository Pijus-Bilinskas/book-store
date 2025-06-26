import Book from "@/components/Book"
import { getBook } from "@/lib/books"

interface BookPageProps {
    params: {
        id: string
    }
}


export default async function BookPage ({ params }: BookPageProps) {
    const { id } =  params
    const book = await getBook({ id })

    return(
        <div>
            <Book book={book} />
        </div>
    )
}     