import HomePage from "@/components/HomePage";
import { getBooks } from "@/lib/books";


export default async function Home() {
  const books = await getBooks()


  return (
   <div>
    <HomePage books={books}/>
   </div>
  );
}
