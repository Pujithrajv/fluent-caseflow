import { useState } from "react";
import { Dashboard } from "@/components/portal/Dashboard";
import { CaseWizard } from "@/components/portal/CaseWizard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "wizard" | "review">("dashboard");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView("review");
  };

  if (currentView === "wizard") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "review") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} initialTab="review" readOnly />;
  }

  return (
    <Dashboard 
      onCreateCase={() => setCurrentView("wizard")} 
      onViewCase={handleViewCase}
    />
  );
};

export default Index;
