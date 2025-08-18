import React, { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  organization: string
  city?: string
}

interface Account {
  id: number
  code: string
  name: string
  participationType?: string
  parentAccount?: string
  primaryContact?: string
  primaryPhone?: string
  primaryEmail?: string
}

type ViewType = "contacts" | "accounts"
type RecordType = Contact | Account

interface ContactLookupModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (record: RecordType) => void
  onCreateNew: () => void
  currentValue?: RecordType
  onRemoveValue?: () => void
  pendingNewContact?: RecordType | null
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Kirby Neroni",
    email: "kirby.neroni@il.gov",
    phone: "630-308-4387",
    organization: "Board of Higher Education",
    city: "Springfield"
  },
  {
    id: 2,
    name: "Batsheva English",
    email: "batsheva.english@il.gov", 
    phone: "217-786-3028",
    organization: "Board of Higher Education",
    city: "Chicago"
  },
  {
    id: 3,
    name: "Abbey Higgins",
    email: "abbey.higgins@royce.com",
    phone: "480-796-1707",
    organization: "Royce Partners, LLC",
    city: "Phoenix"
  },
  {
    id: 4,
    name: "Aafjes-Soriano",
    email: "",
    phone: "",
    organization: "Sunny Day Schools",
    city: "Urbana"
  }
]

const mockAccounts: Account[] = [
  {
    id: 101,
    code: "BHE-001",
    name: "Board of Higher Education",
    participationType: "Government Agency",
    parentAccount: "",
    primaryContact: "Kirby Neroni",
    primaryPhone: "630-308-4387",
    primaryEmail: "kirby.neroni@il.gov"
  },
  {
    id: 102,
    code: "RPL-001", 
    name: "Royce Partners, LLC",
    participationType: "Legal Firm",
    parentAccount: "",
    primaryContact: "Abbey Higgins",
    primaryPhone: "480-796-1707",
    primaryEmail: "abbey.higgins@royce.com"
  },
  {
    id: 103,
    code: "SDS-001",
    name: "Sunny Day Schools",
    participationType: "Educational Institution", 
    parentAccount: "",
    primaryContact: "Aafjes-Soriano",
    primaryPhone: "",
    primaryEmail: ""
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
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null)
  const [viewType, setViewType] = useState<ViewType>("contacts")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get current records based on view type
  const currentRecords = useMemo(() => {
    if (viewType === "contacts") {
      const baseRecords = [...mockContacts]
      if (pendingNewContact && 'name' in pendingNewContact && 'email' in pendingNewContact) {
        baseRecords.unshift(pendingNewContact as Contact)
      }
      return baseRecords
    } else {
      return [...mockAccounts]
    }
  }, [viewType, pendingNewContact])

  const filteredAndSortedRecords = useMemo(() => {
    const filtered = currentRecords.filter(record => {
      const searchLower = searchQuery.toLowerCase()
      if (viewType === "contacts") {
        const contact = record as Contact
        return contact.name.toLowerCase().includes(searchLower) ||
               contact.organization.toLowerCase().includes(searchLower) ||
               contact.email.toLowerCase().includes(searchLower) ||
               contact.phone.includes(searchQuery) ||
               (contact.city && contact.city.toLowerCase().includes(searchLower))
      } else {
        const account = record as Account
        return account.name.toLowerCase().includes(searchLower) ||
               account.code.toLowerCase().includes(searchLower) ||
               (account.primaryContact && account.primaryContact.toLowerCase().includes(searchLower)) ||
               (account.primaryEmail && account.primaryEmail.toLowerCase().includes(searchLower)) ||
               (account.primaryPhone && account.primaryPhone.includes(searchQuery))
      }
    })

    return filtered.sort((a, b) => {
      const aValue = String((a as any)[sortField] || "").toLowerCase()
      const bValue = String((b as any)[sortField] || "").toLowerCase()
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }, [currentRecords, searchQuery, sortField, sortDirection, viewType])

  // Auto-select pending new contact when modal opens
  useEffect(() => {
    if (pendingNewContact && isOpen) {
      setSelectedRecordId(pendingNewContact.id)
    }
  }, [pendingNewContact, isOpen])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelect = () => {
    const selectedRecord = filteredAndSortedRecords.find(r => r.id === selectedRecordId)
    if (selectedRecord) {
      onSelect(selectedRecord)
    }
  }

  const handleRowDoubleClick = (record: RecordType) => {
    onSelect(record)
  }

  const SortButton = ({ field, children }: { field: string, children: React.ReactNode }) => (
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

  const getTableColumns = () => {
    if (viewType === "contacts") {
      return ["name", "email", "phone", "organization", "city"]
    } else {
      return ["code", "name", "participationType", "parentAccount", "primaryContact", "primaryPhone", "primaryEmail"]
    }
  }

  const renderTableHeaders = () => {
    if (viewType === "contacts") {
      return (
        <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
          <SortButton field="name">Full Name</SortButton>
          <SortButton field="email">Primary Email</SortButton>
          <SortButton field="phone">Primary Phone</SortButton>
          <SortButton field="organization">Company Name</SortButton>
          <SortButton field="city">City</SortButton>
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
          <SortButton field="code">Code</SortButton>
          <SortButton field="name">Name</SortButton>
          <SortButton field="participationType">Participation Type</SortButton>
          <SortButton field="parentAccount">Parent Account</SortButton>
          <SortButton field="primaryContact">Primary Contact</SortButton>
          <SortButton field="primaryPhone">Primary Phone</SortButton>
          <SortButton field="primaryEmail">Primary Email</SortButton>
        </div>
      )
    }
  }

  const renderTableRow = (record: RecordType) => {
    if (viewType === "contacts") {
      const contact = record as Contact
      return (
        <div className="grid grid-cols-5 gap-4 items-center">
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
          <div className="text-sm text-gray-900">{contact.city || ""}</div>
        </div>
      )
    } else {
      const account = record as Account
      return (
        <div className="grid grid-cols-7 gap-2 items-center">
          <div className="flex items-center space-x-3">
            <RadioGroupItem 
              value={account.id.toString()} 
              id={`account-${account.id}`}
            />
            <Label 
              htmlFor={`account-${account.id}`}
              className="font-medium text-gray-900 cursor-pointer text-sm"
            >
              {account.code}
            </Label>
          </div>
          <div className="text-sm text-gray-900">{account.name}</div>
          <div className="text-sm text-gray-900">{account.participationType || ""}</div>
          <div className="text-sm text-gray-900">{account.parentAccount || ""}</div>
          <div className="text-sm text-gray-900">{account.primaryContact || ""}</div>
          <div className="text-sm text-gray-900">{account.primaryPhone || ""}</div>
          <div className="text-sm text-gray-900">{account.primaryEmail || ""}</div>
        </div>
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Lookup records</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* View Switch and Search Bar */}
          <div className="flex gap-4">
            <div className="w-48">
              <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contacts">Contacts Lookup View</SelectItem>
                  <SelectItem value="accounts">Account Lookup View</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search contacts..." 
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
          </div>
          
          {/* Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              {renderTableHeaders()}
            </div>
            
            <RadioGroup 
              value={selectedRecordId?.toString()} 
              onValueChange={(value) => setSelectedRecordId(parseInt(value))}
            >
              <div className="divide-y divide-gray-200">
                {filteredAndSortedRecords.map((record) => (
                  <div 
                    key={record.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(record)}
                  >
                    {renderTableRow(record)}
                  </div>
                ))}
                
                {filteredAndSortedRecords.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No {viewType} found matching your search.
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
              disabled={!selectedRecordId}
            >
              Select
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}