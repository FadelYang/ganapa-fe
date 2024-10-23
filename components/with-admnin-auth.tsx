'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const withAdminAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      const role = localStorage.getItem('role')

      // Redirect if not admin
      if (role !== 'ADMIN') {
        alert('Kamu tidak bisa mengakses halaman ini')
        router.replace('/')
      } else {
        setLoading(false)
      }
    }, [router])

    if (loading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }
}

export default withAdminAuth
