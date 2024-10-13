import { useEffect, useRef, useState } from "react"
import React from 'react'


const Cart = (props:any) => {
  const {cartItems} = props
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let newTotal = 0;
    Object.keys(cartItems).forEach(item => {
      const [quantity, price] = cartItems[item];
      newTotal += quantity * price; // Calculate total
    });
    setTotal(newTotal) // Update total state
  }, [cartItems]);


 


  return (
    <div className = "flex flex-col items-center w-[90%] h-[80%] border-2 m-4 border-black gap-8">
        <h1 className='text-3xl font-bold text-center'>Your Cart</h1>


        <div className = "grid grid-cols-3 w-[60%] text-center gap-2 text-xl">
            <h1 className = "font-bold text-2xl p-2">Service</h1>
            <h1 className = "font-bold text-2xl p-2">Qty</h1>
            <h1 className = "font-bold text-2xl p-2">Price</h1>
        {Object.keys(cartItems).map((item) => (
            
            <>

            {cartItems[item][0] != 0 ? <><h1 className = "border-b">{item}</h1>
            <h1 className = "border-b">{cartItems[item][0]}</h1>
            <h1 className = "border-b">{cartItems[item][1]}</h1> </>:<></>}
            </>
            
        ))}



        </div>

        <div className = "relative bottom-0 right-0">
            <h1 className="text-2xl"><b className="text-2xl">Total:  </b>{total} Rs.</h1>


        </div>

        <h1 className="text-2xl font-bold">Customers Also Viewed: </h1>
        




    </div>
  )
}

export default Cart