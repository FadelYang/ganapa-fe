'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/utils/auth";

export function LoginCard() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const token = await loginUser(email, password)

      localStorage.setItem('token', token)

      setShowAlert(true)

      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <>
      <form className="flex flex-col gap-6 h-screen items-center justify-center" onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-center">Login</h2>
          <div className="space-y-2">
            <Label htmlFor="username">Email</Label>
            <Input id="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        {error && <p>{error}</p>}
        {showAlert && <p>Login Success, redirect to home page...</p>}
      </form>
    </>
  )
}
