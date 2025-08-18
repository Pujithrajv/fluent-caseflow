import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ParticipationType {
  id: number
  code: string
  name: string
  participationType: string
  parentAccount: string
}

interface ParticipationTypeLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (type: ParticipationType) => void
}

const mockParticipationTypes: ParticipationType[] = [
  {
    id: 1,
    code: "PT-001",
    name: "Chief Counsel",
    participationType: "Legal Representative",
    parentAccount: "Board of Higher Education"
  },
  {
    id: 2,
    code: "PT-002",
    name: "Executive Assistant",
    participationType: "Administrative Support",
    parentAccount: "Board of Higher Education"
  },
  {
    id: 3,
    code: "PT-003",
    name: "Attorney at Law",
    participationType: "Legal Representative",
    parentAccount: "Royce Partners, LLC"
  },
  {
    id: 4,
    code: "PT-004",
    name: "Principal",
    participationType: "Educational Administrator",
    parentAccount: "Sunny Day Schools"
  }
]

export function ParticipationTypeLookupModal({
  isOpen,
  onClose,
  onSelect
}: ParticipationTypeLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null)

  const filteredTypes = useMemo(() => {
    return mockParticipationTypes.filter(type => {
      const searchLower = searchQuery.toLowerCase()
      return type.code.toLowerCase().includes(searchLower) ||
             type.name.toLowerCase().includes(searchLower) ||
             type.participationType.toLowerCase().includes(searchLower) ||
             type.parentAccount.toLowerCase().includes(searchLower)
    })
  }, [searchQuery])

  const handleSelect = () => {
    const selectedType = filteredTypes.find(t => t.id === selectedTypeId)
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  const handleRowDoubleClick = (type: ParticipationType) => {
    onSelect(type)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Participation Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search participation types..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Code</div>
                <div>Name</div>
                <div>Participation Type</div>
                <div>Parent Account</div>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedTypeId?.toString()} 
              onValueChange={(value) => setSelectedTypeId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredTypes.map((type) => (
                  <div 
                    key={type.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(type)}
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={type.id.toString()} 
                          id={`type-${type.id}`}
                        />
                        <Label 
                          htmlFor={`type-${type.id}`}
                          className="font-medium text-gray-900 cursor-pointer text-sm"
                        >
                          {type.code}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{type.name}</div>
                      <div className="text-sm text-gray-900">{type.participationType}</div>
                      <div className="text-sm text-gray-900">{type.parentAccount}</div>
                    </div>
                  </div>
                ))}
                
                {filteredTypes.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No participation types found matching your search.
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
            disabled={!selectedTypeId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}