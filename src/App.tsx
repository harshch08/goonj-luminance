import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ThemeTransition } from "@/components/layout/ThemeTransition";
import { QuotationCartProvider } from "@/context/QuotationCartContext";
import { QuotationCart } from "@/components/quotation/QuotationCart";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

// Lazy load all pages — only downloaded when navigated to
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Artists = lazy(() => import("./pages/Artists"));
const Contact = lazy(() => import("./pages/Contact"));
const Bandhan = lazy(() => import("./pages/Bandhan"));
const Quotation = lazy(() => import("./pages/Quotation"));
const DestinationWeddings = lazy(() => import("./pages/bandhan/services/DestinationWeddings"));
const Catering = lazy(() => import("./pages/bandhan/services/Catering"));
const Photography = lazy(() => import("./pages/bandhan/services/Photography"));
const StageSetup = lazy(() => import("./pages/bandhan/services/StageSetup"));
const BandhanAbout = lazy(() => import("./pages/bandhan/About"));
const BandhanServices = lazy(() => import("./pages/bandhan/Services"));
const BandhanContact = lazy(() => import("./pages/bandhan/Contact"));
const BandhanGallery = lazy(() => import("./pages/bandhan/Gallery"));
const CorporateEvents = lazy(() => import("./pages/bandhan/services/CorporateEvents"));
const OtherServices = lazy(() => import("./pages/bandhan/services/OtherServices"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors, but retry on network errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuotationCartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ThemeTransition />
          <QuotationCart />
          <Suspense fallback={null}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </QuotationCartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const isBandhan = location.pathname.startsWith('/bandhan');

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={isBandhan ? location.pathname : 'non-bandhan'}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bandhan" element={<Bandhan />} />
        <Route path="/bandhan/about" element={<BandhanAbout />} />
        <Route path="/bandhan/services" element={<BandhanServices />} />
        <Route path="/bandhan/contact" element={<BandhanContact />} />
        <Route path="/bandhan/gallery" element={<BandhanGallery />} />
        <Route path="/bandhan/corporate-events" element={<CorporateEvents />} />
        <Route path="/bandhan/other-services" element={<OtherServices />} />
        <Route path="/bandhan/destination-weddings" element={<DestinationWeddings />} />
        <Route path="/bandhan/catering" element={<Catering />} />
        <Route path="/bandhan/photography" element={<Photography />} />
        <Route path="/bandhan/stage-setup" element={<StageSetup />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
