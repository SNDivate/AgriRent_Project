'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getEquipment, createBooking } from '@/lib/api'
import { Button, Input, Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { toast } from 'sonner'

export default function EquipmentDetail({ params }) {
  const [equipment, setEquipment] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await getEquipment()
        const selectedEquipment = equipmentData.find(e => e._id === params.id)
        setEquipment(selectedEquipment)
      } catch (error) {
        console.error('Failed to fetch equipment:', error)
        toast.error('Failed to load equipment details')
      }
    }
    fetchEquipment()
  }, [params.id])

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      await createBooking({ equipmentId: equipment._id, rentalDate: bookingDate })
      toast.success('Booking created successfully')
      router.push('/bookings')
    } catch (error) {
      console.error('Failed to create booking:', error)
      toast.error('Failed to create booking')
    }
  }

  if (!equipment) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex-col items-start">
          <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
          <p className="text-gray-500">{equipment.ownerName}</p>
        </CardHeader>
        <CardBody>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Image
                src={equipment.image || "/placeholder.svg"}
                alt={equipment.name}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
            <div className="space-y-4">
              <p><strong>Description:</strong> {equipment.description}</p>
              <p><strong>Condition:</strong> {equipment.condition}</p>
              <p><strong>Rental Price:</strong> ${equipment.rentalPrice}/day</p>
              <p><strong>Available from:</strong> {new Date(equipment.availabilityDate).toLocaleDateString()}</p>
              <p><strong>Contact:</strong> {equipment.contactNumber}</p>
              <p><strong>Address:</strong> {equipment.address}</p>
            </div>
          </div>
          <form onSubmit={handleBooking} className="mt-6 space-y-4">
            <Input
              type="date"
              label="Booking Date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
            <Button type="submit" color="primary" className="w-full">
              Book Now
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}