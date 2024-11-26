"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
// import Sidebar from './Sidebar'; // Import the Sidebar component
import { AiFillHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdBuild } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiLogOut, FiPhone } from "react-icons/fi"; // Import the contact icon

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // This simulates form submission
      toast.success("Your message has been sent successfully!");

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        description: "",
      });

      // Optionally, redirect to another page after submission
      // router.push('/thank-you');
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to send your message. Please try again.");
    }
  };

  return (
    <div className="contact-container flex items-center justify-center bg-green-100 relative min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-green-200 text-green-900 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="space-y-6 mt-12 p-4">
          <li>
            <a
              href="/"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <AiFillHome className="mr-2" />
              Home
            </a>
          </li>
          <li>
            <a
              href="/explore"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <MdBuild className="mr-2" />
              Equipment
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <BsInfoCircleFill className="mr-2" />
              About Us
            </a>
          </li>

          <li>
            <a
              href="/login"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <AiOutlineLogin className="mr-2" />
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <AiOutlineUserAdd className="mr-2" />
              Register
            </a>
          </li>
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 text-black bg-green-500 p-2 rounded-md focus:outline-none z-50"
      >
        <FaBars size={24} />
      </button>

      <div className="contact-form-wrapper flex w-full max-w-4xl bg-white shadow-black shadow-lg rounded-lg overflow-hidden">
        <div className="contact-image" style={{ flex: "0 0 50%" }}>
          <img
            src="/contact.png"
            alt="Contact Us"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="contact-form-container" style={{ flex: "0 0 50%" }}>
          <div className="p-10 flex flex-col justify-center">
            <h1 className="contact-title text-black-500 text-3xl font-bold mb-6">
              Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className="form__group field mb-6">
                <Input
                  label="Name"
                  variant="bordered"
                  placeholder="Enter your name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email Field */}
              <div className="form__group field mb-6">
                <Input
                  label="Email"
                  variant="bordered"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Description Field */}
              <div className="form__group field mb-6">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your message"
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-center space-x-2 mb-4">
                <Button
                  type="submit"
                  className="contact-submit-button bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className="contact-cancel-button"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
