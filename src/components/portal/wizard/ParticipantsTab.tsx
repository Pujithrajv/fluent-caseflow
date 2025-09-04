import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Trash2, Edit, HelpCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import { ParticipantLookupModal } from "../ParticipantLookupModal";
import { CreateParticipantModal } from "../CreateParticipantModal";
import { NewParticipantModal } from "../NewParticipantModal";

interface ParticipantsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  caseStatus?: string;
}

const mockParties = [
  {
    id: 1,
    party: "Kirby Neroni\nChief Counsel\nDepartment General Counsel",
    contact: "P. 630-308-4387\nE. kirby.neroni@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 2,
    party: "Batsheva English\nExecutive Assistant\nDepartment Representative",
    contact: "P. 217-786-3028\nE. batsheva.english@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 3,
    party: "Aafjes-Soriano\nPrinciple\nAppellee",
    contact: "",
    organization: "Sunny Day Schools\nSt. Charles, IL"
  },
  {
    id: 4,
    party: "Abbey Higgins\nAttorney at Law\nParty Counsel",
    contact: "P. 480-796-1707\nE. abbey.higgins@royce.com",
    organization: "Royce Partners, LLC\nChicago, IL"
  }
];

const mockContacts = [
  { id: 1, name: "John Smith", role: "Attorney", organization: "Smith & Associates", email: "john@smith.com" },
  { id: 2, name: "Sarah Johnson", role: "Paralegal", organization: "Legal Corp", email: "sarah@legal.com" },
  { id: 3, name: "Mike Davis", role: "Consultant", organization: "Davis Consulting", email: "mike@davis.com" },
];

export function ParticipantsTab({ onDataChange, data, isReadOnly = false, caseStatus }: ParticipantsTabProps) {
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNewParticipantModalOpen, setIsNewParticipantModalOpen] = useState(false);
  const [participants, setParticipants] = useState(mockParties);
  const [pendingNewParticipant, setPendingNewParticipant] = useState(null);

  const handleParticipantSelect = (participant: any) => {
    // Add selected participant to the list
    const newParticipant = {
      id: participant.id,
      party: participant.name + "\n" + participant.classification + "\n" + participant.participationType,
      contact: "", // Could be populated from participant data
      organization: participant.parentAccount + "\n" + participant.caseDetails.split(" - ")[1]
    };
    
    setParticipants(prev => [...prev, newParticipant]);
    setIsLookupModalOpen(false);
    setPendingNewParticipant(null);
  };

  const handleCreateParticipant = (newParticipant: any) => {
    // Set the pending participant and open lookup modal with it pre-selected
    setPendingNewParticipant(newParticipant);
    setIsCreateModalOpen(false);
    setIsLookupModalOpen(true);
  };

  const handleRemoveParticipant = (participantId: number) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
  };

  const handleNewParticipantCreated = (participant: any) => {
    // Add new participant to the beginning of the list
    setParticipants(prev => [participant, ...prev]);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
          <div className="flex items-end justify-end">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            {!isReadOnly && caseStatus?.toLowerCase() !== "accepted" && (
              <>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsNewParticipantModalOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  New Participant
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsLookupModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Participant
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Party</div>
                <div>Contact</div>
                <div>Organization</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {participants.map((party) => (
                <div key={party.id} className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div>
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.party}</div>
                    </div>
                    
                    <div className="text-sm text-gray-900 whitespace-pre-line">
                      {party.contact || "—"}
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.organization}</div>
                      {!isReadOnly && (
                        <div className="flex ml-4">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3 text-gray-400" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveParticipant(party.id)}
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {participants.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-muted-foreground">No participants added yet</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 font-fluent"
                onClick={() => setIsLookupModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Participant
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <ParticipantLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => {
          setIsLookupModalOpen(false);
          setPendingNewParticipant(null);
        }}
        onSelect={handleParticipantSelect}
        onCreateNew={() => {
          setIsLookupModalOpen(false);
          setIsCreateModalOpen(true);
        }}
        pendingNewParticipant={pendingNewParticipant}
      />

      <CreateParticipantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateParticipant}
      />

      <NewParticipantModal
        isOpen={isNewParticipantModalOpen}
        onClose={() => setIsNewParticipantModalOpen(false)}
        onParticipantCreated={handleNewParticipantCreated}
      />
    </div>
  );
}