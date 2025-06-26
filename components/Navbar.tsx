"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import categories from '@/constants/categories';
import { useCartStore } from '@/store/cart-store';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [iscategoriesOpen, setIscategoriesOpen] = useState<boolean>(false)
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 768){
        setMobileOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize);
  }, [])


  return (
    <nav>
      <div className='p-3 bg-gray-100 shadow-md shadow-gray-200 flex flex-row justify-around items-center'>
          <button className={`text-black text-2xl md:hidden ${mobileOpen ? "rotate-360 duration-300" : "rotate-0 duration-300"}`} onClick={() => setMobileOpen((prev) => !prev)}>{mobileOpen ? "O" : "X"}</button>
        <h1 className='text-4xl font-serif text-red-900 font-bold'>Librarian📚</h1>
        <div className='hidden  md:flex flex-row gap-3 text-2xl font-bold'>
          <Link href={'/'}>Home</Link>
          <Link href={'/books'}>Browse</Link>
          <div className='relative' onMouseEnter={() => setIscategoriesOpen(true)}>Categories
            {iscategoriesOpen && (
              <div className='flex flex-col gap-2 z-80 text-xl absolute bg-gray-100 p-2' onMouseLeave={() => setIscategoriesOpen(false)}>
                {categories.map((category) => (
                  <Link className='hover:bg-gray-50 px-2 py-1 rounded' key={category} href={`/category/${category}`}>{category}</Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
            <Link href={"/cart"} className='relative'>
            🛒
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center rounded-full text-xs bg-red-500 text-white'>{cartCount}</span>
            )}
            </Link>
        </div>
      </div>
      {mobileOpen && (
        <nav className='md:hidden bg-white shadow-md'>
    <ul className='flex flex-col p-4 space-y-4'>
      <li>
        <Link className='block text-blue-800 font-bold hover:text-blue-700' href={"/"}>Home</Link>
      </li>
      <li>
        <Link className='block text-blue-800 font-bold hover:text-blue-700' href={"/books"}>Browse</Link>
      </li>
      <li>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className='text-left text-blue-800 hover:text-blue-700 font-bold'
        >
          {showCategories ? 'Categories O' : 'Categories *'}
        </button>
        {showCategories && (
          <ul className='mt-2 ml-4 space-y-1'>
            {categories.map((category, index) => (
              <li key={index}>
                <Link className='text-blue-700 text-md font-medium hover:text-lg hover:duration-200' href={`/category/${category}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  </nav>
      )}
    </nav>
  )
}

export default Navbar;