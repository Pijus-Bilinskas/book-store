"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { BookType } from "@/constants/types";



const Carousel = ({ books }: {books: BookType[]}) => {
  const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        if(!books || books.length === 0) return

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % books.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [books])

    const getVisibleBooks = () => {
        if(!books || books.length === 0) return []
        const first = books[current]
        const second = books[(current + 1) % books.length]
        return [first, second]
    }
    const visibleBooks = getVisibleBooks()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {visibleBooks.map((book, idx) => (
        <Link href={`/books/${book.$id}`} key={idx}>
        <Card key={book.$id || idx} className="relative rounded-lg shadow-md overflow-hidden hover:scale-101 hover:shadow-lg duration-200">
          <div className="relative w-full h-88">
            {/* Cannot display actual images for each one due to not having the correct plan on Appwrite */}
            <Image
              alt={book.title}
              src={`/images/no-cover.jpg`}
              layout="fill"
              className="transition-opacity duration-500 ease-in-out object-fill"
            />
          </div>
          <CardContent className="absolute inset-0 flex flex-col justify-center items-center">
            <CardTitle className="text-2xl font-semibold">{book.title}</CardTitle>
            <p className="text-lg text-green-700 font-semibold">{book.price}$</p>
            <p className="text-lg font-semibold">{book.category}</p>
          </CardContent>
        </Card>
        </Link>
      ))}
    </div>
  )
}

export default Carousel