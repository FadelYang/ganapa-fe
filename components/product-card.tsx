import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';

const ProductCard = (props: any) => {
    const formattedCurrency = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(props.price);

    return (
        <Card className="w-[350px]">
            <CardContent>
                <div className='my-5'>
                    <img src={props.image} alt={props.name} className='rounded-lg' />
                </div>
            </CardContent>
            <CardHeader>
                <CardDescription>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-1'>
                            <CardTitle className='text-xl font-bold text-black'>{props.name}</CardTitle>
                            <div>Rp.{formattedCurrency}</div>
                        </div>
                        <Button>Add to Cart</Button>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default ProductCard