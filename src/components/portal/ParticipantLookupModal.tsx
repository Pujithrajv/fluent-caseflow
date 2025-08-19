import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

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
  const [isNewParticipantModalOpen, setIsNewParticipantModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const newParticipantForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      roleTitle: "",
      organization: "",
      email: "",
      phone: "",
      address: "",
      notes: ""
    }
  })

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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const validateParticipantForm = (data: any) => {
    const errors: string[] = []
    
    // Require at least First & Last Name OR Organization
    const hasName = data.firstName?.trim() && data.lastName?.trim()
    const hasOrg = data.organization?.trim()
    
    if (!hasName && !hasOrg) {
      errors.push("Provide either a First Name & Last Name, or an Organization")
    }
    
    // If no email, address becomes required
    const hasEmail = data.email?.trim()
    const hasAddress = data.address?.trim()
    
    if (!hasEmail && !hasAddress) {
      errors.push("Provide an email or address so we can send notices")
    }
    
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Please enter a valid email address")
    }
    
    return errors
  }

  const handleNewParticipantSave = async (data: any) => {
    const errors = validateParticipantForm(data)
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(". "),
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const newParticipant: Participant = {
        id: Date.now(),
        code: `PT-${String(Date.now()).slice(-3)}`,
        name: data.firstName && data.lastName 
          ? `${data.firstName.trim()} ${data.lastName.trim()}`.trim()
          : data.organization?.trim() || "New participant",
        classification: data.roleTitle?.trim() || "Participant",
        participationType: data.roleTitle?.trim() || "Participant", 
        parentAccount: data.organization?.trim() || "",
        caseDetails: data.notes?.trim() || "New participant"
      }

      // Add to the participants list and select it
      setSelectedParticipantId(newParticipant.id)
      onSelect(newParticipant)
      
      toast({
        title: "Success",
        description: "Participant added and selected."
      })
      
      // Reset form and close modal
      newParticipantForm.reset()
      setIsNewParticipantModalOpen(false)
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to save participant. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewParticipantCancel = () => {
    newParticipantForm.reset()
    setIsNewParticipantModalOpen(false)
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    newParticipantForm.setValue("phone", formatted)
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
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsNewParticipantModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
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

      {/* New Participant Modal */}
      <Dialog open={isNewParticipantModalOpen} onOpenChange={setIsNewParticipantModalOpen}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
          aria-labelledby="new-participant-title"
        >
          <DialogHeader>
            <DialogTitle id="new-participant-title">New Participant</DialogTitle>
          </DialogHeader>
          
          <Form {...newParticipantForm}>
            <form onSubmit={newParticipantForm.handleSubmit(handleNewParticipantSave)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <FormField
                    control={newParticipantForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="roleTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role/Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter role or title" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter organization" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <FormField
                    control={newParticipantForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="(555) 123-4567"
                            onChange={(e) => handlePhoneChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter email address" />
                        </FormControl>
                        <FormDescription>
                          If no email is entered, address is required.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter address"
                            rows={3}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newParticipantForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter notes"
                            rows={3}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleNewParticipantCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}