"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FertilizerCard from "@/components/FertilizerCard"
import FertilizerForm from "@/components/FertilizerForm"

export default function Home() {
  const { data: session } = useSession()
  const [fertilizers, setFertilizers] = useState([])
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (location) {
      fetchFertilizers()
    }
  }, [location])

  const fetchFertilizers = async () => {
    const url = location
      ? `/api/fertilizers?lat=${location.lat}&lng=${location.lng}`
      : "/api/fertilizers"
    const res = await fetch(url)
    const data = await res.json()
    setFertilizers(data)
  }

  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to FertiliShare</h1>
        <p>Please sign in to access the app.</p>
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">FertiliShare</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Fertilizers</CardTitle>
            <CardDescription>Browse and request fertilizers from other farmers</CardDescription>
          </CardHeader>
          <CardContent>
            {fertilizers.map((fertilizer) => (
              <FertilizerCard key={fertilizer.id} fertilizer={fertilizer} onBarterRequest={handleBarterRequest} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Fertilizer Listing</CardTitle>
            <CardDescription>Share your excess fertilizer with other farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <FertilizerForm onSubmit={handleAddFertilizer} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
