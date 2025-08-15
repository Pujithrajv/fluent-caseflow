import React, { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  organization: string
}

interface ContactLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (contact: Contact) => void
  onCreateNew: () => void
  currentValue?: Contact
  onRemoveValue?: () => void
  pendingNewContact?: Contact | null
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Kirby Neroni",
    email: "kirby.neroni@il.gov",
    phone: "630-308-4387",
    organization: "Board of Higher Education"
  },
  {
    id: 2,
    name: "Batsheva English",
    email: "batsheva.english@il.gov", 
    phone: "217-786-3028",
    organization: "Board of Higher Education"
  },
  {
    id: 3,
    name: "Abbey Higgins",
    email: "abbey.higgins@royce.com",
    phone: "480-796-1707",
    organization: "Royce Partners, LLC"
  },
  {
    id: 4,
    name: "Aafjes-Soriano",
    email: "",
    phone: "",
    organization: "Sunny Day Schools"
  }
]

export function ContactLookupModal({
  isOpen,
  onClose,
  onSelect,
  onCreateNew,
  currentValue,
  onRemoveValue,
  pendingNewContact
}: ContactLookupModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null)
  const [sortField, setSortField] = useState<keyof Contact>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Combine mock contacts with pending new contact
  const allContacts = useMemo(() => {
    const contacts = [...mockContacts]
    if (pendingNewContact) {
      contacts.unshift(pendingNewContact) // Add new contact at the beginning
    }
    return contacts
  }, [pendingNewContact])

  const filteredAndSortedContacts = useMemo(() => {
    const filtered = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )

    return filtered.sort((a, b) => {
      const aValue = String(a[sortField]).toLowerCase()
      const bValue = String(b[sortField]).toLowerCase()
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }, [allContacts, searchQuery, sortField, sortDirection])

  // Auto-select pending new contact when modal opens
  useEffect(() => {
    if (pendingNewContact && isOpen) {
      setSelectedContactId(pendingNewContact.id)
    }
  }, [pendingNewContact, isOpen])

  const handleSort = (field: keyof Contact) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelect = () => {
    const selectedContact = filteredAndSortedContacts.find(c => c.id === selectedContactId)
    if (selectedContact) {
      onSelect(selectedContact)
    }
  }

  const handleRowDoubleClick = (contact: Contact) => {
    onSelect(contact)
  }

  const SortButton = ({ field, children }: { field: keyof Contact, children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="text-left font-medium text-gray-600 hover:text-gray-900 transition-colors"
    >
      {children}
      {sortField === field && (
        <span className="ml-1">
          {sortDirection === "asc" ? "↑" : "↓"}
        </span>
      )}
    </button>
  )

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
              placeholder="Search by name or organization" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7"
              size="sm"
            >
              Search
            </Button>
          </div>
          
          {/* Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <SortButton field="name">Full Name</SortButton>
                <SortButton field="email">Primary Email</SortButton>
                <SortButton field="phone">Primary Phone</SortButton>
                <SortButton field="organization">Company Name</SortButton>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedContactId?.toString()} 
              onValueChange={(value) => setSelectedContactId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredAndSortedContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(contact)}
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={contact.id.toString()} 
                          id={`contact-${contact.id}`}
                        />
                        <Label 
                          htmlFor={`contact-${contact.id}`}
                          className="font-medium text-gray-900 cursor-pointer"
                        >
                          {contact.name}
                        </Label>
                      </div>
                      <div className="text-sm text-gray-900">{contact.email}</div>
                      <div className="text-sm text-gray-900">{contact.phone}</div>
                      <div className="text-sm text-gray-900">{contact.organization}</div>
                    </div>
                  </div>
                ))}
                
                {filteredAndSortedContacts.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No contacts found matching your search.
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
              disabled={!selectedContactId}
            >
              Select
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}