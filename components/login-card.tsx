import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function LoginCard() {
  return (
    <>
      <div className="flex flex-col gap-6 h-screen items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-center">Login</h2>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </div>
    </>
  )
}
