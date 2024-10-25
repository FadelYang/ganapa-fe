'use client'
import { isAuthenticated } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface Product {
    id: number
    name: string
    description: string
    price: number
    stock: number
    image: string
    productCategoryId: number
}

interface CartItem {
    id: number
    userId: number
    productId: number
    quantity: number
    product: Product
}

const CartItemList = () => {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            const itemTotal = Number(cartItem.product.price) * cartItem.quantity;
            return total + itemTotal;
        }, 0)
    };

    const totalPrice = calculateTotalPrice()

    const token = localStorage.getItem('token')

    const getCartItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/carts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()
            setCartItems(data)
        } catch (error) {
            console.log('Failed fetch cart items data', error)

        }
    }

    const addItemQuantity = async (e: any, cartItemId: number) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/carts/${cartItemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                change: 1
            })
        })

        if (response.ok) {
            console.log('Sukses menambah kuantitas item')

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            )
        }
    }

    const subItemQuantity = async (e: any, cartItemId: number, currentQuantity: number) => {
        e.preventDefault()

        if (currentQuantity == 1) {
            alert('Minimal kuantitas item adalah 1')
            return
        }

        const response = await fetch(`http://localhost:8000/carts/${cartItemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                change: -1
            })
        })

        if (response.ok) {
            console.log('Sukses mengurangi kuantitas item')

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            )
        }
    }

    const deleteItemFromCart = async (e: any, cartItemId: number) => {
        e.preventDefault()
        if (confirm('Apakah kamu yakin ingin menghapus item ini dari cart?')) {
            const response = await fetch(`http://localhost:8000/carts/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                alert('Berhasil menghapus item dari keranjang')

                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== cartItemId)
                );
            }
        }

    }

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/')
        } else {
            getCartItems()
        }
    }, [router])

    return (
        <>
            <div className='mt-10'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold text-black'>Product</TableHead>
                            <TableHead className='font-bold text-black text-center'>Price</TableHead>
                            <TableHead className='font-bold text-black text-center'>Quantity</TableHead>
                            <TableHead className='font-bold text-black text-center'>Total Price</TableHead>
                            <TableHead className='font-bold text-black text-center'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems.map(cartItem => (
                            <TableRow key={cartItem.id}>
                                <TableCell className='py-10'>{cartItem.product.name}</TableCell>
                                <TableCell className='text-center'>Rp.
                                    {new Intl.NumberFormat('de-DE', {
                                        style: 'decimal',
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(cartItem.product.price)}
                                </TableCell>
                                <TableCell className='text-center'>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <button onClick={(e) => subItemQuantity(e, cartItem.id, cartItem.quantity)} className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>-</button>
                                        {cartItem.quantity}
                                        <button onClick={(e) => addItemQuantity(e, cartItem.id)} className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>+</button>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>
                                    Rp.
                                    {new Intl.NumberFormat('de-DE', {
                                        style: 'decimal',
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(cartItem.product.price * cartItem.quantity)}
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Button onClick={(e) => deleteItemFromCart(e, cartItem.id)}>Hapus Item</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex gap-2'>
                Total:
                <span className='font-bold'>
                    Rp.
                    {new Intl.NumberFormat('de-DE', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(totalPrice)}
                </span>
            </div>
        </>
    )
}

export default CartItemList