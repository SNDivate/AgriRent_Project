"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getAllEquipment } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { AiFillHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdBuild } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export default function EquipmentPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const equipmentRefs = useRef([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        const data = await getAllEquipment();
        setEquipmentItems(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
        setError("Failed to load equipment. Please try again later.");
        setEquipmentItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipment();

    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // Clear authentication tokens or any session data if needed
    localStorage.removeItem("authToken"); // Example if using localStorage

    // Redirect to the login page or any other page
    router.push("/login");

    // Optional: display a logout success message
    alert("You have successfully logged out.");
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleBooking = async (item) => {
    if (!isLoggedIn) {
      if (
        window.confirm(
          "Please login to book equipment. Would you like to login now?"
        )
      ) {
        router.push("/login");
      }
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          equipmentId: item._id,
          startDate: item.availabilityDateStart,
          endDate: item.availabilityDateEnd,
        }),
      });

      if (response.ok) {
        alert("Booking successful!");
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      alert("Failed to book equipment. Please try again.");
      console.error("Booking error:", error);
    }
  };

  const sortedAndFilteredItems = equipmentItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.rentalPrice) - parseFloat(b.rentalPrice);
        case "condition":
          return a.condition.localeCompare(b.condition);
        case "date":
          return (
            new Date(a.availabilityDateStart) -
            new Date(b.availabilityDateStart)
          );
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = (item) => {
    setSelectedEquipment(item);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-green-200 text-green-900 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
          }`}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              Available Equipment
            </h1>

            {/* Search and Sort Controls */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="search"
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-white shadow-lg text-black focus:outline-none"
                  placeholder="Search by name, description, or owner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <select
                className="h-12 px-4 rounded-lg bg-white shadow-lg text-black focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="condition">Sort by Condition</option>
                <option value="date">Sort by Availability Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl font-semibold">Loading equipment...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedAndFilteredItems.length > 0 ? (
                sortedAndFilteredItems.map((item, index) => (
                  <Card
                    key={item._id}
                    ref={(el) => (equipmentRefs.current[index] = el)}
                    className="hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden"
                  >
                    <CardHeader className="pb-0 pt-4 px-4">
                      <h4 className="font-bold text-xl text-center w-full">
                        {item.name}
                      </h4>
                    </CardHeader>
                    <CardBody className="py-4">
                      <div className="relative group">
                        <Image
                          alt={item.name}
                          className="object-cover rounded-xl w-full h-48 transition-transform duration-300 group-hover:scale-105"
                          src={getImageUrl(item.image)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl" />
                      </div>

                      <div className="mt-4 space-y-2">
                        <p className="text-sm line-clamp-2 text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Condition:</span>{" "}
                          {item.condition}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Owner:</span>{" "}
                          {item.ownerName}
                        </p>
                        <p className="text-green-600 font-bold">
                          ₹{item.rentalPrice}/day
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                            onClick={() => handleViewDetails(item)}
                          >
                            View Details
                          </button>
                          <button
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                            onClick={() => handleBooking(item)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-xl font-semibold">No equipment found.</p>
                </div>
              )}
            </div>
          )}

          {/* Detailed Modal */}
          {selectedEquipment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold mb-6 pr-8">
                  {selectedEquipment.name}
                </h2>

                <Image
                  alt={selectedEquipment.name}
                  src={getImageUrl(selectedEquipment.image)}
                  className="mx-auto mb-6 rounded-lg h-64 w-full object-cover"
                />

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedEquipment.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold block">Condition:</span>
                        <span className="text-gray-700">
                          {selectedEquipment.condition}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold block">
                          Rental Price:
                        </span>
                        <span className="text-green-600 font-bold">
                          ₹{selectedEquipment.rentalPrice}/day
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold block">
                          Available From:
                        </span>
                        <span>
                          {formatDate(selectedEquipment.availabilityDateStart)}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold block">
                          Available Until:
                        </span>
                        <span>
                          {formatDate(selectedEquipment.availabilityDateEnd)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold block">Owner:</span>
                        <span className="text-gray-700">
                          {selectedEquipment.ownerName}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold block">
                          Contact Number:
                        </span>
                        <span className="text-gray-700">
                          {selectedEquipment.contactNumber}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold block">Address:</span>
                        <span className="text-gray-700">
                          {selectedEquipment.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => handleBooking(selectedEquipment)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
