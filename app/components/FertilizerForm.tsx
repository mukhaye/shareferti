import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FertilizerForm({ onSubmit }) {
  const [fertilizer, setFertilizer] = useState({
    name: "",
    quantity: 0,
    unit: "",
    location: "",
    type: "",
    composition: "",
    expirationDate: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(fertilizer)
    setFertilizer({
      name: "",
      quantity: 0,
      unit: "",
      location: "",
      type: "",
      composition: "",
      expirationDate: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Fertilizer Name</Label>
        <Input
          id="name"
          value={fertilizer.name}
          onChange={(e) => setFertilizer({ ...fertilizer, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={fertilizer.quantity}
          onChange={(e) => setFertilizer({ ...fertilizer, quantity: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          value={fertilizer.unit}
          onChange={(e) => setFertilizer({ ...fertilizer, unit: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={fertilizer.location}
          onChange={(e) => setFertilizer({ ...fertilizer, location: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          value={fertilizer.type}
          onChange={(e) => setFertilizer({ ...fertilizer, type: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="composition">Composition</Label>
        <Textarea
          id="composition"
          value={fertilizer.composition}
          onChange={(e) => setFertilizer({ ...fertilizer, composition: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="expirationDate">Expiration Date</Label>
        <Input
          id="expirationDate"
          type="date"
          value={fertilizer.expirationDate}
          onChange={(e) => setFertilizer({ ...fertilizer, expirationDate: e.target.value })}
        />
      </div>
      <Button type="submit">Add Fertilizer Listing</Button>
    </form>
  )
}
