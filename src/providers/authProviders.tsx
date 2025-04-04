"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode,
  session: Session
}): React.ReactNode {

  return <SessionProvider session={session}>{children}</SessionProvider>
}