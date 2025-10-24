import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthPage from "./pages/auth/AuthPage";
import ClientHome from "./pages/client/ClientHome";
import Catalog from "./pages/client/Catalog";
import Products from "./pages/client/Products";
import DeliveryMissions from "./pages/delivery/DeliveryMissions";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/:role" element={<AuthPage />} />
          
          {/* Client Routes */}
          <Route path="/client/home" element={<ClientHome />} />
          <Route path="/client/catalog" element={<Catalog />} />
          <Route path="/client/products" element={<Products />} />
          <Route path="/client/orders" element={<ClientHome />} />
          <Route path="/client/tracking" element={<ClientHome />} />
          <Route path="/client/profile" element={<ClientHome />} />
          
          {/* Delivery Routes */}
          <Route path="/delivery/missions" element={<DeliveryMissions />} />
          <Route path="/delivery/active" element={<DeliveryMissions />} />
          <Route path="/delivery/earnings" element={<DeliveryMissions />} />
          <Route path="/delivery/profile" element={<DeliveryMissions />} />
          
          {/* Merchant Routes */}
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/products" element={<MerchantDashboard />} />
          <Route path="/merchant/orders" element={<MerchantDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/merchants" element={<AdminDashboard />} />
          <Route path="/admin/delivery" element={<AdminDashboard />} />
          <Route path="/admin/reporting" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
