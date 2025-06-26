"use client"

import categories from '@/constants/categories'
import { fetchProducts } from '@/lib/appwrite';
import { Query } from 'appwrite';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card';
import Image from 'next/image';
import { BookType } from '@/constants/types';

const Books = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState<BookType[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 600);
        return() => {
            clearTimeout(handler)
        }
    }, [search])

    useEffect(() => {
        const run = async () => {
            const queries = [];

            if(debouncedSearch) queries.push(Query.search("title", debouncedSearch));

            if(category) queries.push(Query.equal("category", category));

            if(stock === "low") queries.push(Query.lessThan("stock", 10));
            if(stock === "in") queries.push(Query.greaterThan("stock", 0));
            if(stock === "out") queries.push(Query.equal("stock", 0));

            try{
             const data = await fetchProducts(queries)

              const books: BookType[] = data.map(doc => ({
              $id: doc.$id,
              title: doc.title,
              price: doc.price,
              category: doc.category,
              stock: doc.stock,
              }));

             setProducts(books)   
            } catch (error) {
                console.error("Failed to fetch products according to queries", error)
            }
        }
        run();
    }, [debouncedSearch, stock, category])



  return (
    <div className='space-y-5'>
        <h2 className='text-6xl font-bold mx-5 mt-3 text-center'>Browse products here</h2>
        <div className='flex flex-col items-center gap-2 justify-center'>
                <input type="text" 
                placeholder='Search for book...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='bg-gray-200 rounded px-5 py-2 '
                />
            <select className='bg-gray-300 font-semibold px-2 py-1 rounded' value={stock} onChange={(e) => setStock(e.target.value)}>
                <option value="">All Stock</option>
                <option value="low">Low Stock</option>
                <option value="in">In stock</option>
                <option value="out">Out of stock</option>
            </select>
            <select className='bg-gray-300 font-semibold px-2 py-1 rounded' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
        <div className='flex items-center justify-center flex-wrap px-6 py-2 gap-4 overflow-hidden'>
            {products.map((product: BookType, index) => (
                <Link
  className="basis-[100%] md:basis-1/3 xl:basis-1/4 h-full"
  href={`/books/${product.$id}`}
  key={index}
>
  <Card className="flex flex-col h-full min-h-[480px] hover:scale-103 hover:shadow-lg duration-200">
    
    <div className="relative h-64 w-full">
      <Image
        src="/images/no-cover.jpg"
        alt="book cover placeholder"
        fill
        className="object-cover "
      />
    </div>

    <CardContent className="flex flex-col flex-1 justify-between p-4">
      <CardTitle className="text-2xl font-semibold line-clamp-2">
        {product.title}
      </CardTitle>

      <div className="mt-auto space-y-1">
        <p className="text-lg text-green-600 font-semibold">${product.price}</p>
        <p className="text-md text-blue-600 font-medium">{product.stock} in stock</p>
      </div>
    </CardContent>
  </Card>
</Link>
            ))}
        </div>
    </div>
  )
}

export default Books