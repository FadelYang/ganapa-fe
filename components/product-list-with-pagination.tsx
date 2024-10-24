'use client'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

interface Product {
    id: number
    name: string
    description: string
    image: string
    price: number
    stock: number
    productCategoryId: number
}

interface Meta {
    total: number;
    lastPage: number;
    currentPage: number;
    totalPerPage: number;
    prevPage: number | null;
    nextPage: number | null;
}


const ProductListWithPagination = () => {
    const [products, setproducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async (page: number = 1) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/products?page=${page}`)
            const data = await response.json()
            setproducts(data.data)
            setMeta(data.meta)
            console.log(data.data);
        } catch (error) {
            console.log('Failed to fetch data', error);
        } finally {
            setLoading(false)
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
                    {loading ?
                        <div className='flex justify-center'>
                            Memuat product...
                        </div>
                        :
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
                            {products.map(product =>
                                <ProductCard name={product.name} price={product.price} image={`${imageBaseUrl}${product.image}`}></ProductCard>
                            )}
                        </div>}
                </div>
                <div className='flex justify-center items-center mt-5 gap-5'>
                    {meta && (
                        <>
                            <Button
                                variant='outline'
                                disabled={!meta.prevPage}
                                onClick={() => getProducts(meta.currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <span className='text-sm font-medium'>
                                Page {meta.currentPage} of {meta.lastPage}
                            </span>
                            <Button
                                variant='outline'
                                disabled={!meta.nextPage}
                                onClick={() => getProducts(meta.currentPage + 1)}
                            >
                                Next
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductListWithPagination