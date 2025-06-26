"use client"

import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Book = ({ book }) => {
  const { items, addItem, removeItem} = useCartStore();
  const cartItem = items.find((item) => item.id === book.$id)
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: book.$id,
      title: book.title,
      price: book.price,
      quantity: 1
    })
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-center'>
        <div className='relative h-[380px] w-[280px] lg:h-[420px] lg:w-[320px]'>
        <Image 
        src={"/images/no-cover.jpg"}
        alt='book image placehoder'
        fill
        className='opacity-70 '
        />
        </div>
        <div>
            <h3 className='text-2xl md:text-4xl font-semibold'>{book.title}</h3>
            <p className='text-lg text-green-900 font-semibold'>{book.price}$</p>
            <Link className='text-md text-blue-400' href={`/category/${book.category}`} key={book.$id}>{book.category}</Link>
            <p className='text-lg font-semibold'>{book.stock} in stock</p>
            <div className='flex flex-row items-center gap-2'>
              <button onClick={() => removeItem(book.$id)} className='bg-black text-white font-bold py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-900'>-</button>
              <span className='font-semibold text-lg'>{quantity}</span>
              <button onClick={onAddItem} className='bg-black text-white font-bold py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-900'>+</button>
            </div>
        </div>
    </div>
  )
}

export default Book