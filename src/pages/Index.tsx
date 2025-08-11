import { useState } from "react";
import { Dashboard } from "@/components/portal/Dashboard";
import { CaseWizard } from "@/components/portal/CaseWizard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "create-case" | "view-edit">("dashboard");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [caseStatus, setCaseStatus] = useState<'draft' | 'submitted' | 'accepted'>('draft');

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    
    // Mock case status detection based on caseId
    let status: 'draft' | 'submitted' | 'accepted';
    if (caseId === "CASE-2024-004" || caseId === "CASE-2024-005" || caseId === "DBE-2024-001-EC") {
      status = 'accepted';
    } else if (caseId === "CASE-2024-001") {
      status = 'submitted';
    } else {
      status = 'draft';
    }
    setCaseStatus(status);

    // If status is draft, open in create mode, otherwise view-edit
    if (status === 'draft') {
      setCurrentView("create-case");
    } else {
      setCurrentView("view-edit");
    }
  };

  const handleEditCase = (caseId: string, tab: string) => {
    setSelectedCaseId(caseId);
    setCurrentView("view-edit");
  };

  if (currentView === "create-case") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} mode="create" caseId={selectedCaseId} />;
  }

  if (currentView === "view-edit") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} mode="view-edit" caseStatus={caseStatus} caseId={selectedCaseId} />;
  }

  return (
    <Dashboard 
      onCreateCase={() => setCurrentView("create-case")} 
      onViewCase={handleViewCase}
      onEditCase={handleEditCase}
    />
  );
};

export default Index;
