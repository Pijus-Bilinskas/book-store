"use client";

import { createUser, signIn } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useState } from 'react'

const Auth = () => {
    const [isRegisterOpen, setIsRegisterOpen]= useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { user, fetchUser, loading, logout, isLoginOpen, openLogin, closeLogin } = useAuthStore();

    const authform = async (type: string) => {
        if(type === "login"){
            await signIn(email, password)
            await fetchUser()
            window.location.reload();
        }
        if(type === "register") {
           await createUser(email, password, username)
           window.location.reload();
        }
    }

    const toggleAuth = (to: string) => {
        if(to === "register"){
            closeLogin()
            setIsRegisterOpen((prev) => !prev)
            setEmail("")
            setPassword("")
            setUsername("")
        }
        if(to === "login"){
            openLogin()
            setIsRegisterOpen((prev) => !prev)
            setEmail("")
            setPassword("")
            setUsername("")
        }
    }


if (loading) return null;
  return (
    <div>
        {user ? (
            <>
            <span className='text-lg font-semibold mr-3'>{user ? `${user.name}` : ""}</span>
            <button className='text-lg bg-red-700 hover:bg-red-600 cursor-pointer text-white  font-bold px-2 rounded-lg' onClick={logout}>Logout</button>
            </>
        ): (
            <>
<button className='text-lg bg-red-700 hover:bg-red-600 cursor-pointer text-white  font-bold px-2 rounded-lg' onClick={openLogin}>Login</button>
            </>
        )}
    
    {isLoginOpen && (
        <div className='fixed inset-0 left-0 top-0 z-110 bg-gray-700/70'>
            <div className='absolute left-[45%] top-[40%] flex flex-col gap-3 items-center rounded shadow-2xl justify-center py-10 px-8 bg-gray-200'>
                <button onClick={closeLogin} className='self-end text-xl font-bold cursor-pointer'>X</button>
                <h3 className='text-5xl mb-5 font-semibold'>Login</h3>
                    <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-gray-400 rounded-lg text-xl px-2 py-1'
                    />

                    <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-2 border-gray-400 rounded-lg px-2 text-xl py-1'
                    />


                <button onClick={() => authform("login")} className='bg-green-700 text-white font-bold px-10 py-2 rounded-2xl mt-3 hover:bg-green-600 hover:cursor-pointer'>Submit</button>
                <span className='text-sm'>dont have an account <button onClick={() => toggleAuth("register")} className='text-blue-500 hover:text-blue-600 cursor-pointer '>register</button></span>
            </div>
        </div>
    )}
    
    {isRegisterOpen && (
        <div className='fixed inset-0 left-0 top-0 z-110 bg-gray-700/70'>
            <div className='absolute left-[45%] top-[40%] flex flex-col gap-3 items-center rounded shadow-2xl justify-center py-10 px-8 bg-gray-200'>
                <button onClick={() => setIsRegisterOpen(false)} className='self-end text-xl font-bold cursor-pointer'>X</button>
                <h3 className='text-5xl mb-5 font-semibold'>Register</h3>
                    <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-gray-400 text-xl rounded-lg px-2 py-1'
                    />

                    <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-2 border-gray-400 text-xl rounded-lg px-2 py-1'
                    />

                    <input type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border-2 border-gray-400 rounded-lg text-xl px-2 py-1'
                    />

                <button onClick={() => authform("register")} className='bg-green-700 text-white font-bold px-10 py-2 rounded-2xl mt-3 hover:bg-green-600 hover:cursor-pointer'>Submit</button>
                <span className='text-sm'>already have an account <button onClick={() => toggleAuth("login")} className='text-blue-500 hover:text-blue-600 cursor-pointer '>login</button></span>
            </div>
        </div>
    )}
    </div>
  )
}

export default Auth;