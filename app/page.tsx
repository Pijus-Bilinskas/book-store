import HomePage from "@/components/HomePage";
import { BookType } from "@/constants/types";
import { getBooks } from "@/lib/books";


export default async function Home() {
  const books = await getBooks()

  if (!books) {
    return (<div><h1>Book not found</h1></div>);}

  const typedBooks: BookType[] = books.map((doc) => ({
    $id: doc.$id,
    title: doc.title,
    price: doc.price,
    category: doc.category,
    stock: doc.stock,
    // add any other fields your BookType requires
  }));

  return (
   <div>
    <HomePage books={typedBooks}/>
   </div>
  );
}
