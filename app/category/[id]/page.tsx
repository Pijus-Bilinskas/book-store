import Category from "@/components/Category"
import { getBooksByCategory } from "@/lib/books"

interface CategoryPageProps {
    params: {
        id: string
    }
}


export default async function CategoryPage ({ params }: CategoryPageProps) {
        const { id } = params 
        const books = await getBooksByCategory({ category: id })

    return(
        <div>
           <Category books={books} category={id}/>
        </div>
    )
}