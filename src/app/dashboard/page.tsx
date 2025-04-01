'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { signOut } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    }
  })
  
  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <div className="mt-4">
          <p className="text-gray-700">Logged in as: {session?.user?.email}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}