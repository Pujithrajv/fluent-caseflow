import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Plus, Edit, Trash2, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DepositionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

interface Expert {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export function DepositionQuestionsTab({ onDataChange, data }: DepositionQuestionsTabProps) {
  const [hasExpert, setHasExpert] = useState(false);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [editingExpertId, setEditingExpertId] = useState<string | null>(null);
  const [expertSubjectMatter, setExpertSubjectMatter] = useState("");
  const [expertDisclosureDate, setExpertDisclosureDate] = useState<Date | undefined>();
  const [hasWrittenReport, setHasWrittenReport] = useState(false);
  const [expertDepositionDate, setExpertDepositionDate] = useState<Date | undefined>();
  
  const [personsToDepose, setPersonsToDepose] = useState<Person[]>([]);
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [depositionNecessity, setDepositionNecessity] = useState("");
  const [interrogatoriesAlternative, setInterrogatoriesAlternative] = useState("");
  const [depositionCompletionDate, setDepositionCompletionDate] = useState<Date | undefined>();

  const addNewExpert = () => {
    const newExpert: Expert = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      email: ""
    };
    setExperts([...experts, newExpert]);
    setEditingExpertId(newExpert.id);
  };

  const deleteExpert = (id: string) => {
    setExperts(experts.filter(expert => expert.id !== id));
  };

  const updateExpert = (id: string, field: keyof Expert, value: string) => {
    setExperts(experts.map(expert => 
      expert.id === id ? { ...expert, [field]: value } : expert
    ));
  };

  const addNewPerson = () => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      email: ""
    };
    setPersonsToDepose([...personsToDepose, newPerson]);
    setEditingPersonId(newPerson.id);
  };

  const deletePerson = (id: string) => {
    setPersonsToDepose(personsToDepose.filter(person => person.id !== id));
  };

  const updatePerson = (id: string, field: keyof Person, value: string) => {
    setPersonsToDepose(personsToDepose.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s\-\(\)]+$/.test(phone);
  };

  return (
    <div className="space-y-6">
      {/* Expert Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Expert Section</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <Label htmlFor="hasExpert" className="font-fluent">Is there an Expert?</Label>
            <Switch 
              id="hasExpert"
              checked={hasExpert}
              onCheckedChange={setHasExpert}
            />
          </div>

          {hasExpert && (
            <div className="space-y-6 border-l-4 border-primary/20 pl-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-fluent">Disclosure of Identity of Expert</Label>
                  <Button 
                    onClick={addNewExpert}
                    size="sm"
                    className="bg-[#0078D4] hover:bg-[#106ebe] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Expert
                  </Button>
                </div>

                {experts.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead className="font-fluent">Name</TableHead>
                          <TableHead className="font-fluent">Phone</TableHead>
                          <TableHead className="font-fluent">Email Address</TableHead>
                          <TableHead className="font-fluent">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {experts.map((expert) => (
                          <TableRow key={expert.id}>
                            <TableCell>
                              {editingExpertId === expert.id ? (
                                <Input
                                  value={expert.name}
                                  onChange={(e) => updateExpert(expert.id, 'name', e.target.value)}
                                  onBlur={() => setEditingExpertId(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') setEditingExpertId(null);
                                  }}
                                  autoFocus
                                  className="h-8"
                                />
                              ) : (
                                <span onClick={() => setEditingExpertId(expert.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                                  {expert.name || 'Click to edit'}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingExpertId === expert.id ? (
                                <Input
                                  value={expert.phone}
                                  onChange={(e) => updateExpert(expert.id, 'phone', e.target.value)}
                                  onBlur={() => setEditingExpertId(null)}
                                  className={cn("h-8", !validatePhone(expert.phone) && expert.phone && "border-red-500")}
                                />
                              ) : (
                                <span onClick={() => setEditingExpertId(expert.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                                  {expert.phone || 'Click to edit'}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingExpertId === expert.id ? (
                                <Input
                                  value={expert.email}
                                  onChange={(e) => updateExpert(expert.id, 'email', e.target.value)}
                                  onBlur={() => setEditingExpertId(null)}
                                  className={cn("h-8", !validateEmail(expert.email) && expert.email && "border-red-500")}
                                />
                              ) : (
                                <span onClick={() => setEditingExpertId(expert.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                                  {expert.email || 'Click to edit'}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingExpertId(expert.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteExpert(expert.id)}
                                  className="text-red-600 hover:text-red-700"
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

              <div className="space-y-2">
                <Label htmlFor="expertSubjectMatter" className="font-fluent">Subject Matter of Deposition of Expert</Label>
                <Textarea 
                  id="expertSubjectMatter"
                  value={expertSubjectMatter}
                  onChange={(e) => setExpertSubjectMatter(e.target.value)}
                  placeholder="Describe the subject matter for expert deposition..."
                  className="shadow-fluent-8 border-input-border min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Date for Disclosure</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                        !expertDisclosureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expertDisclosureDate ? format(expertDisclosureDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expertDisclosureDate}
                      onSelect={setExpertDisclosureDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-3">
                <Label htmlFor="hasWrittenReport" className="font-fluent">Is there a written report / Disclosure of Vitae of Expert?</Label>
                <Switch 
                  id="hasWrittenReport"
                  checked={hasWrittenReport}
                  onCheckedChange={setHasWrittenReport}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Date for Deposition of Expert</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                        !expertDepositionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expertDepositionDate ? format(expertDepositionDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expertDepositionDate}
                      onSelect={setExpertDepositionDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deposition Info Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Deposition Info Section</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-fluent">Who to be deposed</Label>
              <Button 
                onClick={addNewPerson}
                size="sm"
                className="bg-[#0078D4] hover:bg-[#106ebe] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Person
              </Button>
            </div>

            {personsToDepose.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-fluent">Name</TableHead>
                      <TableHead className="font-fluent">Phone</TableHead>
                      <TableHead className="font-fluent">Email Address</TableHead>
                      <TableHead className="font-fluent">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personsToDepose.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>
                          {editingPersonId === person.id ? (
                            <Input
                              value={person.name}
                              onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                              onBlur={() => setEditingPersonId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') setEditingPersonId(null);
                              }}
                              autoFocus
                              className="h-8"
                            />
                          ) : (
                            <span onClick={() => setEditingPersonId(person.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                              {person.name || 'Click to edit'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingPersonId === person.id ? (
                            <Input
                              value={person.phone}
                              onChange={(e) => updatePerson(person.id, 'phone', e.target.value)}
                              onBlur={() => setEditingPersonId(null)}
                              className={cn("h-8", !validatePhone(person.phone) && person.phone && "border-red-500")}
                            />
                          ) : (
                            <span onClick={() => setEditingPersonId(person.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                              {person.phone || 'Click to edit'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingPersonId === person.id ? (
                            <Input
                              value={person.email}
                              onChange={(e) => updatePerson(person.id, 'email', e.target.value)}
                              onBlur={() => setEditingPersonId(null)}
                              className={cn("h-8", !validateEmail(person.email) && person.email && "border-red-500")}
                            />
                          ) : (
                            <span onClick={() => setEditingPersonId(person.id)} className="cursor-pointer hover:bg-muted rounded px-2 py-1 block">
                              {person.email || 'Click to edit'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingPersonId(person.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePerson(person.id)}
                              className="text-red-600 hover:text-red-700"
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

          <div className="space-y-2">
            <Label htmlFor="depositionNecessity" className="font-fluent">Why is their deposition necessary</Label>
            <Textarea 
              id="depositionNecessity"
              value={depositionNecessity}
              onChange={(e) => setDepositionNecessity(e.target.value)}
              placeholder="Explain why this deposition is necessary..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interrogatoriesAlternative" className="font-fluent">Can testimony be gotten by Interrogatories?</Label>
            <Textarea 
              id="interrogatoriesAlternative"
              value={interrogatoriesAlternative}
              onChange={(e) => setInterrogatoriesAlternative(e.target.value)}
              placeholder="Explain whether this testimony can be obtained through Interrogatories instead..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-fluent">If deposition allowed, date range for completion</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !depositionCompletionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {depositionCompletionDate ? format(depositionCompletionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={depositionCompletionDate}
                  onSelect={setDepositionCompletionDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}