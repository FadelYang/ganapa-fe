import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col gap-6 h-screen items-center justify-center'>
      <h1 className='font-bold text-7xl'>Toserba</h1>
      <h2 className='font-regular text-3xl'>Toko Serba Bayar 🛒</h2>
      <Button>Scroll untuk melihat daftar barang yang bisa dibayar</Button>
    </div>
  )
}

export default Hero