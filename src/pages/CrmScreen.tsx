import { ChevronLeft, ChevronRight, Search, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CrmScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex">
      {/* Left Sidebar */}
      <div className="w-48 bg-[#f3f2f1] border-r border-[#edebe9] flex flex-col">
        <div className="p-3 border-b border-[#edebe9]">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 bg-[#0078d4] text-white flex items-center justify-center text-xs font-semibold">
              CM
            </div>
            <span className="font-semibold text-[#323130]">Case Management</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="py-2">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">My Work</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏠</span> Home
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🕐</span> Recent
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📌</span> Pinned
            </a>
            <div className="px-3 py-2 text-sm text-[#323130] font-semibold">Dashboards</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📊</span> Activities
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Core Records</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📋</span> Cases
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📝</span> Requests
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📄</span> Citations
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Scheduling</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📅</span> Event Calendar
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Entity</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏛️</span> State Entities
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">⚖️</span> Law Firms
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏢</span> Corporate Entities
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Contacts</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">👤</span> State Entity Personnel
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">👥</span> Legal Service Contacts
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">💼</span> Corporate Personnel
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🧑</span> Others / Individuals
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-[#edebe9] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => navigate('/portal')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-semibold text-[#323130]">Sub-Contract Dispute</h1>
                  <span className="text-sm text-[#605e5c]">- Saved</span>
                </div>
                <div className="text-xs text-[#605e5c]">Case</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-semibold text-[#323130]">CMS-BEP-SCD--25-00001</div>
                <div className="text-xs text-[#605e5c]">Case Number</div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-[#0078d4]">Pujith Raj</div>
                  <div className="text-xs text-[#605e5c]">Owner</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#323130]">Discovery</div>
                <div className="text-xs text-[#605e5c]">Status Reason</div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b border-[#edebe9] px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#edebe9]" style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }}></div>
            
            {[
              { label: "Case Processing", sublabel: "Active for 3 months", active: true, filled: true },
              { label: "Intake", sublabel: "", active: false, filled: true },
              { label: "Pre-Hearing (10 D)", sublabel: "", active: false, filled: false },
              { label: "Hearing", sublabel: "", active: false, filled: false },
              { label: "Post Hearing", sublabel: "", active: false, filled: false },
              { label: "Decision", sublabel: "", active: false, filled: false },
              { label: "Post Decision", sublabel: "", active: false, filled: false },
              { label: "Close", sublabel: "", active: false, filled: false }
            ].map((stage, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stage.active ? 'bg-[#0078d4] border-2 border-[#0078d4]' : 
                  stage.filled ? 'bg-[#107c10] border-2 border-[#107c10]' : 
                  'bg-white border-2 border-[#d2d0ce]'
                }`}>
                  {stage.filled && <span className="text-white text-xl">✓</span>}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-semibold ${stage.active ? 'text-[#323130]' : 'text-[#605e5c]'}`}>
                    {stage.label}
                  </div>
                  {stage.sublabel && (
                    <div className="text-xs text-[#605e5c] bg-[#0078d4] text-white px-2 py-0.5 rounded mt-1">
                      {stage.sublabel}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#edebe9] px-4">
          <div className="flex items-center space-x-6">
            {["General", "Intake", "Pre-Hearing", "Post Hearing", "Participants", "Requests", "Schedule", "Timeline / Docket", "Case Type", "Related"].map((tab, idx) => (
              <button
                key={idx}
                className={`py-3 text-sm font-semibold border-b-2 ${
                  idx === 0 ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-[#605e5c] hover:text-[#323130]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto bg-[#faf9f8] p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
            {/* Left Column - DETAILS */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DETAILS</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Name <span className="text-red-600">*</span></Label>
                    <Input value="Sub-Contract Dispute" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Case Type <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Sub-Contract Dispute</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Department ID</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Department <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Central Management Services</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Division</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Business Enterprise Program</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Bureau</Label>
                    <Input value="" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DEPARTMENT STAFF</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Case Coordinator <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Eneida Dirckens</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Department Attorney <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Gula Habicht</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Final Decision Maker <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Deena Vankov</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">SUMMARY</h3>
                </div>
                <div className="p-4">
                  <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" readOnly />
                </div>
              </div>
            </div>

            {/* Middle Column - PRIMARY PARTY & 3RD PARTY */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">PRIMARY PARTY</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Party <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Matilde Lowe</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Represented</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch checked className="data-[state=checked]:bg-[#0078d4]" />
                      <span className="text-sm text-[#323130]">Yes</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Party Attorney <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Abbey Higgins</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">3RD PARTY</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">3rd Party</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Additional Party</Label>
                    <div className="flex items-center mt-1">
                      <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" />
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Third Party Represented</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Third Party Attorney</Label>
                    <div className="flex items-center mt-1">
                      <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" />
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DETAILS</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Initiating Date <span className="text-red-600">*</span></Label>
                    <Input type="date" value="2025-10-01" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Responsive Date</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Caption Notation</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - INTERNAL STAFF, EXPEDITED, REFERRAL SOURCE */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">INTERNAL STAFF</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Clerk</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Primary ALJ <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Backup ALJ</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Fact Finder Term</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Administrative Law Judge</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">EXPEDITED</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Complex Case</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Confidential</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Expedited</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">REFERRAL SOURCE</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Alternative Referral Method</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Referral Method Source</Label>
                    <Input value="Portal" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmScreen;