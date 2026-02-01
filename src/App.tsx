import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgentsAndApis from "./pages/AgentsAndApis";
import Workflows from "./pages/Workflows";
import Monetization from "./pages/Monetization";
import BrainAI from "./pages/BrainAI";
import Marketplace from "./pages/Marketplace";
import GovernanceTrust from "./pages/GovernanceTrust";
import EnterpriseFederation from "./pages/EnterpriseFederation";
import SupremeEngine from "./pages/SupremeEngine";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agents-and-apis" element={<AgentsAndApis />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/monetization" element={<Monetization />} />
          <Route path="/brain-ai" element={<BrainAI />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/governance-trust" element={<GovernanceTrust />} />
          <Route path="/enterprise-federation" element={<EnterpriseFederation />} />
          <Route path="/supreme-engine" element={<SupremeEngine />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
