import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Case {
  id: number
  caseNumber: string
  caseName: string
  caseType: string
  caseAcceptance: string
  caseStage: string
}

interface CaseLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (caseItem: Case) => void
}

const mockCases: Case[] = [
  {
    id: 1,
    caseNumber: "2024-001",
    caseName: "Board of Higher Education vs. Springfield District",
    caseType: "Administrative Review",
    caseAcceptance: "Accepted",
    caseStage: "Discovery"
  },
  {
    id: 2,
    caseNumber: "2024-002",
    caseName: "Chicago Educational Initiative Review",
    caseType: "Policy Review",
    caseAcceptance: "Accepted",
    caseStage: "Investigation"
  },
  {
    id: 3,
    caseNumber: "2024-003",
    caseName: "Royce Partners Legal Consultation",
    caseType: "Civil Matter",
    caseAcceptance: "Pending",
    caseStage: "Initial Review"
  },
  {
    id: 4,
    caseNumber: "2024-004",
    caseName: "Sunny Day Schools Compliance Review",
    caseType: "Regulatory Compliance",
    caseAcceptance: "Accepted",
    caseStage: "Active Investigation"
  }
]

export function CaseLookupModal({
  isOpen,
  onClose,
  onSelect
}: CaseLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null)

  const filteredCases = useMemo(() => {
    return mockCases.filter(caseItem => {
      const searchLower = searchQuery.toLowerCase()
      return caseItem.caseNumber.toLowerCase().includes(searchLower) ||
             caseItem.caseName.toLowerCase().includes(searchLower) ||
             caseItem.caseType.toLowerCase().includes(searchLower) ||
             caseItem.caseAcceptance.toLowerCase().includes(searchLower) ||
             caseItem.caseStage.toLowerCase().includes(searchLower)
    })
  }, [searchQuery])

  const handleSelect = () => {
    const selectedCase = filteredCases.find(c => c.id === selectedCaseId)
    if (selectedCase) {
      onSelect(selectedCase)
    }
  }

  const handleRowDoubleClick = (caseItem: Case) => {
    onSelect(caseItem)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Case</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar - No Active Parties dropdown as requested */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search cases..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Case Number</div>
                <div>Case Name</div>
                <div>Case Type</div>
                <div>Case Acceptance</div>
                <div>Case Stage</div>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedCaseId?.toString()} 
              onValueChange={(value) => setSelectedCaseId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredCases.map((caseItem) => (
                  <div 
                    key={caseItem.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(caseItem)}
                  >
                    <div className="grid grid-cols-5 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={caseItem.id.toString()} 
                          id={`case-${caseItem.id}`}
                        />
                        <Label 
                          htmlFor={`case-${caseItem.id}`}
                          className="font-medium text-gray-900 cursor-pointer text-sm"
                        >
                          {caseItem.caseNumber}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{caseItem.caseName}</div>
                      <div className="text-sm text-gray-900">{caseItem.caseType}</div>
                      <div className="text-sm text-gray-900">{caseItem.caseAcceptance}</div>
                      <div className="text-sm text-gray-900">{caseItem.caseStage}</div>
                    </div>
                  </div>
                ))}
                
                {filteredCases.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No cases found matching your search.
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

        {/* Footer Buttons - No Search button as requested */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSelect}
            disabled={!selectedCaseId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}