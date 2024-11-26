// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { SearchIcon } from "@/components/ui/SearchIcon";
// import { getAllEquipment } from "@/lib/api";
// // Add the formatDate function
// const formatDate = (dateString) => {
//   if (!dateString) return "Not specified";
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

// export default function Home() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [equipmentItems, setEquipmentItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const equipmentRefs = useRef([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const fetchEquipment = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getAllEquipment();
//         setEquipmentItems(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch equipment:", err);
//         setError("Failed to load equipment. Please try again later.");
//         setEquipmentItems([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const checkLoginStatus = () => {
//       const token = localStorage.getItem('token'); // Or your auth method
//       setIsLoggedIn(!!token);
//     };

//     fetchEquipment();
//     checkLoginStatus();
//   }, []);

//   const handleBooking = async (item) => {
//     if (!isLoggedIn) {
//       if (window.confirm('Please login to book equipment. Would you like to login now?')) {
//         router.push('/login');
//       }
//       return;
//     }

//     try {
//       const response = await fetch('/api/bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token
//         },
//         body: JSON.stringify({
//           equipmentId: item._id,
//           startDate: item.availabilityDateStart,
//           endDate: item.availabilityDateEnd,
//         })
//       });

//       if (response.ok) {
//         alert('Booking successful!');
//       } else {
//         throw new Error('Booking failed');
//       }
//     } catch (error) {
//       alert('Failed to book equipment. Please try again.');
//       console.error('Booking error:', error);
//     }
//   };

//   const filteredItems = equipmentItems.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "/placeholder.png";
//     if (imagePath.startsWith("http")) return imagePath;
//     return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`;
//   };

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     const matchedIndex = equipmentItems.findIndex((item) =>
//       item.name.toLowerCase().includes(term.toLowerCase())
//     );

//     if (matchedIndex !== -1) {
//       equipmentRefs.current[matchedIndex]?.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   };

//   const handleViewDetails = (item) => {
//     setSelectedEquipment(item);
//   };

//   const closeModal = () => {
//     setSelectedEquipment(null);
//   };

//   return (
//     <>
//       {/* Sticky Navbar */}
//       <nav className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-4 sticky top-0 z-30">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="AgriRent Logo" width="50" height="50" />
//             <p className="font-bold text-black text-3xl">AgriRent</p>
//           </div>

//           <div className="hidden sm:flex flex-grow justify-center mx-28">
//             <div className="relative w-full max-w-[24rem]">
//               <input
//                 type="search"
//                 className="w-full h-10 pl-10 pr-4 rounded-full bg-white shadow-sm text-black focus:outline-none"
//                 placeholder="Search equipment, location..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               <svg
//                 className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M11 19a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm10.708-9.708l-5.25 5.25"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <a href="/about" className="font-bold">About Us</a>
//             <a href="/contact" className="font-bold">Contact</a>
//             <a href="/login" className="font-bold">Login</a>
//             <a href="/register" className="font-bold">Register</a>
//             <a href="/explore" className="font-bold">Equipment</a>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main
//         className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center pt-24"
//         style={{ backgroundImage: "url('../pixelcut-export.jpeg')" }}
//       >
//         <section className="text-left">
//           <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-10 pb-5 pt-24">
//             <h1 className="text-[70px] font-bold leading-tight mb-4">
//               Welcome to AgriRent
//             </h1>
//             <h3 className="text-[30px] font-semibold mb-4">
//               Renting The Farm Equipment
//             </h3>
//             <p className="text-[22px] text-left max-w-lg">
//               AgriRent offers hassle-free farm equipment rentals at competitive
//               prices. Access high-quality tools with flexible terms to optimize
//               your farming operations effortlessly. Join us today!
//             </p>
//           </div>
//         </section>
//       </main>

//       <div className="bg-green-100 min-h-screen pt-16">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-xl font-semibold">Loading equipment...</p>
//           </div>
//         ) : error ? (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-xl font-semibold text-red-500">{error}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item, index) => (
//                 <Card
//                   key={item._id}
//                   ref={(el) => (equipmentRefs.current[index] = el)}
//                   className="hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden"
//                 >
//                   <CardHeader className="pb-0 pt-4 px-4">
//                     <h4 className="font-bold text-xl text-center w-full">
//                       {item.name}
//                     </h4>
//                   </CardHeader>
//                   <CardBody className="py-4">
//                     <div className="relative group">
//                       <Image
//                         alt={item.name}
//                         className="object-cover rounded-xl w-full h-48 transition-transform duration-300 group-hover:scale-105"
//                         src={getImageUrl(item.image)}
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl" />
//                     </div>
                    
//                     <div className="mt-4 space-y-2">
//                       <p className="text-gray-600">
//                         <span className="font-semibold">Condition:</span> {item.condition}
//                       </p>
//                       <p className="text-green-600 font-bold">
//                         ₹{item.rentalPrice}/day
//                       </p>
//                       <div className="flex gap-2 mt-4">
//                         <button
//                           className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
//                           onClick={() => handleViewDetails(item)}
//                         >
//                           View Details
//                         </button>
//                         <button
//                           className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//                           onClick={() => handleBooking(item)}
//                         >
//                           Book Now
//                         </button>
//                       </div>
//                     </div>
//                   </CardBody>
//                 </Card>
//               ))
//             ) : (
//               <div className="col-span-full text-center">
//                 <p className="text-xl font-semibold">No equipment found.</p>
//               </div>
//             )}
//           </div>
//         )}


//         {/* Detailed Modal */}
//         {selectedEquipment && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
//             <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
//               <button
//                 className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-300"
//                 onClick={closeModal}
//                 aria-label="Close"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
              
//               <h2 className="text-2xl font-bold mb-6 pr-8">
//                 {selectedEquipment.name}
//               </h2>
              
//               <Image
//                 alt={selectedEquipment.name}
//                 src={getImageUrl(selectedEquipment.image)}
//                 className="mx-auto mb-6 rounded-lg h-64 w-full object-cover"
//               />
              
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-lg mb-2">Description</h3>
//                   <p className="text-gray-700">{selectedEquipment.description}</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-4">
//                     <div>
//                       <span className="font-semibold block">Condition:</span>
//                       <span className="text-gray-700">{selectedEquipment.condition}</span>
//                     </div>
                    
//                     <div>
//                       <span className="font-semibold block">Rental Price:</span>
//                       <span className="text-green-600 font-bold">
//                         ₹{selectedEquipment.rentalPrice}/day
//                       </span>
//                     </div>
                    
//                     <div>
//                       <span className="font-semibold block">Available From:</span>
//                       <span>{formatDate(selectedEquipment.availabilityDateStart)}</span>
//                     </div>
                    
//                     <div>
//                       <span className="font-semibold block">Available Until:</span>
//                       <span>{formatDate(selectedEquipment.availabilityDateEnd)}</span>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <span className="font-semibold block">Owner:</span>
//                       <span className="text-gray-700">{selectedEquipment.ownerName}</span>
//                     </div>
                    
//                     <div>
//                       <span className="font-semibold block">Contact Number:</span>
//                       <span className="text-gray-700">{selectedEquipment.contactNumber}</span>
//                     </div>
                    
//                     <div>
//                       <span className="font-semibold block">Address:</span>
//                       <span className="text-gray-700">{selectedEquipment.address}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <button
//                   className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//                   onClick={() => handleBooking(selectedEquipment)}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
   
 

//       <footer className="bg-gradient-to-r from-green-700 via-green-400 to-green-200 py-4">
//         <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
//           <div className="text-center md:text-left text-black">
//             <p className="text-sm">
//               &copy; 2024 AgriRent. All rights reserved.
//             </p>
//             <p className="text-sm mt-2">Contact: 9579112654</p>
//             <p className="text-sm">Email: support@agrirent.com</p>
//           </div>

//           <div className="flex items-center space-x-6">
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-gray-100 transition-colors"
//             >
//               <img src="/insta.png" alt="Instagram" className="w-10 h-10" />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer" 
//               className="hover:text-gray-100 transition-colors"
//             >
//               <img src="/twitter.png" alt="Twitter" className="w-10 h-10" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import {
  getUserBookings,
  getEquipment,
  getAllEquipment,
  createBooking,
  addEquipment,
  updateBooking,
  deleteBooking,
  updateEquipment,
  deleteEquipment,
  getUserProfile,
} from "@/lib/api";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Plus, Calendar, Package, Loader, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import withAuth from "@/components/withAuth";
import { isAuthenticated } from "@/lib/api";
import { FaBars } from "react-icons/fa";
import { AiFillHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdBuild } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiLogOut, FiPhone } from "react-icons/fi"; // Import the contact icon

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [equipment, setEquipment] = useState([]);
  // const [userEquipment, setUserEquipment] = useState([]); // Rename to userEquipment
  const [allEquipment, setAllEquipment] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const {
    isOpen: isBookingOpen,
    onOpen: onBookingOpen,
    onClose: onBookingClose,
  } = useDisclosure();
  const {
    isOpen: isEquipmentOpen,
    onOpen: onEquipmentOpen,
    onClose: onEquipmentClose,
  } = useDisclosure();
  const [newBooking, setNewBooking] = useState({
    equipmentId: "",
    rentalDate: "",
  });
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    description: "",
    condition: "Good",
    rentalPrice: "",
    availabilityDate: null,
    image: null,
    ownerName: "",
    address: "",
    contactNumber: "",
  });
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if rendering on the client
    setIsClient(true);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bookingsData, equipmentData, allEquipmentData, profileData] = await Promise.all([
          getUserBookings(),
          getEquipment(),
        // This gets user's equipment
          getAllEquipment(),
          getUserProfile(),
        ]);

        setBookings(bookingsData || []);
        setEquipment(equipmentData || []);
        // setUserEquipment(userEquipmentData || []); // Set user's equipment
        setAllEquipment(allEquipmentData || []); 
        setUserProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load dashboard data");
        if (error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Perform authentication check only on the client
    if (isClient) {
      if (!isAuthenticated()) {
        router.push("/login");
      } else {
        setAuthenticated(true); // User is authenticated
        fetchData(); // Call your data-fetching function
      }
    }
  }, [router, isClient]); // Add `isClient` to dependencies to ensure it only runs after initial client render

  if (!isClient || !authenticated) return null; // P

  const handleCreateBooking = async () => {
    const startDate = new Date(newBooking.rentalStartDate);
    const endDate = new Date(newBooking.rentalEndDate);
    const equipmentItem = allEquipment.find(item => item._id === newBooking.equipmentId);

    if (!newBooking.equipmentId || !newBooking.rentalStartDate || !newBooking.rentalEndDate) {
      toast.error("Please fill all fields");
      return;
    }
    const availabilityStart = new Date(equipmentItem.availabilityDate.start);
    const availabilityEnd = new Date(equipmentItem.availabilityDate.end);
    
    if (startDate < availabilityStart || endDate > availabilityEnd) {
      toast.error(`Please choose dates between ${availabilityStart.toLocaleDateString()} and ${availabilityEnd.toLocaleDateString()}`);
      return;
    }

    if (startDate >= endDate) {
      toast.error("End date must be after start date");
      return;
    }
    try {
      await createBooking(newBooking);
      await fetchData();
      onBookingClose();
      toast.success("Booking created successfully");
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Failed to create booking");
    }
  };

  const handleUpdateBooking = async () => {
    if (!editingBooking.equipmentId || !editingBooking.rentalDate) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await updateBooking(editingBooking._id, editingBooking);
      await fetchData();
      setEditingBooking(null);
      onBookingClose();
      toast.success("Booking updated successfully");
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error("Failed to update booking");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      await fetchData();
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    if (
      !newEquipment.name ||
      !newEquipment.description ||
      !newEquipment.image ||
      !newEquipment.availabilityDate
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(newEquipment).forEach((key) => {
        if (key === "availabilityDate" && newEquipment[key]) {
          const dateRange = {
            start: {
              year: newEquipment[key].start.year,
              month: newEquipment[key].start.month,
              day: newEquipment[key].start.day,
            },
            end: {
              year: newEquipment[key].end.year,
              month: newEquipment[key].end.month,
              day: newEquipment[key].end.day,
            },
          };
          formData.append(key, JSON.stringify(dateRange));
        } else if (key === "image") {
          formData.append(key, newEquipment[key]);
        } else {
          formData.append(key, newEquipment[key]);
        }
      });

      await addEquipment(formData);
      await fetchData();
      onEquipmentClose();
      toast.success("Equipment added successfully");
    } catch (error) {
      console.error("Failed to add equipment:", error);
      toast.error(error.message || "Failed to add equipment");
    }
  };

  const handleUpdateEquipment = async (e) => {
    e.preventDefault();
    if (!editingEquipment.name || !editingEquipment.description) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(editingEquipment).forEach((key) => {
        if (key === "availabilityDate" && editingEquipment[key]) {
          const dateRange = {
            start: {
              year: editingEquipment[key].start.year,
              month: editingEquipment[key].start.month,
              day: editingEquipment[key].start.day,
            },
            end: {
              year: editingEquipment[key].end.year,
              month: editingEquipment[key].end.month,
              day: editingEquipment[key].end.day,
            },
          };
          formData.append(key, JSON.stringify(dateRange));
        } else if (key === "image" && editingEquipment[key] instanceof File) {
          formData.append(key, editingEquipment[key]);
        } else {
          formData.append(key, editingEquipment[key]);
        }
      });

      await updateEquipment(editingEquipment._id, formData);
      await fetchData();
      setEditingEquipment(null);
      onEquipmentClose();
      toast.success("Equipment updated successfully");
    } catch (error) {
      console.error("Failed to update equipment:", error);
      toast.error("Failed to update equipment");
    }
  };

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await deleteEquipment(equipmentId);
      await fetchData();
      toast.success("Equipment deleted successfully");
    } catch (error) {
      console.error("Failed to delete equipment:", error);
      toast.error("Failed to delete equipment");
    }
  };

  const handleEquipmentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewEquipment({ ...newEquipment, [name]: files[0] });
    } else {
      setNewEquipment({ ...newEquipment, [name]: value });
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Define the handleLogout function
  const handleLogout = () => {
    // Clear any authentication tokens or session data
    localStorage.removeItem("authToken"); // Example if using localStorage

    // Redirect the user to the login page or home page
    router.push("/login");

    // Optionally show a logout success message
    alert("You have successfully logged out.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Dashboard
      </h1>
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
              href="/contacts"
              className="flex items-center py-2 px-4 hover:bg-green-400"
            >
              <FiPhone className="mr-2" />
              Contacts
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-green-400"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
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

      {/* Main Content Wrapper */}
      <div
        className={`flex-grow bg-green-100 py-12 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {userProfile && (
          <Card className="mb-8 flex relative shadow-green">
            {" "}
            {/* Flex container for the entire card with relative positioning */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-44 h-44 border-2 border-green-500 rounded-full flex items-center justify-center p-1">
              {" "}
              {/* Outer container for the border */}
              <div className="rounded-full overflow-hidden w-full h-full">
                {" "}
                {/* Inner container for the image */}
                <Image
                  src={userProfile.profileImage || "/avtar.jpg"} // Provide a default image if not available
                  alt="User Profile Image"
                  width={200} // You can adjust this if needed
                  height={200} // You can adjust this if needed
                  className="rounded-full object-cover h-full w-full" // Rounded image with full height and width
                />
              </div>
            </div>
            <CardBody className="flex flex-col justify-between w-full ml-56">
              {" "}
              {/* Increased left margin to avoid overlap with the image */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                <p className="text-gray-700">
                  <strong>Name:</strong> {userProfile.fullName}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p className="text-gray-700">
                  <strong>Mobile:</strong> {userProfile.contactNumber}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {userProfile.address}
                </p>
              </div>
              {/* New Booking and Add Equipment buttons at the bottom */}
              <div className="flex mt-4 space-x-4">
                {" "}
                {/* Add margin to separate buttons from the content above */}
                <Button
                  color="primary"
                  startContent={<Calendar />}
                  onPress={onBookingOpen}
                >
                  New Booking
                </Button>
                <Button
                  color="secondary"
                  startContent={<Package />}
                  onPress={onEquipmentOpen}
                >
                  Add Equipment
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Your Bookings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card
                key={booking._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <CardBody>
                  <Image
                    src={getImageUrl(booking.equipment?.image)}
                    alt={booking.equipmentId.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {booking.equipmentId.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {booking.equipmentId.description}
                  </p>
                  <p className="text-gray-800 font-medium">
                  Rental Dates: {new Date(booking.rentalStartDate).toLocaleDateString()} - {new Date(booking.rentalEndDate).toLocaleDateString()}
                </p>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <p className="text-green-600 font-bold">
                    ${booking.equipmentId.rentalPrice} / day
                  </p>
                  <div>
                    <Button
                      color="primary"
                      size="sm"
                      startContent={<Edit />}
                      onPress={() => {
                        setEditingBooking(booking);
                        onBookingOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      startContent={<Trash />}
                      onPress={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No bookings found.
            </p>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Available Equipment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.length > 0 ? (
            equipment.map((item) => (
              <Card
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <CardBody>
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-800 font-medium">
                    Condition: {item.condition}
                  </p>
                  <p className="text-gray-800 font-medium">
                    Available:{" "}
                    {new Date(item.availabilityDateStart).toLocaleDateString()}{" "}
                    - {new Date(item.availabilityDateEnd).toLocaleDateString()}
                  </p>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <p className="text-green-600 font-bold">
                    ${item.rentalPrice} / day
                  </p>
                  <div>
                    <Button
                      color="primary"
                      size="sm"
                      startContent={<Edit />}
                      onPress={() => {
                        setEditingEquipment(item);
                        onEquipmentOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      startContent={<Trash />}
                      onPress={() => handleDeleteEquipment(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No equipment available.
            </p>
          )}
        </div>

        {/* Modal for creating/editing bookings */}
        <Modal isOpen={isBookingOpen} onClose={onBookingClose}>
        <ModalContent>
          <ModalHeader>Create New Booking</ModalHeader>
          <ModalBody>
            <select
              className="w-full p-2 border rounded mb-4"
              value={newBooking.equipmentId}
              onChange={(e) => setNewBooking({ ...newBooking, equipmentId: e.target.value })}
            >
              <option value="">Select Equipment</option>
              {allEquipment.map((item) => (
              <option key={item._id} value={item._id}>
  {item.name} - Available: {item.availabilityDate ? new Date(item.availabilityDate.start).toLocaleDateString() : 'Unavailable'} to {item.availabilityDate ? new Date(item.availabilityDate.end).toLocaleDateString() : 'Unavailable'}
</option>

              ))}
            </select>
            <Input
              type="date"
              value={newBooking.rentalStartDate}
              onChange={(e) => setNewBooking({ ...newBooking, rentalStartDate: e.target.value })}
              placeholder="Rental Start Date"
            />
            <Input
              type="date"
              value={newBooking.rentalEndDate}
              onChange={(e) => setNewBooking({ ...newBooking, rentalEndDate: e.target.value })}
              placeholder="Rental End Date"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleCreateBooking}>
              Create Booking
            </Button>
            <Button color="danger" variant="light" onPress={onBookingClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Modal
          isOpen={isEquipmentOpen}
          onClose={() => {
            onEquipmentClose();
            setEditingEquipment(null);
          }}
          size="3xl"
        >
          <ModalContent>
            <ModalHeader>
              {editingEquipment ? "Edit Equipment" : "Add New Equipment"}
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={
                  editingEquipment ? handleUpdateEquipment : handleAddEquipment
                }
                className="space-y-4"
              >
                <div className="flex justify-between space-x-4">
                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Equipment Name
                    </label>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-full"
                        >
                          {newEquipment.name || "Select Equipment"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Equipment name"
                        selectionMode="single"
                        onAction={(key) =>
                          setNewEquipment({ ...newEquipment, name: key })
                        }
                      >
                        <DropdownItem key="Tractor">
                          Tractor (ट्रॅक्टर)
                        </DropdownItem>
                        <DropdownItem key="Harvester">
                          Harvester (हार्वेस्टर)
                        </DropdownItem>
                        <DropdownItem key="Khurp">Khurp (खुरपी)</DropdownItem>
                        <DropdownItem key="Plow">Plow (हलकुंठ)</DropdownItem>
                        <DropdownItem key="Seed Drill">
                          Seed Drill (बीज ड्रिल)
                        </DropdownItem>
                        <DropdownItem key="Cultivator">
                          Cultivator (कुल्टीव्हेटर)
                        </DropdownItem>
                        <DropdownItem key="Sprayer">
                          Sprayer (स्प्रेयर)
                        </DropdownItem>
                        <DropdownItem key="Rotavator">
                          Rotavator (रोटाव्हेटर)
                        </DropdownItem>
                        <DropdownItem key="Harvesting Machine">
                          Harvesting Machine (हार्वेस्टिंग मशीन)
                        </DropdownItem>
                        <DropdownItem key="Fertilizer Spreader">
                          Fertilizer Spreader (खते पसरवणारा)
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Condition
                    </label>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize w-full"
                        >
                          {newEquipment.condition || "Select Condition"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Equipment Condition"
                        selectionMode="single"
                        onAction={(key) =>
                          setNewEquipment({ ...newEquipment, condition: key })
                        }
                      >
                        <DropdownItem key="Good">Good</DropdownItem>
                        <DropdownItem key="Better">Better</DropdownItem>
                        <DropdownItem key="Best">Best</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Rental Price
                    </label>
                    <Input
                      name="rentalPrice"
                      value={newEquipment.rentalPrice}
                      onChange={handleEquipmentChange}
                      type="number"
                      placeholder="Rental Price"
                      variant="bordered"
                    />
                  </div>

                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Availability Date
                    </label>
                    <DateRangePicker
                      isRequired
                      defaultValue={{
                        start: parseDate("2024-04-01"),
                        end: parseDate("2024-04-08"),
                      }}
                      onChange={(range) =>
                        setNewEquipment({
                          ...newEquipment,
                          availabilityDate: range,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Owner Name
                    </label>
                    <Input
                      name="ownerName"
                      value={newEquipment.ownerName}
                      onChange={handleEquipmentChange}
                      placeholder="Owner Name"
                      variant="bordered"
                    />
                  </div>

                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">Address</label>
                    <Input
                      name="address"
                      value={newEquipment.address}
                      onChange={handleEquipmentChange}
                      placeholder="Address"
                      variant="bordered"
                    />
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">
                      Contact Number
                    </label>
                    <Input
                      name="contactNumber"
                      value={newEquipment.contactNumber}
                      onChange={handleEquipmentChange}
                      type="tel"
                      placeholder="Contact Number"
                      variant="bordered"
                    />
                  </div>

                  <div className="form-row flex-1">
                    <label className="text-sm font-medium mb-2">Image</label>
                    <Input
                      name="image"
                      type="file"
                      onChange={handleEquipmentChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row flex flex-col mb-4">
                  <label className="text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={newEquipment.description}
                    onChange={handleEquipmentChange}
                    placeholder="Enter Description"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onEquipmentClose();
                      setEditingEquipment(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    {editingEquipment ? "Update Equipment" : "Add Equipment"}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
