import Category from "@/components/Category"
import { getBooksByCategory } from "@/lib/books"




export default async function CategoryPage ({ params }: {params: {id: string}}) {
        const books = await getBooksByCategory({ category: params.id })

    return(
        <div>
           <Category books={books} category={params.id}/>
        </div>
    )
}