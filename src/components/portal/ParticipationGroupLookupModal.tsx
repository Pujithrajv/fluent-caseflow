import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ParticipationGroup {
  id: number
  code: string
  name: string
  classification: string
  state: string
  attorney: string
  parentType: string
}

interface ParticipationGroupLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (group: ParticipationGroup) => void
}

const mockParticipationGroups: ParticipationGroup[] = [
  {
    id: 1,
    code: "PG-001",
    name: "Legal Counsel Group",
    classification: "Legal",
    state: "Active",
    attorney: "John Smith",
    parentType: "Government Agency"
  },
  {
    id: 2,
    code: "PG-002",
    name: "Administrative Group",
    classification: "Administrative",
    state: "Active",
    attorney: "Sarah Johnson", 
    parentType: "Educational Institution"
  },
  {
    id: 3,
    code: "PG-003",
    name: "Executive Group",
    classification: "Executive",
    state: "Active",
    attorney: "Mike Davis",
    parentType: "Private Organization"
  }
]

export function ParticipationGroupLookupModal({
  isOpen,
  onClose,
  onSelect
}: ParticipationGroupLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)

  const filteredGroups = useMemo(() => {
    return mockParticipationGroups.filter(group => {
      const searchLower = searchQuery.toLowerCase()
      return group.code.toLowerCase().includes(searchLower) ||
             group.name.toLowerCase().includes(searchLower) ||
             group.classification.toLowerCase().includes(searchLower) ||
             group.state.toLowerCase().includes(searchLower) ||
             group.attorney.toLowerCase().includes(searchLower) ||
             group.parentType.toLowerCase().includes(searchLower)
    })
  }, [searchQuery])

  const handleSelect = () => {
    const selectedGroup = filteredGroups.find(g => g.id === selectedGroupId)
    if (selectedGroup) {
      onSelect(selectedGroup)
    }
  }

  const handleRowDoubleClick = (group: ParticipationGroup) => {
    onSelect(group)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Participation Group</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search participation groups..." 
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
                <div>State</div>
                <div>Attorney</div>
                <div>Parent Type</div>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedGroupId?.toString()} 
              onValueChange={(value) => setSelectedGroupId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(group)}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={group.id.toString()} 
                          id={`group-${group.id}`}
                        />
                        <Label 
                          htmlFor={`group-${group.id}`}
                          className="font-medium text-gray-900 cursor-pointer text-sm"
                        >
                          {group.code}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{group.name}</div>
                      <div className="text-sm text-gray-900">{group.classification}</div>
                      <div className="text-sm text-gray-900">{group.state}</div>
                      <div className="text-sm text-gray-900">{group.attorney}</div>
                      <div className="text-sm text-gray-900">{group.parentType}</div>
                    </div>
                  </div>
                ))}
                
                {filteredGroups.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No participation groups found matching your search.
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
            disabled={!selectedGroupId}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}