'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { isAuthenticated, logout } from '@/utils/auth'
import Link from 'next/link'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const [isLogin, setIsLogin] = useState<boolean>(isAuthenticated());
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = () => {
            if (!isAuthenticated()) {
                setIsLogin(isAuthenticated())
            }
            
            checkAuthentication()
        }
    }, []);

    const handleLogout = () => {
        const confirmLogout = confirm('Mau logout?')
        if (confirmLogout) {   
            logout()
            setIsLogin(false)
            router.push('/')
        }
    }

    return (
        <>
            {
                isLogin ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">You are Login</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User />
                                    <span>Profile</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut />
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu> :
                    <Link
                        href={isLogin ? "#" : "/login"}
                        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                    >
                        <Button>Login</Button>
                    </Link>

            }
        </>
    )
}

export default LoginButton