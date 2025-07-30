import { useState } from "react";
import { Dashboard } from "@/components/portal/Dashboard";
import { CaseWizard } from "@/components/portal/CaseWizard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "wizard">("dashboard");

  if (currentView === "wizard") {
    return <CaseWizard />;
  }

  return <Dashboard />;
};

export default Index;
