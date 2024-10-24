'use client'
import { NavigationBar } from '@/components/navigation-bar'
import ProductTable from '@/components/products-table'
import ProfileCard from '@/components/ui/profile-card'
import withAdminAuth from '@/components/with-admnin-auth'
import React from 'react'

const DashboardAdminPage = () => {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className='container px-4 md:px-6 mx-auto mt-24'>
        <ProfileCard></ProfileCard>
        <ProductTable></ProductTable>
      </div>
    </>
  )
}

export default withAdminAuth(DashboardAdminPage)