'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from './product-card'
import { Button } from './ui/button'
import Link from 'next/link'

interface Product {
    id: number
    name: string
    description: string
    image: string
    price: number
    stock: number
    productCategoryId: number
}

const ProductList = () => {
    const [products, setproducts] = useState<Product[]>([]);

    const getProducts = async (page: number = 1) => {
        try {
            const response = await fetch(`http://localhost:8000/products?page=${page}`)
            const data = await response.json()
            setproducts(data.data)
            console.log(data.data);
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    }

    const imageBaseUrl = 'http://localhost:8000/uploads/'

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <div className='mx-auto my-5'>
                <h1 className='text-center text-3xl font-semibold mb-5'>Produk yang Bisa Dibayar</h1>
                <div className='flex justify-center'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
                        {products.map(product =>
                            <ProductCard name={product.name} price={product.price} image={`${imageBaseUrl}${product.image}`}></ProductCard>
                        )}
                    </div>
                </div>
                <div className='flex justify-center items-center mt-5'>
                    <Link href="/products">
                        <Button>Check Selengkapnya {'>'}</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ProductList