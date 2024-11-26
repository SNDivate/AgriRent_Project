'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { toast } from 'sonner';
import Image from 'next/image';
import { addEquipment } from '@/lib/api';

export default function AddEquipment() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    condition: 'Good',
    rentalPrice: '',
    availabilityDate: '',
    image: null,
    ownerName: '',
    address: '',
    contactNumber: '',
  });
  
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.rentalPrice || !formData.image) {
        throw new Error('Please fill in all required fields');
      }

      // Create a FormData object to handle file upload
      const equipmentFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'availabilityDate') {
          equipmentFormData.append(key, JSON.stringify(formData[key]));
        } else {
          equipmentFormData.append(key, formData[key]);
        }
      });

      const result = await addEquipment(equipmentFormData);
      console.log(result);
      toast.success('Equipment added successfully!');
      router.push('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to add equipment');
      toast.error(error.message || 'Failed to add equipment');
    }
  };

  return (
    <div className="add-equipment-page-container flex h-screen">
      {/* Left Side: Image */}
      <div className="flex flex-col w-2/3 justify-center items-center bg-green-100 rounded-r-[20%] relative">
        <Image
          src="/add3.png"
          width={700}
          height={700}
          alt="Registration"
          objectFit="cover"
          className="rounded-r-[20%]"
        />
      </div>

      {/* Right Side: Form */}
      <div className="add-equipment-form-container w-1/2 flex items-center justify-center p-8">
        <div className="form-wrapper w-full max-w-2xl h-[90vh] shadow-lg border border-gray-200 rounded-lg p-12">
          <h1 className="add-equipment-title text-3xl font-bold mb-6 text-center">Add New Equipment</h1>
          {error && <p className="add-equipment-error text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="add-equipment-form space-y-4">

            {/* Row 1: Equipment Name and Condition */}
            <div className="flex justify-between space-x-4">
              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Equipment Name</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize w-full">
                      {formData.name || "Select Equipment"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Equipment name"
                    selectionMode="single"
                    onAction={(key) => setFormData({ ...formData, name: key })}
                  >
                    <DropdownItem key="Tractor">Tractor (ट्रॅक्टर)</DropdownItem>
                    <DropdownItem key="Harvester">Harvester (हार्वेस्टर)</DropdownItem>
                    <DropdownItem key="Khurp">Khurp (खुरपी)</DropdownItem>
                    <DropdownItem key="Plow">Plow (हलकुंठ)</DropdownItem>
                    <DropdownItem key="Seed Drill">Seed Drill (बीज ड्रिल)</DropdownItem>
                    <DropdownItem key="Cultivator">Cultivator (कुल्टीव्हेटर)</DropdownItem>
                    <DropdownItem key="Sprayer">Sprayer (स्प्रेयर)</DropdownItem>
                    <DropdownItem key="Rotavator">Rotavator (रोटाव्हेटर)</DropdownItem>
                    <DropdownItem key="Harvesting Machine">Harvesting Machine (हार्वेस्टिंग मशीन)</DropdownItem>
                    <DropdownItem key="Fertilizer Spreader">Fertilizer Spreader (खते पसरवणारा)</DropdownItem>

                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Condition</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize w-full">
                      {formData.condition || "Select Condition"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Equipment Condition"
                    selectionMode="single"
                    onAction={(key) => setFormData({ ...formData, condition: key })}
                  >
                    <DropdownItem key="Good">Good</DropdownItem>
                    <DropdownItem key="Better">Better</DropdownItem>
                    <DropdownItem key="Best">Best</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            {/* Row 2: Rental Price and Availability Date */}
            <div className="flex justify-between space-x-4">
              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Rental Price</label>
                <Input
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleChange}
                  type="number"
                  placeholder="Rental Price"
                  variant="bordered"
                  className="shadow-sm border-gray-300"
                />
              </div>

              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Availability Date</label>
                <DateRangePicker
                  isRequired
                  defaultValue={{
                    start: parseDate("2024-04-01"),
                    end: parseDate("2024-04-08"),
                  }}
                  onChange={(range) => setFormData({ ...formData, availabilityDate: range })}
                  className="shadow-sm border-gray-300"
                />
              </div>
            </div>

            {/* Row 3: Owner Name and Address */}
            <div className="flex justify-between space-x-4">
              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Owner Name</label>
                <Input
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Owner Name"
                  variant="bordered"
                  className="shadow-sm border-gray-300"
                />
              </div>

              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  variant="bordered"
                  className="shadow-sm border-gray-300"
                />
              </div>
            </div>

            {/* Row 4: Contact Number and Upload Image */}
            <div className="flex justify-between space-x-4">
              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Contact Number</label>
                <Input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Contact Number"
                  variant="bordered"
                  className="shadow-sm border-gray-300"
                />
              </div>

              <div className="form-row flex-1">
                <label className="text-sm font-medium mb-2">Upload Image</label>
                <Input
                  name="image"
                  onChange={handleChange}
                  type="file"
                  variant="bordered"
                  isRequired
                  className="shadow-sm border-gray-300"
                />
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="form-row flex flex-col mb-4">
              <label className="text-sm font-medium mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                variant="bordered"
                labelPlacement="outside"
                className="w-full shadow-sm border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                type="submit"
                className="bg-success-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-success-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
