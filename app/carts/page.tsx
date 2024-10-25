import CartItemList from '@/components/cart-item-list'
import { NavigationBar } from '@/components/navigation-bar'
import React from 'react'

const CartPage = () => {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className='container px-4 md:px-6 mx-auto mt-24'>
                <h1 className='text-2xl'>Keranjang Belanja Kamu</h1>
                <CartItemList></CartItemList>
                <></>
            </div>
        </>
    )
}

export default CartPage