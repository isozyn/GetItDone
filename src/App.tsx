import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import GetInvolved from "./pages/GetInvolved";
import News from "./pages/News";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import { Button } from "./components/ui/button";
import React, { useEffect, useRef, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Hide if at the very top
    if (currentY <= 0) {
      setShowScrollTop(false);
      return;
    }
    // Show if at the bottom of the page
    if (windowHeight + currentY >= docHeight - 2) {
      setShowScrollTop(true);
      return;
    }

    // Show if scrolling up
    if (currentY < lastScrollY.current) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
    lastScrollY.current = currentY;

    // Show if stopped for 2s
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setShowScrollTop(true);
    }, 2000);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  };
}, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/news" element={<News />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-opacity duration-300 ${
            showScrollTop ? 'opacity-90 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          ↑
        </Button>
      </TooltipProvider>
    </QueryClientProvider>
  );

}
export default App;


