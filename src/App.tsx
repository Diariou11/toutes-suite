import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Landing from "./pages/Landing";
import AuthPage from "./pages/auth/AuthPage";
import ClientHome from "./pages/client/ClientHome";
import ClientOrders from "./pages/client/ClientOrders";
import ClientTracking from "./pages/client/ClientTracking";
import ClientProfile from "./pages/client/ClientProfile";
import Catalog from "./pages/client/Catalog";
import Products from "./pages/client/Products";
import ProductsByCategory from "./pages/client/ProductsByCategory";
import Promo from "./pages/client/Promo";
import DeliveryMissions from "./pages/delivery/DeliveryMissions";
import DeliveryActive from "./pages/delivery/DeliveryActive";
import DeliveryEarnings from "./pages/delivery/DeliveryEarnings";
import DeliveryProfile from "./pages/delivery/DeliveryProfile";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/MerchantProducts";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantProfile from "./pages/merchant/MerchantProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMerchants from "./pages/admin/AdminMerchants";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminReporting from "./pages/admin/AdminReporting";
import AdminDisputes from "./pages/admin/AdminDisputes";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
            <Route path="/client/products" element={<ProductsByCategory />} />
            <Route path="/client/promo" element={<Promo />} />
            <Route path="/client/orders" element={<ClientOrders />} />
            <Route path="/client/tracking" element={<ClientTracking />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            
            {/* Delivery Routes */}
            <Route path="/delivery/missions" element={<DeliveryMissions />} />
            <Route path="/delivery/active" element={<DeliveryActive />} />
            <Route path="/delivery/earnings" element={<DeliveryEarnings />} />
            <Route path="/delivery/profile" element={<DeliveryProfile />} />
            
            {/* Merchant Routes */}
            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
            <Route path="/merchant/products" element={<MerchantProducts />} />
            <Route path="/merchant/orders" element={<MerchantOrders />} />
            <Route path="/merchant/profile" element={<MerchantProfile />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/merchants" element={<AdminMerchants />} />
            <Route path="/admin/delivery" element={<AdminDelivery />} />
            <Route path="/admin/reporting" element={<AdminReporting />} />
            <Route path="/admin/disputes" element={<AdminDisputes />} />
            
            {/* Other Routes */}
            <Route path="/faq" element={<FAQ />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
