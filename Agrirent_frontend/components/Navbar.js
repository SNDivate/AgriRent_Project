"use client"
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Image } from "@nextui-org/react";
import { SearchIcon } from "../components/ui/SearchIcon";
import Link from 'next/link';

const NavbarComponent = ({ onSearchChange }) => {
  const handleSearchChange = (e) => {
    const term = e.target.value;
    onSearchChange(term);
  };

  return (
    <Navbar 
      isBordered 
      className="items-center bg-gradient-to-r from-green-700 via-green-400 to-green-200 shadow-md p-1 sticky top-0 z-50" 
      isSticky
    >
      <div className="flex justify-between items-center w-full pl-0">
        <NavbarBrand className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="AgriRent Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="font-bold text-inherit text-3xl pl-4">AgriRent</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex justify-center w-full mx-4">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small text-black",
              inputWrapper: "h-full font-normal bg-white",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            onChange={handleSearchChange}
          />
        </NavbarContent>

        <NavbarContent justify="end" className="flex items-center space-x-3">
          <NavbarItem className="font-bold">
            <Link href="/about">About Us</Link>
          </NavbarItem>
          <NavbarItem className="font-bold">
            <Link href="/contact">Contacts</Link>
          </NavbarItem>
          <NavbarItem className="font-bold">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem className="font-bold">
            <Link href="/register">Sign Up</Link>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;