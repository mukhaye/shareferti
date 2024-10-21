import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  let fertilizers

  if (lat && lng) {
    // Implement geolocation-based query
    fertilizers = await prisma.fertilizer.findMany({
      // Add geolocation filtering logic here
    })
  } else {
    fertilizers = await prisma.fertilizer.findMany({
      include: { user: true }
    })
  }

  return NextResponse.json(fertilizers)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const fertilizer = await prisma.fertilizer.create({
    data: {
      ...data,
      userId: session.user.id
    }
  })

  return NextResponse.json(fertilizer)
}
