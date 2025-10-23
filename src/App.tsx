import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Watermark } from "@/components/ui/watermark";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "@/contexts/TaskContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignInSelection from "./pages/SignInSelection";
import ExternalSignIn from "./pages/ExternalSignIn";
import OktaSignIn from "./pages/OktaSignIn";
import Profile from "./pages/Profile";
import Consent from "./pages/Consent";
import PortalDashboard from "./pages/PortalDashboard";
import ParticipantsDashboard from "./pages/ParticipantsDashboard";
import AttorneyDashboard from "./pages/AttorneyDashboard";
import AttorneyCaseView from "./pages/AttorneyCaseView";
import RequestWizard from "./pages/RequestWizard";
import NotFound from "./pages/NotFound";
import { AppointmentDetails } from "./components/portal/AppointmentDetails";
import { TaskDetail } from "./pages/TaskDetail";
import { AlertDetail } from "./pages/AlertDetail";
import { DecisionDetail } from "./pages/DecisionDetail";
import DiscoveryWorkflow from "./pages/DiscoveryWorkflow";
import DiscoveryComplianceWorkflow from "./pages/DiscoveryComplianceWorkflow";
import DivisionDetails from "./pages/DivisionDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TaskProvider>
        <Watermark />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/portal" element={<Index />} />
            <Route path="/" element={<SignInSelection />} />
            <Route path="/sign-in" element={<SignInSelection />} />
            <Route path="/login-external" element={<ExternalSignIn />} />
            <Route path="/login-okta" element={<OktaSignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/dashboard" element={<PortalDashboard />} />
            <Route path="/participants" element={<ParticipantsDashboard />} />
            <Route path="/attorney/dashboard" element={<AttorneyDashboard />} />
            <Route path="/attorney/case/:caseId" element={<AttorneyCaseView />} />
            <Route path="/attorney/case/:caseId/add-request" element={<RequestWizard />} />
            <Route path="/appointment/:appointmentId" element={<AppointmentDetails />} />
            <Route path="/task-detail/:taskId" element={<TaskDetail />} />
            <Route path="/alert-detail/:alertId" element={<AlertDetail />} />
            <Route path="/decision-detail/:decisionId" element={<DecisionDetail />} />
            <Route path="/discovery-workflow" element={<DiscoveryWorkflow />} />
            <Route path="/discovery-compliance" element={<DiscoveryComplianceWorkflow />} />
            <Route path="/division/:divisionId" element={<DivisionDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
