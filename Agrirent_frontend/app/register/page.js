"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react"; // Ensure @nextui-org/react is installed
import Image from "next/image"; // Import Image component from Next.js
import { toast } from "sonner";
import { registerUser } from "@/lib/api";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  // Removed error state
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response) {
        toast.success("Registration successful!");
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      contactNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="flex flex-col w-2/5 justify-center items-center bg-green-300 rounded-r-[20%] relative">
        <Image
          src="/backReg.png"
          width={700}
          height={700}
          alt="Registration"
          objectFit="cover"
          className="rounded-r-[20%]"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-1/2 justify-center items-center ">
        <div className="w-[calc(100%_-_100px)] p-9 bg-white rounded-lg shadow-lg border border-black-200 text-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name and Email Input */}
            <div className="flex gap-6">
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                variant="bordered"
                label="Full Name"
                placeholder="John Doe"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="bordered"
                label="Email"
                placeholder="johndoe@example.com"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
            </div>

            {/* Contact Number and Address Input */}
            <div className="flex gap-6">
              <Input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                variant="bordered"
                label="Contact Number"
                placeholder="+91 xxxxxxxxxx"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="bordered"
                label="Address"
                placeholder="123 Main St"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
            </div>

            {/* Password and Confirm Password Input */}
            <div className="flex gap-6">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="bordered"
                label="Password"
                placeholder="Strong password"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="bordered"
                label="Confirm Password"
                placeholder="Re-enter password"
                className="flex-1"
                required
                labelClassName="text-lg"
                placeholderClassName="text-sm"
              />
            </div>

            {/* Cancel and Register Buttons */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>

            {/* Already Registered? Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-gray-700">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
