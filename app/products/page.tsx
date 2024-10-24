import { NavigationBar } from '@/components/navigation-bar'
import ProductCard from '@/components/product-card'
import ProductListWithPagination from '@/components/product-list-with-pagination'
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


const ProductPage = () => {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className='mt-28'>
                <ProductListWithPagination></ProductListWithPagination>
            </div>
        </>
    )
}

export default ProductPage