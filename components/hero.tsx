import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col gap-6 h-screen items-center justify-center'>
      <h1 className='font-bold text-3xl md:text-5xl'>Toserba</h1>
      <h2 className='font-regular text-xl md:text-2xl'>Toko Serba Bayar 🛒</h2>
      <div>
        <Button size="sm">Scroll untuk melihat daftar barang yang bisa dibayar</Button>
      </div>
    </div>
  )
}

export default Hero