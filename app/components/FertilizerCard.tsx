import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import BarterRequestForm from "./BarterRequestForm"

export default function FertilizerCard({ fertilizer, onBarterRequest }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleBarterRequest = async (barterData) => {
    await onBarterRequest(fertilizer.id, barterData)
    setIsDialogOpen(false)
  }

  return (
    <div className="mb-4 p-4 border rounded">
      <h3 className="font-bold">{fertilizer.name}</h3>
      <p>Quantity: {fertilizer.quantity} {fertilizer.unit}</p>
      <p>Location: {fertilizer.location}</p>
      <p>Farmer: {fertilizer.user.name}</p>
      <p>Type: {fertilizer.type}</p>
      {fertilizer.composition && <p>Composition: {fertilizer.composition}</p>}
      {fertilizer.expirationDate && <p>Expires: {new Date(fertilizer.expirationDate).toLocaleDateString()}</p>}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2">Request or Barter</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request or Barter for Fertilizer</DialogTitle>
            <DialogDescription>
              Offer a trade or service in exchange for the fertilizer.
            </DialogDescription>
          </DialogHeader>
          <BarterRequestForm onSubmit={handleBarterRequest} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
