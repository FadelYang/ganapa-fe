import React from 'react'

const itemsCategories = [
    {
        "id": 1,
        "name": "Pakaian"
    }
]

const items = [
    {
        "name": "Sepatu Lari Nuke Speed1200",
        "price": 45000,
        "stock": 12,
        "productCategoryId": itemsCategories[0].id
    },
    {
        "name": "Baju Bola Jakarta United",
        "price": 12000,
        "stock": 100,
        "productCategoryId": itemsCategories[0].id
    },
    {
        "name": "Celana Panjang 2XL",
        "price": 15000,
        "stock": 12,
        "productCategoryId": itemsCategories[0].id
    },
    {
        "name": "Topi Tennis Meja",
        "price": 24000,
        "stock": 120,
        "productCategoryId": itemsCategories[0].id
    },
    {
        "name": "Sepatu Sepak Bola Adios W2400",
        "price": 24000,
        "stock": 12,
        "productCategoryId": itemsCategories[0].id
    },
    {
        "name": "Kaos Kaki Panjang",
        "price": 23000,
        "stock": 10,
        "productCategoryId": itemsCategories[0].id
    }
]

const ProductList = () => {
    return (
        <div className='mx-auto'>
            <h1 className='text-center text-3xl font-semibold mb-5'>Daftar Barang yang Bisa Dibayar</h1>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {items.map(item =>
                        <div className="">
                            {item.name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList