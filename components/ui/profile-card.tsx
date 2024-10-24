import { isAuthenticated } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './card';

interface User {
  email: string
  name: string
  role: string
}

const ProfileCard = () => {
  const router = useRouter()
  const [user, setUser] = useState<User>();

  const token = localStorage.getItem('token')


  const getUserProfile = async () => {
    if (!token) {
      console.log('No token found');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.log('Failse to fetch data', error);
    }
  }


  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/')
    } else {
      getUserProfile()
    }
  }, [router])

  return (
    <Card className="w-[350px] pt-5">
      <CardContent>
        <div className='flex justify-between items-center'>
          <div>
            <div className='font-bold'>{user?.name}</div>
            <div>{user?.email}</div>
          </div>
          <div>
            <img src="/user.png" className='w-10' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard