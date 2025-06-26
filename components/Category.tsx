import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

const Category = ({ books, category }) => {

  return (
    <div className='flex flex-col gap-5 py-6 px-4'>
        <h2 className='text-3xl md:text-4xl font-semibold'>Category: {category}</h2>
        <div className='flex gap-3'>
            {books.map((book) => (
                <Link className='basis-1/2 md:basis-1/4 hover:scale-101 hover:shadow-lg duration-200' key={book.$id} href={`/books/${book.$id}`}>
                <Card className='flex flex-col' >
                    <div className='relative h-[250px] md:h-[300px] '>
                        <Image
                        src={`/images/no-cover.jpg`}
                        alt="book image placeholder"
                        fill
                        className='object-cover'
                        />
                    </div>
                    <CardContent>
                        <CardTitle className='text-xl'>{book.title}</CardTitle>
                        <p className='text-lg text-green-900 font-semibold'>{book.price}$</p>
                        <p className='text-lg font-semibold text-blue-500'>{book.category}</p>
                        <p className='text-lg font-semibold'>{book.stock} in stock</p>
                    </CardContent>
                </Card>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Category