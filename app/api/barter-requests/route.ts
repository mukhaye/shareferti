import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const barterRequest = await prisma.barterRequest.create({
    data: {
      ...data,
      requesterId: session.user.id
    }
  })

  return NextResponse.json(barterRequest)
}
