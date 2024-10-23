import React from 'react'
import ProductCard from './product-card'

const itemsCategories = [
    {
        "id": 2,
        "name": "Makanan"
    }
]

const items = [
    {
        "id": 1,
        "name": "Indomie Goreng",
        "description": "Indomie Goreng",
        "price": 3500,
        "stock": 100,
        "image": "https://dummyimage.com/600x400/000/fff",
        "productCategoryId": itemsCategories[0].id
    },
    {
        "id": 2,
        "name": "Indomie Kuah",
        "description": "Indomie Goreng",
        "price": 3500,
        "stock": 100,
        "image": "https://dummyimage.com/600x400/000/fff",
        "productCategoryId": itemsCategories[0].id
    },
    {
        "id": 3,
        "name": "Mie Sukses isi 2",
        "description": "Indomie Goreng",
        "price": 15000,
        "stock": 12,
        "image": "https://dummyimage.com/600x400/000/fff",
        "productCategoryId": itemsCategories[0].id
    }
]

const ProductList = () => {
    return (
        <div className='mx-auto mb-5'>
            <h1 className='text-center text-3xl font-semibold mb-5'>Produk yang Bisa Dibayar</h1>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {items.map(item =>
                        <ProductCard name={item.name} price={item.price} image={item.image}></ProductCard>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList