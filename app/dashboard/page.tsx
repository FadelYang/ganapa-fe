'use client'
import { NavigationBar } from '@/components/navigation-bar'
import withAdminAuth from '@/components/with-admnin-auth'
import React from 'react'

const DashboardAdminPage = () => {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className='container px-4 md:px-6 mx-auto'>Halo admin</div>
    </>
  )
}

export default withAdminAuth(DashboardAdminPage)