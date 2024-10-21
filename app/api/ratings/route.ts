import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const rating = await prisma.rating.create({
    data: {
      ...data,
      userId: session.user.id
    }
  })

  return NextResponse.json(rating)
}
