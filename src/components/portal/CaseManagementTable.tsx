import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Calendar } from "lucide-react";

interface CaseData {
  id: string;
  caseNumber: string;
  title: string;
  department: string;
  firstParty: string;
  firstPartyType: string;
  attorney: string;
  secondParty: string;
  secondPartyType: string;
  secondPartyAttorney: string;
  represented: string;
  status: string;
  statusType: string;
  decisionDate: string;
  acceptedDate: string;
  submittedDate: string;
  deptId?: string;
}

const mockCaseData: Record<string, CaseData[]> = {
  "Abandoned Well (Leaking)": [
    {
      id: "1",
      caseNumber: "DNR-OGRM-PRF-LW--25-00001",
      title: "Abandoned Well (Leaking)",
      department: "Department of Natural Resources",
      firstParty: "Applicant",
      firstPartyType: "First Party:",
      attorney: "(not assigned)",
      secondParty: "Jasmine Andela",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "Abena Corleone",
      represented: "Appellee",
      status: "Case Accepted",
      statusType: "success",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11"
    }
  ],
  "Coal Permit Appeal": [
    {
      id: "2",
      caseNumber: "DNR-OMM-LRD-PER-0083",
      title: "Coal Permit Appeal",
      department: "Department of Natural Resources",
      firstParty: "Applicant",
      firstPartyType: "First Party:",
      attorney: "Gula Habicht",
      secondParty: "Yumi Appeldoorn",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "Varlaam Gunvaldsen",
      represented: "Appellee",
      status: "Draft",
      statusType: "warning",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11"
    }
  ],
  "Gift Ban Act": [
    {
      id: "3",
      caseNumber: "2025-03149",
      title: "Gift Ban Act",
      department: "Board of Higher Education",
      firstParty: "Parties",
      firstPartyType: "Additional Parties:",
      attorney: "Anasztazia Kuntz",
      secondParty: "Carl Rantanen",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "No",
      represented: "Appellee",
      status: "Draft",
      statusType: "warning",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11"
    }
  ],
  "Grant Recovery": [
    {
      id: "4",
      caseNumber: "DNR-OLC-GR-0430",
      title: "Grant Recovery",
      department: "Department of Natural Resources",
      firstParty: "Applicant",
      firstPartyType: "First Party:",
      attorney: "Gula Habicht",
      secondParty: "Dipika Sgro",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "Cacilia Wagner",
      represented: "Appellee",
      status: "Submitted",
      statusType: "info",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11"
    }
  ],
  "License Revocation": [
    {
      id: "5",
      caseNumber: "DNR-OFOR-TBRB-LR--25-00001",
      title: "License Revocation",
      department: "Department of Natural Resources",
      firstParty: "Applicant",
      firstPartyType: "First Party:",
      attorney: "Department Attorney (DNR)",
      secondParty: "Akash Pokorny",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "No",
      represented: "Defendant",
      status: "Pre-Hearing",
      statusType: "secondary",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11",
      deptId: "Test 12309"
    },
    {
      id: "6",
      caseNumber: "DNR-OFOR-TBRB-LR-0540",
      title: "License Revocation",
      department: "Department of Natural Resources",
      firstParty: "Applicant",
      firstPartyType: "First Party:",
      attorney: "Gula Habicht",
      secondParty: "Ifiok Bachvarov",
      secondPartyType: "Second Parties:",
      secondPartyAttorney: "Bengt Starr",
      represented: "Defendant",
      status: "Draft",
      statusType: "warning",
      decisionDate: "2025-08-11",
      acceptedDate: "2025-08-11",
      submittedDate: "2025-08-11"
    }
  ]
};

const getStatusBadgeProps = (statusType: string) => {
  switch (statusType) {
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700';
    case 'warning':
      return 'bg-orange-500 text-white hover:bg-orange-600';
    case 'info':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'secondary':
      return 'bg-gray-600 text-white hover:bg-gray-700';
    default:
      return 'bg-gray-600 text-white hover:bg-gray-700';
  }
};

const getIntakeBadgeProps = () => {
  return 'bg-gray-700 text-white hover:bg-gray-800';
};

export function CaseManagementTable() {
  return (
    <div className="w-full bg-white">
      {Object.entries(mockCaseData).map(([caseType, cases]) => (
        <div key={caseType} className="mb-0">
          {/* Section Header */}
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{caseType}</h2>
          </div>

          {/* Cases */}
          {cases.map((caseItem, index) => (
            <div 
              key={caseItem.id} 
              className={`border-b border-gray-200 ${index === cases.length - 1 ? 'border-b-2' : ''}`}
            >
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  {/* Case Number and Title - Left Column */}
                  <div className="lg:col-span-3">
                    <div className="flex items-start space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {caseItem.caseNumber}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {caseItem.title}
                        </div>
                        {caseItem.deptId && (
                          <div className="text-sm text-gray-500 mt-1">
                            Dept. ID: {caseItem.deptId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Department and First Party - Middle Left */}
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {caseItem.department}
                        </div>
                        <div className="text-sm text-gray-600">
                          {caseItem.firstPartyType} {caseItem.firstParty}
                        </div>
                        <div className="text-sm text-gray-500">
                          Attorney: {caseItem.attorney}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Party - Middle Right */}
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {caseItem.secondParty}
                        </div>
                        <div className="text-sm text-gray-600">
                          {caseItem.secondPartyType} {caseItem.represented}
                        </div>
                        <div className="text-sm text-gray-500">
                          Attorney: {caseItem.secondPartyAttorney}
                        </div>
                        {caseItem.represented === "Defendant" && (
                          <div className="text-sm text-gray-500">
                            Represented: No
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Dates - Right Column */}
                  <div className="lg:col-span-3">
                    <div className="flex flex-col space-y-3">
                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`text-xs font-medium px-3 py-1 ${getIntakeBadgeProps()}`}>
                          Intake
                        </Badge>
                        <Badge className={`text-xs font-medium px-3 py-1 ${getStatusBadgeProps(caseItem.statusType)}`}>
                          {caseItem.status}
                        </Badge>
                      </div>

                      {/* Dates */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Decision: {caseItem.decisionDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Accepted: {caseItem.acceptedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Submitted: {caseItem.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}