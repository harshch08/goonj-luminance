import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ThemeTransition } from "@/components/layout/ThemeTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Artists from "./pages/Artists";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Bandhan from "./pages/Bandhan";
import DestinationWeddings from "./pages/bandhan/services/DestinationWeddings";
import Catering from "./pages/bandhan/services/Catering";
import Photography from "./pages/bandhan/services/Photography";
import StageSetup from "./pages/bandhan/services/StageSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ThemeTransition />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/destination-weddings" element={<DestinationWeddings />} />
          <Route path="/services/catering" element={<Catering />} />
          <Route path="/services/photography" element={<Photography />} />
          <Route path="/services/stage-setup" element={<StageSetup />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bandhan" element={<Bandhan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
