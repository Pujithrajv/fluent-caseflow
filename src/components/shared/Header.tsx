import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, HelpCircle, Settings, LogOut, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    id: "faq-1",
    question: "How do I create a new case?",
    answer: "Click on the 'Create New Case' button in the top right corner of the dashboard. This will open the case wizard where you can enter all the required information step by step."
  },
  {
    id: "faq-2",
    question: "What information do I need to start a case?",
    answer: "You'll need department information, party details, case description, and any relevant documents. The wizard will guide you through each required field."
  },
  {
    id: "faq-3",
    question: "How can I track the status of my case?",
    answer: "All your cases are displayed on the main dashboard with their current status. You can also click 'View' on any case to see detailed progress information."
  },
  {
    id: "faq-4",
    question: "Can I edit a case after submission?",
    answer: "Draft cases can be edited freely. Once submitted, cases enter the review process and may have limited editing capabilities depending on the current stage."
  },
  {
    id: "faq-5",
    question: "How do I upload documents?",
    answer: "In the case wizard, there's a dedicated 'Documents' tab where you can upload all required files. Supported formats include PDF, DOC, DOCX, and image files."
  }
];

interface HeaderProps {
  showUserActions?: boolean;
}

export function Header({ showUserActions = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full border-b border-border" style={{ backgroundColor: '#1e3a8a' }}>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/cms-logo.png" 
              alt="Illinois Department of Central Management Services" 
              className="h-14 w-auto"
            />
          </div>
          
          {showUserActions && (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-white/20">
                    <User className="h-12 w-12 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/participants")}>
                    <Users className="mr-2 h-4 w-4" />
                    Attorneys
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => navigate("/")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/20 focus:bg-white/20 transition-colors">
                  <HelpCircle className="h-6 w-6 text-white hover:text-white/80" />
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Frequently Asked Questions</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {faqData.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}