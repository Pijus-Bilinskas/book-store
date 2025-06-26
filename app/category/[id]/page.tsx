import Category from "@/components/Category"
import { getBooksByCategory } from "@/lib/books"


export default async function CategoryPage ({ params }: {params: string}) {
        const { id } = params 
        const books = await getBooksByCategory({ category: id })

    return(
        <div>
           <Category books={books} category={id}/>
        </div>
    )
}