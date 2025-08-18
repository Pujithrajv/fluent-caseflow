import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, X } from "lucide-react"
import { ParticipationGroupLookupModal } from "./ParticipationGroupLookupModal"
import { ParticipationTypeLookupModal } from "./ParticipationTypeLookupModal"
import { PartyLookupModal } from "./PartyLookupModal"
import { CaseLookupModal } from "./CaseLookupModal"

interface CreateParticipantModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (participant: any) => void
}

interface ParticipationGroup {
  id: number
  code: string
  name: string
  classification: string
  state: string
  attorney: string
  parentType: string
}

interface ParticipationType {
  id: number
  code: string
  name: string
  participationType: string
  parentAccount: string
}

interface Party {
  id: number
  code: string
  name: string
  participationType: string
  parentAccount: string
  caseType: string
  primaryContact: string
}

interface Case {
  id: number
  caseNumber: string
  caseName: string
  caseType: string
  caseAcceptance: string
  caseStage: string
}

export function CreateParticipantModal({
  isOpen,
  onClose,
  onSubmit
}: CreateParticipantModalProps) {
  const [formData, setFormData] = useState({
    participationGroup: null as ParticipationGroup | null,
    participationType: null as ParticipationType | null,
    party: null as Party | null,
    case: null as Case | null
  })

  const [activeModal, setActiveModal] = useState<string | null>(null)

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.participationGroup || !formData.participationType || !formData.case) {
      return
    }

    // Create new participant
    const newParticipant = {
      id: Date.now(), // Generate temporary ID
      code: `PT-${String(Date.now()).slice(-3)}`,
      name: formData.participationGroup.name,
      classification: formData.participationGroup.classification,
      participationType: formData.participationType.name,
      parentAccount: formData.participationType.parentAccount,
      caseDetails: `${formData.case.caseNumber} - ${formData.case.caseName}`
    }

    onSubmit(newParticipant)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      participationGroup: null,
      participationType: null,
      party: null,
      case: null
    })
    onClose()
  }

  const clearField = (field: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [field]: null }))
  }

  const isFormValid = formData.participationGroup && formData.participationType && formData.case

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Participant</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Participation Group */}
            <div>
              <Label className="text-sm font-medium">
                Participation Group <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  readOnly
                  value={formData.participationGroup ? `${formData.participationGroup.code} - ${formData.participationGroup.name}` : ""}
                  placeholder="Select participation group..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal("participationGroup")}
                >
                  <Search className="h-4 w-4" />
                </Button>
                {formData.participationGroup && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearField("participationGroup")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Participation Type */}
            <div>
              <Label className="text-sm font-medium">
                Participation Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  readOnly
                  value={formData.participationType ? `${formData.participationType.code} - ${formData.participationType.name}` : ""}
                  placeholder="Select participation type..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal("participationType")}
                >
                  <Search className="h-4 w-4" />
                </Button>
                {formData.participationType && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearField("participationType")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Party (Optional) */}
            <div>
              <Label className="text-sm font-medium">Party</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  readOnly
                  value={formData.party ? `${formData.party.code} - ${formData.party.name}` : ""}
                  placeholder="Select party (optional)..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal("party")}
                >
                  <Search className="h-4 w-4" />
                </Button>
                {formData.party && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearField("party")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Case */}
            <div>
              <Label className="text-sm font-medium">
                Case <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  readOnly
                  value={formData.case ? `${formData.case.caseNumber} - ${formData.case.caseName}` : ""}
                  placeholder="Select case..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal("case")}
                >
                  <Search className="h-4 w-4" />
                </Button>
                {formData.case && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearField("case")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Save Participant
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lookup Modals */}
      <ParticipationGroupLookupModal
        isOpen={activeModal === "participationGroup"}
        onClose={() => setActiveModal(null)}
        onSelect={(group) => {
          setFormData(prev => ({ ...prev, participationGroup: group }))
          setActiveModal(null)
        }}
      />

      <ParticipationTypeLookupModal
        isOpen={activeModal === "participationType"}
        onClose={() => setActiveModal(null)}
        onSelect={(type) => {
          setFormData(prev => ({ ...prev, participationType: type }))
          setActiveModal(null)
        }}
      />

      <PartyLookupModal
        isOpen={activeModal === "party"}
        onClose={() => setActiveModal(null)}
        onSelect={(party) => {
          setFormData(prev => ({ ...prev, party: party }))
          setActiveModal(null)
        }}
      />

      <CaseLookupModal
        isOpen={activeModal === "case"}
        onClose={() => setActiveModal(null)}
        onSelect={(caseItem) => {
          setFormData(prev => ({ ...prev, case: caseItem }))
          setActiveModal(null)
        }}
      />
    </>
  )
}