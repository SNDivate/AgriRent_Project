'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { getUserBookings } from '../../lib/api'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        const userBookings = await getUserBookings()
        setBookings(userBookings)
        setError(null)
      } catch (error) {
        console.error('Failed to fetch bookings:', error)
        setError('Failed to fetch bookings. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (isLoading) return <p>Loading bookings...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{booking.equipment.name}</h2>
              <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              
              {/* Email Input Field */}
              <Input
                isRequired
                type="email"
                label="Email"
                defaultValue="junior@nextui.org"
                className="max-w-xs"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
