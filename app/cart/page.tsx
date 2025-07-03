"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/useAuthStore";



export default function CartPage() {
    const { items, addItem, removeItem } = useCartStore();
    const {user, openLogin} = useAuthStore();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if(total === 0 || items.length === 0){
        return (<div>
            <h1>Your Cart is Empty</h1>
        </div>)
    }

    const handlePayment =  () => {
        if(!user){
            openLogin();
            return
        }
alert(`payment for ${items.map(item => `${item.title} ${item.quantity}`).join(", ")}`); 
}

    return(
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-6 text-center">Checkout</h2>
            <Card className="max-w-lg mx-auto mb-8">
                <CardHeader className="text-2xl font-bold">Order Summary</CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {items.map((item, key) => (
                            <li className="flex flex-col gap-2 border-b pb-2" key={key}>
                                <div className="flex justify-between">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="font-semibold">{item.price * item.quantity}$</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => removeItem(item.id)} className='bg-black text-white font-bold py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-900'>-</button>
                                    <span className='font-semibold text-lg'>{item.quantity}</span>
                                    <button onClick={() => addItem({...item, quantity: 1})} className='bg-gray-300 text-black font-bold py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-200'>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="text-lg font-semibold mt-2">
                        Total: {(total).toFixed(2)}$
                    </div>
                </CardContent>
            </Card>
            <button onClick={handlePayment} className="flex mx-auto text-white text-lg font-semibold px-3 py-1 rounded bg-green-500 hover:bg-green-600 hover:cursor-pointer">Proceed to Payment</button>
        </div>
    )
}