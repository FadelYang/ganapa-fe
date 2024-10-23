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
                <div className='flex mt-10 justify-between items-center'>
                    <div>
                        <div className='text-lg font-bold'>{props.name}</div>
                        <div>Rp.{formattedCurrency}</div>
                    </div>
                    <div>
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard