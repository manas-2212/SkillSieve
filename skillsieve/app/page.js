"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext"; // adjust path if needed

import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import CTA from "./components/CTA";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();


  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
    </>
  );
}
