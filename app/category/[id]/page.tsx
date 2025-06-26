import Category from "@/components/Category"
import { BookType } from "@/constants/types";
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
    //  Maping Document[] to BookType[]
     const typedBooks: BookType[] = books.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        price: doc.price,
        category: doc.category,
        stock: doc.stock,
        }));

    return(
        <div>
           <Category books={typedBooks} category={id}/>
        </div>
    )
}