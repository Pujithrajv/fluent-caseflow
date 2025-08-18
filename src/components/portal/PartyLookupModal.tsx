import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Party {
  id: number
  code: string
  name: string
  participationType: string
  parentAccount: string
  caseType: string
  primaryContact: string
}

interface PartyLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (party: Party) => void
}

const mockParties: Party[] = [
  {
    id: 1,
    code: "PTY-001",
    name: "Board of Higher Education",
    participationType: "Government Agency",
    parentAccount: "State of Illinois",
    caseType: "Administrative",
    primaryContact: "Kirby Neroni"
  },
  {
    id: 2,
    code: "PTY-002",
    name: "Royce Partners, LLC",
    participationType: "Legal Firm",
    parentAccount: "Private Entity",
    caseType: "Civil",
    primaryContact: "Abbey Higgins"
  },
  {
    id: 3,
    code: "PTY-003",
    name: "Sunny Day Schools",
    participationType: "Educational Institution",
    parentAccount: "Private Entity",
    caseType: "Educational",
    primaryContact: "Aafjes-Soriano"
  }
]

export function PartyLookupModal({
  isOpen,
  onClose,
  onSelect
}: PartyLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null)

  const filteredParties = useMemo(() => {
    return mockParties.filter(party => {
      const searchLower = searchQuery.toLowerCase()
      return party.code.toLowerCase().includes(searchLower) ||
             party.name.toLowerCase().includes(searchLower) ||
             party.participationType.toLowerCase().includes(searchLower) ||
             party.parentAccount.toLowerCase().includes(searchLower) ||
             party.caseType.toLowerCase().includes(searchLower) ||
             party.primaryContact.toLowerCase().includes(searchLower)
    })
  }, [searchQuery])

  const handleSelect = () => {
    const selectedParty = filteredParties.find(p => p.id === selectedPartyId)
    if (selectedParty) {
      onSelect(selectedParty)
    }
  }

  const handleRowDoubleClick = (party: Party) => {
    onSelect(party)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Party</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search parties..." 
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
                <div>Participation Type</div>
                <div>Parent Account</div>
                <div>Case Type</div>
                <div>Primary Contact</div>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedPartyId?.toString()} 
              onValueChange={(value) => setSelectedPartyId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredParties.map((party) => (
                  <div 
                    key={party.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(party)}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={party.id.toString()} 
                          id={`party-${party.id}`}
                        />
                        <Label 
                          htmlFor={`party-${party.id}`}
                          className="font-medium text-gray-900 cursor-pointer text-sm"
                        >
                          {party.code}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{party.name}</div>
                      <div className="text-sm text-gray-900">{party.participationType}</div>
                      <div className="text-sm text-gray-900">{party.parentAccount}</div>
                      <div className="text-sm text-gray-900">{party.caseType}</div>
                      <div className="text-sm text-gray-900">{party.primaryContact}</div>
                    </div>
                  </div>
                ))}
                
                {filteredParties.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No parties found matching your search.
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSelect}
            disabled={!selectedPartyId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}