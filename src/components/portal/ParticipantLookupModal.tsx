import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Participant {
  id: number
  code: string
  name: string
  classification: string
  participationType: string
  parentAccount: string
  caseDetails: string
}

interface ParticipantLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (participant: Participant) => void
  onCreateNew: () => void
  currentValue?: Participant
  onRemoveValue?: () => void
  pendingNewParticipant?: Participant | null
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    code: "PT-001",
    name: "Kirby Neroni",
    classification: "Legal Counsel",
    participationType: "Chief Counsel",
    parentAccount: "Board of Higher Education",
    caseDetails: "Case #2024-001 - Springfield District"
  },
  {
    id: 2,
    code: "PT-002", 
    name: "Batsheva English",
    classification: "Administrative",
    participationType: "Executive Assistant",
    parentAccount: "Board of Higher Education",
    caseDetails: "Case #2024-002 - Chicago District"
  },
  {
    id: 3,
    code: "PT-003",
    name: "Abbey Higgins",
    classification: "Legal Counsel",
    participationType: "Attorney at Law",
    parentAccount: "Royce Partners, LLC",
    caseDetails: "Case #2024-003 - Phoenix District"
  },
  {
    id: 4,
    code: "PT-004",
    name: "Aafjes-Soriano",
    classification: "Principal",
    participationType: "Appellee",
    parentAccount: "Sunny Day Schools",
    caseDetails: "Case #2024-004 - Urbana District"
  }
]

export function ParticipantLookupModal({
  isOpen,
  onClose,
  onSelect,
  onCreateNew,
  currentValue,
  onRemoveValue,
  pendingNewParticipant
}: ParticipantLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null)

  const currentParticipants = useMemo(() => {
    const baseParticipants = [...mockParticipants]
    if (pendingNewParticipant) {
      baseParticipants.unshift(pendingNewParticipant)
    }
    return baseParticipants
  }, [pendingNewParticipant])

  const filteredParticipants = useMemo(() => {
    return currentParticipants.filter(participant => {
      const searchLower = searchQuery.toLowerCase()
      return participant.name.toLowerCase().includes(searchLower) ||
             participant.code.toLowerCase().includes(searchLower) ||
             participant.classification.toLowerCase().includes(searchLower) ||
             participant.participationType.toLowerCase().includes(searchLower) ||
             participant.parentAccount.toLowerCase().includes(searchLower) ||
             participant.caseDetails.toLowerCase().includes(searchLower)
    })
  }, [currentParticipants, searchQuery])

  const handleSelect = () => {
    const selectedParticipant = filteredParticipants.find(p => p.id === selectedParticipantId)
    if (selectedParticipant) {
      onSelect(selectedParticipant)
    }
  }

  const handleRowDoubleClick = (participant: Participant) => {
    onSelect(participant)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Lookup records</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, type, or case..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Code</div>
                <div>Name</div>
                <div>Classification</div>
                <div>Participation Type</div>
                <div>Parent/Account</div>
                <div>Case Details</div>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedParticipantId?.toString()} 
              onValueChange={(value) => setSelectedParticipantId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredParticipants.map((participant) => (
                  <div 
                    key={participant.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(participant)}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={participant.id.toString()} 
                          id={`participant-${participant.id}`}
                        />
                        <Label 
                          htmlFor={`participant-${participant.id}`}
                          className="font-medium text-gray-900 cursor-pointer text-sm"
                        >
                          {participant.code}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{participant.name}</div>
                      <div className="text-sm text-gray-900">{participant.classification}</div>
                      <div className="text-sm text-gray-900">{participant.participationType}</div>
                      <div className="text-sm text-gray-900">{participant.parentAccount}</div>
                      <div className="text-sm text-gray-900">{participant.caseDetails}</div>
                    </div>
                  </div>
                ))}
                
                {filteredParticipants.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No participants found matching your search.
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>

          {/* Pagination placeholder */}
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
              ‹
            </button>
            <span>1</span>
            <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
              ›
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={onCreateNew}
            >
              New
            </Button>
          </div>
          
          <div className="flex space-x-2">
            {currentValue && onRemoveValue && (
              <Button 
                variant="destructive" 
                onClick={onRemoveValue}
              >
                Remove value
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSelect}
              disabled={!selectedParticipantId}
            >
              Select
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}