"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spacer,
} from "@heroui/react";
import { motion } from "framer-motion";

interface LandingPageProps {
  user?: {
    email: string;
  } | null;
  adminUrl?: string;
}

export default function LandingPage({ user, adminUrl }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Features",
    "Pricing",
    "Documentation",
    "About",
    "Contact",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Navigation */}
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="bg-transparent backdrop-blur-md"
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white sm:hidden"
          />
          <NavbarBrand>
            <p className="text-xl font-bold text-white">
              PayloadCMS Boilerplate
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <Button variant="light" className="text-white">
              Features
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" className="text-white">
              Docs
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {user ? (
            <NavbarItem>
              <Chip color="success" variant="flat">
                {user.email}
              </Chip>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          )}
          {adminUrl && (
            <NavbarItem>
              <Button
                as="a"
                href={adminUrl}
                target="_blank"
                color="secondary"
                variant="solid"
              >
                Admin Panel
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu className="bg-black/80 backdrop-blur-md">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Button className="w-full text-white" variant="light" size="lg">
                {item}
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* Hero Section */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <Chip color="secondary" variant="flat" className="mb-6">
              🚀 Powered by Payload CMS & Hero UI
            </Chip>

            <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-7xl">
              Build Amazing
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web Experiences
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-center text-xl leading-relaxed text-gray-300">
              Payload CMS Hero UI Template is a modern template using Payload
              CMS with Hero UI components in a Next.js application.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                color="primary"
                size="lg"
                className="px-8 py-6 text-lg font-semibold"
              >
                Get Started
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="border-white px-8 py-6 text-lg font-semibold text-white hover:bg-white hover:text-black"
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full border-t border-white/10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} github rhnnss. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
