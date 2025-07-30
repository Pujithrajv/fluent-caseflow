import { useState } from "react";
import { Dashboard } from "@/components/portal/Dashboard";
import { CaseWizard } from "@/components/portal/CaseWizard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "wizard">("dashboard");

  if (currentView === "wizard") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} />;
  }

  return <Dashboard onCreateCase={() => setCurrentView("wizard")} />;
};

export default Index;
