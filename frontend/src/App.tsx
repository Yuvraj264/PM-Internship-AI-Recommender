import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common Pages
import Index from "./pages/Index";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import HelpDesk from "./pages/common/HelpDesk";
import Internships from "./pages/common/Internships";
import InternshipDetails from "./pages/common/InternshipDetails";

// Candidate Pages
import CandidateLogin from "./pages/candidate/Login";
import CandidateRegister from "./pages/candidate/Register";
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateProfile from "./pages/candidate/Profile";
import CandidateApplications from "./pages/candidate/Applications";
import CandidateInternships from "./pages/candidate/Internships";

// Company Pages
import CompanyLogin from "./pages/company/Login";
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyPostInternship from "./pages/company/PostInternship";
import CompanyManageInternships from "./pages/company/ManageInternships";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCompanies from "./pages/admin/Companies";
import AdminReports from "./pages/admin/Reports";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpDesk />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internship/:id" element={<InternshipDetails />} />

          {/* Candidate Routes */}
          <Route path="/candidate/login" element={<CandidateLogin />} />
          <Route path="/candidate/register" element={<CandidateRegister />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          <Route path="/candidate/applications" element={<CandidateApplications />} />
          <Route path="/candidate/internships" element={<CandidateInternships />} />

          {/* Company Routes */}
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/post" element={<CompanyPostInternship />} />
          <Route path="/company/manage" element={<CompanyManageInternships />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
