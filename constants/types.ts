export interface BookType {
  $id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
}

export interface BooksType{
    books: [BookType]
}