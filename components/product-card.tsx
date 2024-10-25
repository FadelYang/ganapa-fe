import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button';

const ProductCard = (props: any) => {
    const addItenmToCard = async (e: any, productId: number, quantity: number = 1) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        if (!token) {
            console.log('Token not found');
            return
        }

        try {
            const response = await fetch('http://localhost:8000/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity
                })
            })

            if (response.ok) {
                alert("berhasil menambahkan item ke dalam keranjang")
                return
            } else {
                console.log('Gagal menambahkan item ke dalam keranjang');
                return
            }
        } catch (error) {
            console.log(`Something error`, error);
        }

    }

    const formattedCurrency = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(props.price);

    return (
        <Card className="w-[350px]" key={props.id}>
            <CardContent>
                <div className='my-5'>
                    <img src={props.image} alt={props.name} className='rounded-lg' />
                </div>
                <div className='flex mt-10 justify-between items-center'>
                    <div>
                        <div className='text-md font-bold'>{props.name}</div>
                        <div>Rp.{formattedCurrency}</div>
                    </div>
                    <div>
                        <Button onClick={(e => addItenmToCard(e, props.id))}>Add to Cart</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard