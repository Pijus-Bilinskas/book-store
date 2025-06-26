import Category from "@/components/Category"
import { getBooksByCategory } from "@/lib/books"




export default async function CategoryPage ({params}: {params: Promise<{id: string}>}) {
        const { id } = await params;
        const books = await getBooksByCategory({ category: id })

         if (!books) {
    return (
      <div>
        <h1>Book not found</h1>
      </div>
    );
     }

    return(
        <div>
           <Category books={books} category={id}/>
        </div>
    )
}