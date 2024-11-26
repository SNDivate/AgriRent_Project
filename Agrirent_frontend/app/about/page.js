"use client"; 

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import { AiFillHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdBuild } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiLogOut, FiPhone } from "react-icons/fi"; // Import the contact icon




const About = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-green-200 text-green-900 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="space-y-6 mt-12 p-4">
        <li>
          <a href="/" className="flex items-center py-2 px-4 hover:bg-green-400">
            <AiFillHome className="mr-2" />
            Home
          </a>
        </li>
        <li>
          <a href="/explore" className="flex items-center py-2 px-4 hover:bg-green-400">
            <MdBuild className="mr-2" />
            Equipment
          </a>
        </li>
        
        <li>
          <a href="/contacts" className="flex items-center py-2 px-4 hover:bg-green-400">
            <FiPhone className="mr-2" />
            Contacts
          </a>
        </li>
        <li>
          <a href="/login" className="flex items-center py-2 px-4 hover:bg-green-400">
            <AiOutlineLogin className="mr-2" />
            Login
          </a>
        </li>
        <li>
          <a href="/register" className="flex items-center py-2 px-4 hover:bg-green-400">
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

      {/* Main Content Wrapper */}
      <div
        className={`flex-grow bg-green-100 py-12 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Website Information Section */}
        <div className="about-section flex flex-col md:flex-row items-center md:justify-between container mx-auto mb-16">
          <div className="about-text w-full md:w-1/2 p-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">About AgriRent</h2>
            <p className="text-lg text-gray-700">
              AgriRent is a platform dedicated to connecting farmers and agricultural businesses with reliable, affordable equipment rental options. We aim to simplify the process of accessing essential farming tools, ensuring that every farmer can achieve optimal productivity.
            </p>
          </div>
          <div className="about-image w-full md:w-1/2 p-8 bg-green-100">
            <img
              src="/abooutus.png"
              alt="About AgriRent"
              className="object-cover w-full h-80 rounded-lg shadow-md"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="vision-section flex flex-col md:flex-row-reverse items-center md:justify-between container mx-auto mb-16">
          <div className="vision-text w-full md:w-1/2 p-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              Our vision is to revolutionize the agricultural industry by providing accessible and efficient rental solutions to farmers, promoting sustainable and profitable farming practices across the globe.
            </p>
          </div>
          <div className="vision-image w-full md:w-1/2 p-8">
            <img
              src="/target.png"
              alt="Our Vision"
              className="object-cover w-full h-80 rounded-lg shadow-md"
              style={{ height: '300px', width: '100%' }}
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mission-section flex flex-col md:flex-row items-center md:justify-between container mx-auto mb-16">
          <div className="mission-text w-full md:w-1/2 p-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              Our mission is to empower farmers by offering an easy-to-use platform for renting essential equipment, ensuring that agricultural practices are optimized and sustainable, leading to greater yields and improved livelihoods.
            </p>
          </div>
          <div className="mission-image w-full md:w-1/2 p-8">
            <img
              src="/mission.png"
              alt="Our Mission"
              className="object-cover w-full h-80 rounded-lg shadow-md"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="HowItWorks-section flex flex-col md:flex-row-reverse items-center md:justify-between container mx-auto mb-16">
          <div className="HowItWorks-text w-full md:w-1/2 p-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-700">Step 1: Visit the website and browse the equipment.</p>
            <p className="text-lg text-gray-700">Step 2: Register to the website.</p>
            <p className="text-lg text-gray-700">Step 3: Login to the website.</p>
            <p className="text-lg text-gray-700">Step 4: Request for equipment to rent.</p>
            <p className="text-lg text-gray-700">Step 5: Receive & use equipment.</p>
          </div>
          <div className="working-image w-full md:w-1/2 p-8">
            <img
              src="/working.png"
              alt="How It Works"
              className="object-cover w-full h-80 rounded-lg shadow-md"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section container mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="faq-content">
            <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
              <summary className="font-semibold cursor-pointer">What is AgriRent?</summary>
              <p className="text-gray-600 mt-2">
                AgriRent is an online platform where farmers and agricultural businesses can rent equipment for their farming needs.
              </p>
            </details>
            <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
              <summary className="font-semibold cursor-pointer">How can I rent equipment?</summary>
              <p className="text-gray-600 mt-2">
                You can browse available equipment on our website, select what you need, and complete the rental process online.
              </p>
            </details>
            <details className="bg-white shadow-lg rounded-lg mb-4 p-4">
              <summary className="font-semibold cursor-pointer">What are the payment options?</summary>
              <p className="text-gray-600 mt-2">
                We offer a variety of payment options, including credit/debit cards, online banking, and UPI transactions.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`bg-gradient-to-r from-green-700 via-green-400 to-green-200 py-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left text-black">
          <p className="text-sm">
            &copy; 2024 AgriRent. All rights reserved.
          </p>
          <p className="text-sm mt-2">Contact: 9579112654</p>
          <p className="text-sm">Email: support@agrirent.com</p>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-green-900 transition duration-200 flex items-center space-x-2"
          >
            <FaInstagram />
            <span>Instagram</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-green-900 transition duration-200 flex items-center space-x-2"
          >
            <FaTwitter />
            <span>Twitter</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-green-900 transition duration-200 flex items-center space-x-2"
          >
            <FaFacebook />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default About;
