import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Plus, Edit, Trash2, Calendar as CalendarIcon, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface DocumentProductionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function DocumentProductionQuestionsTab({ onDataChange, data }: DocumentProductionQuestionsTabProps) {
  const [recipients, setRecipients] = useState<Person[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [receiveDate, setReceiveDate] = useState<Date>();
  const [productionDueDate, setProductionDueDate] = useState<Date>();

  const addNewPerson = () => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: "",
      phone: "",
      email: ""
    };
    setRecipients([...recipients, newPerson]);
    setEditingId(newPerson.id);
  };

  const deletePerson = (id: string) => {
    setRecipients(recipients.filter(person => person.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const updatePerson = (id: string, field: keyof Person, value: string) => {
    setRecipients(recipients.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Document Production Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Separator className="my-6" />
          
          {/* What persons to receive a Request to Produce Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label className="font-fluent text-sm font-semibold">What persons to receive a Request to Produce</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add the recipients who will receive the document production request</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Button 
                onClick={addNewPerson}
                className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-fluent-8"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Person
              </Button>
            </div>

            {recipients.length > 0 && (
              <div className="border rounded-md shadow-fluent-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-fluent font-semibold">Name</TableHead>
                      <TableHead className="font-fluent font-semibold">Phone</TableHead>
                      <TableHead className="font-fluent font-semibold">Email ID</TableHead>
                      <TableHead className="font-fluent font-semibold w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>
                          {editingId === person.id ? (
                            <Input
                              value={person.name}
                              onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="h-8"
                              onBlur={() => setEditingId(null)}
                              autoFocus
                            />
                          ) : (
                            <span className="font-fluent">{person.name || "Click edit to add name"}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === person.id ? (
                            <Input
                              value={person.phone}
                              onChange={(e) => updatePerson(person.id, 'phone', e.target.value)}
                              placeholder="Enter phone"
                              className={`h-8 ${person.phone && !validatePhone(person.phone) ? 'border-destructive' : ''}`}
                              onBlur={() => setEditingId(null)}
                            />
                          ) : (
                            <span className={`font-fluent ${person.phone && !validatePhone(person.phone) ? 'text-destructive' : ''}`}>
                              {person.phone || "Click edit to add phone"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === person.id ? (
                            <Input
                              value={person.email}
                              onChange={(e) => updatePerson(person.id, 'email', e.target.value)}
                              placeholder="Enter email"
                              className={`h-8 ${person.email && !validateEmail(person.email) ? 'border-destructive' : ''}`}
                              onBlur={() => setEditingId(null)}
                            />
                          ) : (
                            <span className={`font-fluent ${person.email && !validateEmail(person.email) ? 'text-destructive' : ''}`}>
                              {person.email || "Click edit to add email"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingId(person.id)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deletePerson(person.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* When will they receive Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label className="font-fluent text-sm font-semibold">When will they receive</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the date when recipients will receive the document production request</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-72 justify-start text-left font-fluent shadow-fluent-8"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {receiveDate ? format(receiveDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={receiveDate}
                  onSelect={setReceiveDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* When is production due Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label className="font-fluent text-sm font-semibold">When is production due</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the deadline for document production</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-72 justify-start text-left font-fluent shadow-fluent-8"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {productionDueDate ? format(productionDueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={productionDueDate}
                  onSelect={setProductionDueDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}