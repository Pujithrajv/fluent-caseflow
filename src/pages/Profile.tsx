import { useState } from "react";
import { ChevronDown, ArrowLeft, Info, HelpCircle, Edit, Trash2, Save, X, Plus, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AgencyManagementDashboard } from "@/components/portal/AgencyManagementDashboard";
import { Dynamics365AgencyDashboard } from "@/components/portal/Dynamics365AgencyDashboard";
import { Dynamics365SinglePageDashboard } from "@/components/portal/Dynamics365SinglePageDashboard";
import { AgencyManagerScreen } from "@/components/portal/AgencyManagerScreen";
import { AgencyTestScreen } from "@/components/portal/AgencyTestScreen";
import { AgencyTest2Screen } from "@/components/portal/AgencyTest2Screen";
import { AgencyTest1Screen } from "@/components/portal/AgencyTest1Screen";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = useState({ firstName: "", middleInitial: "", lastName: "", salutation: "", suffix: "", pronouns: "", participationType: "", preferredLanguage: "" });
  const [addressInfo, setAddressInfo] = useState({ address1: "", address2: "", city: "", state: "", postalCode: "", country: "United States" });
  const [contactInfo, setContactInfo] = useState({ email: "user@example.com", phoneHome: "", phoneMobile: "", phoneBusiness: "", phoneOther: "", preferredPhone: "" });
  const [accountProfile, setAccountProfile] = useState({ organizationName: "", website: "", telephone: "", address: "", address2: "", city: "", state: "", zipCode: "", country: "United States", participationType: "" });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [emailCommunicationsConsent, setEmailCommunicationsConsent] = useState("allow");
  const [postalMailConsent, setPostalMailConsent] = useState("allow");
  const [smsNotificationsConsent, setSmsNotificationsConsent] = useState("do-not-allow");
  const [phoneCallsConsent, setPhoneCallsConsent] = useState("ask-each-time");
  const [marketingCommunicationsConsent, setMarketingCommunicationsConsent] = useState("do-not-allow");

  const [contacts, setContacts] = useState([
    { id: "1", name: "John Smith", email: "j.smith@agr.gov", phone: "555-111-2222", role: "Attorney", lastUpdatedBy: "Case Manager Smith", lastUpdatedDate: "2024-01-15" },
    { id: "2", name: "Jane Doe", email: "j.doe@agr.gov", phone: "555-333-4444", role: "Case Manager", lastUpdatedBy: "Case Manager Johnson", lastUpdatedDate: "2024-01-10" },
    { id: "3", name: "Michael Brown", email: "m.brown@agr.gov", phone: "555-555-6666", role: "FDM (Final Decision Maker)", lastUpdatedBy: "Case Manager Davis", lastUpdatedDate: "2024-01-08" }
  ]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", role: "" });
  const [editContact, setEditContact] = useState({ name: "", email: "", phone: "", role: "" });

  const handlePersonalInfoChange = (field: string, value: string) => { setPersonalInfo(prev => ({ ...prev, [field]: value })); setHasUnsavedChanges(true); };
  const handleAddressInfoChange = (field: string, value: string) => { setAddressInfo(prev => ({ ...prev, [field]: value })); setHasUnsavedChanges(true); };
  const handleContactInfoChange = (field: string, value: string) => { setContactInfo(prev => ({ ...prev, [field]: value })); setHasUnsavedChanges(true); };

  const handleSaveProfile = () => {
    const requiredFieldsValid = personalInfo.firstName && personalInfo.lastName && addressInfo.address1 && addressInfo.city && addressInfo.state && addressInfo.postalCode;
    if (!requiredFieldsValid) { toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" }); return; }
    setHasUnsavedChanges(false);
    toast({ title: "Success", description: "Profile updated." });
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Attorney": return "bg-primary bg-opacity-10 text-primary border border-primary";
      case "Case Manager": return "bg-success bg-opacity-10 text-success border border-success";
      case "FDM (Final Decision Maker)": return "bg-warning bg-opacity-10 text-dark border border-warning";
      default: return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
    }
  };

  const handleAddContact = () => { setIsAddingContact(true); setNewContact({ name: "", email: "", phone: "", role: "" }); };
  const handleSaveNewContact = () => {
    if (!newContact.name || !newContact.email || !newContact.role) { toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" }); return; }
    setContacts(prev => [...prev, { id: Date.now().toString(), ...newContact, lastUpdatedBy: "Current Case Manager", lastUpdatedDate: new Date().toISOString().split('T')[0] }]);
    setIsAddingContact(false); toast({ title: "Success", description: "Contact added successfully." });
  };
  const handleEditContact = (contact: any) => { setEditingContactId(contact.id); setEditContact({ name: contact.name, email: contact.email, phone: contact.phone, role: contact.role }); };
  const handleSaveEditContact = (contactId: string) => {
    if (!editContact.name || !editContact.email || !editContact.role) { toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" }); return; }
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, ...editContact, lastUpdatedBy: "Current Case Manager", lastUpdatedDate: new Date().toISOString().split('T')[0] } : c));
    setEditingContactId(null); toast({ title: "Success", description: "Contact updated successfully." });
  };
  const handleDeleteContact = (contactId: string) => { setContacts(prev => prev.filter(c => c.id !== contactId)); toast({ title: "Success", description: "Contact deleted successfully." }); };
  const handleRoleChange = (contactId: string, newRole: string) => {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, role: newRole, lastUpdatedBy: "Current Case Manager", lastUpdatedDate: new Date().toISOString().split('T')[0] } : c));
    toast({ title: "Success", description: "Role updated successfully." });
  };

  const tabs = [
    { key: "profile", label: "My Profile" }, { key: "account", label: "Organization" },
    { key: "consent", label: "Consent and Settings" }, { key: "attorneys", label: "Attorneys" },
    { key: "testing", label: "Testing Tab" }, { key: "agency-test", label: "Agency Test" },
    { key: "test2", label: "Test2" }, { key: "test1", label: "Test1" }, { key: "organization2", label: "Organization2" }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white border-bottom">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <img src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" alt="Illinois Bureau of Administrative Hearings" style={{ height: "64px" }} className="object-fit-contain" />
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/portal")}><ArrowLeft size={16} className="me-1" /> Back to Dashboard</button>
              <button className="btn btn-link text-muted p-1"><HelpCircle size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4" style={{ maxWidth: "1200px" }}>
        <h1 className="h3 fw-bold text-dark mb-4">My Profile Page</h1>

        {/* Tabs */}
        <ul className="nav nav-tabs flex-nowrap overflow-auto mb-0" style={{ whiteSpace: "nowrap" }}>
          {tabs.map(tab => (
            <li className="nav-item" key={tab.key}>
              <button className={`nav-link ${activeTab === tab.key ? "active" : ""}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
            </li>
          ))}
        </ul>

        {/* My Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              {/* Personal Information */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Personal Information</h5></div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label small fw-medium">First Name <span className="text-danger">*</span></label>
                      <input className="form-control" value={personalInfo.firstName} onChange={e => handlePersonalInfoChange("firstName", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Middle Initial</label>
                      <input className="form-control" maxLength={1} value={personalInfo.middleInitial} onChange={e => handlePersonalInfoChange("middleInitial", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Last Name <span className="text-danger">*</span></label>
                      <input className="form-control" value={personalInfo.lastName} onChange={e => handlePersonalInfoChange("lastName", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Salutation</label>
                      <select className="form-select" value={personalInfo.salutation} onChange={e => handlePersonalInfoChange("salutation", e.target.value)}>
                        <option value="">Select salutation</option><option value="mr">Mr.</option><option value="mrs">Mrs.</option><option value="ms">Ms.</option><option value="dr">Dr.</option><option value="prof">Prof.</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Suffix</label>
                      <select className="form-select" value={personalInfo.suffix} onChange={e => handlePersonalInfoChange("suffix", e.target.value)}>
                        <option value="">Select suffix</option><option value="jr">Jr.</option><option value="sr">Sr.</option><option value="ii">II</option><option value="iii">III</option><option value="iv">IV</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Pronouns</label>
                      <select className="form-select" value={personalInfo.pronouns} onChange={e => handlePersonalInfoChange("pronouns", e.target.value)}>
                        <option value="">Select pronouns</option><option value="he-him">He/Him</option><option value="she-her">She/Her</option><option value="they-them">They/Them</option><option value="custom">Custom</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Participation Type</label>
                      <select className="form-select" value={personalInfo.participationType} onChange={e => handlePersonalInfoChange("participationType", e.target.value)}>
                        <option value="">Select</option><option value="petitioner">Petitioner</option><option value="respondent">Respondent</option><option value="department-representative">Department Representative</option><option value="attorney">Attorney</option><option value="interpreter">Interpreter</option><option value="witness">Witness</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Preferred Language</label>
                      <select className="form-select" value={personalInfo.preferredLanguage} onChange={e => handlePersonalInfoChange("preferredLanguage", e.target.value)}>
                        <option value="">Select language</option><option value="english">English</option><option value="spanish">Spanish</option><option value="cantonese">Cantonese</option><option value="mandarin">Mandarin</option><option value="polish">Polish</option><option value="arabic">Arabic</option><option value="korean">Korean</option><option value="russian">Russian</option><option value="tagalog">Tagalog</option><option value="vietnamese">Vietnamese</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Address Information</h5></div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Address Line 1 <span className="text-danger">*</span></label>
                      <input className="form-control" value={addressInfo.address1} onChange={e => handleAddressInfoChange("address1", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Address Line 2</label>
                      <input className="form-control" value={addressInfo.address2} onChange={e => handleAddressInfoChange("address2", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">City <span className="text-danger">*</span></label>
                      <input className="form-control" value={addressInfo.city} onChange={e => handleAddressInfoChange("city", e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">State / Province <span className="text-danger">*</span></label>
                      <select className="form-select" value={addressInfo.state} onChange={e => handleAddressInfoChange("state", e.target.value)}>
                        <option value="">Select state</option><option value="il">Illinois</option><option value="ca">California</option><option value="ny">New York</option><option value="tx">Texas</option><option value="fl">Florida</option><option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Postal Code <span className="text-danger">*</span></label>
                      <input className="form-control" value={addressInfo.postalCode} onChange={e => handleAddressInfoChange("postalCode", e.target.value)} placeholder="12345" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">Country <span className="text-danger">*</span></label>
                      <select className="form-select" value={addressInfo.country} onChange={e => handleAddressInfoChange("country", e.target.value)}>
                        <option>United States</option><option>Canada</option><option>Mexico</option><option>United Kingdom</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Contact Information</h5></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-medium">Email <span className="text-danger">*</span></label>
                    <input className="form-control bg-light" value={contactInfo.email} disabled />
                    <div className="d-flex align-items-center mt-1 small text-muted"><Info size={12} className="me-1" /> This email is managed by OKTA and cannot be edited here.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label small fw-medium">Home Phone</label><input className="form-control" value={contactInfo.phoneHome} onChange={e => handleContactInfoChange("phoneHome", formatPhone(e.target.value))} placeholder="(555) 123-4567" /></div>
                  <div className="col-md-6"><label className="form-label small fw-medium">Mobile Phone</label><input className="form-control" value={contactInfo.phoneMobile} onChange={e => handleContactInfoChange("phoneMobile", formatPhone(e.target.value))} placeholder="(555) 123-4567" /></div>
                  <div className="col-md-6"><label className="form-label small fw-medium">Business Phone</label><input className="form-control" value={contactInfo.phoneBusiness} onChange={e => handleContactInfoChange("phoneBusiness", formatPhone(e.target.value))} placeholder="(555) 123-4567" /></div>
                  <div className="col-md-6"><label className="form-label small fw-medium">Other Phone</label><input className="form-control" value={contactInfo.phoneOther} onChange={e => handleContactInfoChange("phoneOther", formatPhone(e.target.value))} placeholder="(555) 123-4567" /></div>
                  <div className="col-md-6">
                    <label className="form-label small fw-medium">Preferred Phone</label>
                    <select className="form-select" value={contactInfo.preferredPhone} onChange={e => handleContactInfoChange("preferredPhone", e.target.value)}>
                      <option value="">Select preferred phone</option><option value="home">Home</option><option value="mobile">Mobile</option><option value="business">Business</option><option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4 sticky-bottom bg-white border-top p-3">
              <button className="btn btn-outline-secondary" onClick={() => navigate("/portal")}>Cancel</button>
              <button className="btn btn-primary" disabled={!hasUnsavedChanges} onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        )}

        {/* Organization Tab */}
        {activeTab === "account" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Organization Information</h5><p className="small text-muted mt-1 mb-0">Your organization's contact details.</p></div>
                  <div className="card-body">
                    <div className="mb-3"><label className="form-label small fw-medium">Organization Name <span className="text-danger">*</span></label><input className="form-control bg-light" value="Department of Natural Resources" readOnly /></div>
                    <div className="mb-3"><label className="form-label small fw-medium">Website</label><input className="form-control bg-light" value="https://dnr.illinois.gov" readOnly /></div>
                    <div className="row g-3">
                      <div className="col-6"><label className="form-label small fw-medium">Business Phone</label><input className="form-control bg-light" readOnly /></div>
                      <div className="col-6"><label className="form-label small fw-medium">Participation Type</label><input className="form-control bg-light" value="Department" readOnly /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Organization Address</h5></div>
                  <div className="card-body">
                    <div className="mb-3"><label className="form-label small fw-medium">Address</label><input className="form-control bg-light" value="One Natural Resources Way" readOnly /></div>
                    <div className="row g-3">
                      <div className="col-4"><label className="form-label small fw-medium">City</label><input className="form-control bg-light" value="Springfield" readOnly /></div>
                      <div className="col-4"><label className="form-label small fw-medium">State</label><input className="form-control bg-light" value="Illinois" readOnly /></div>
                      <div className="col-4"><label className="form-label small fw-medium">Zip</label><input className="form-control bg-light" value="62702" readOnly /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts Table */}
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-semibold">Contacts</h5>
                <button className="btn btn-primary btn-sm" onClick={handleAddContact}><Plus size={14} className="me-1" /> Add Contact</button>
              </div>
              <div className="card-body p-0">
                <table className="table table-sm table-hover mb-0">
                  <thead className="table-light">
                    <tr><th className="small">Name</th><th className="small">Email</th><th className="small">Phone</th><th className="small">Role</th><th className="small">Last Updated</th><th className="small">Actions</th></tr>
                  </thead>
                  <tbody>
                    {isAddingContact && (
                      <tr>
                        <td><input className="form-control form-control-sm" placeholder="Name" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} /></td>
                        <td><input className="form-control form-control-sm" placeholder="Email" value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })} /></td>
                        <td><input className="form-control form-control-sm" placeholder="Phone" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} /></td>
                        <td>
                          <select className="form-select form-select-sm" value={newContact.role} onChange={e => setNewContact({ ...newContact, role: e.target.value })}>
                            <option value="">Select role</option><option>Attorney</option><option>Case Manager</option><option>FDM (Final Decision Maker)</option><option>Paralegal</option><option>Support Staff</option>
                          </select>
                        </td>
                        <td>—</td>
                        <td>
                          <button className="btn btn-sm btn-success me-1" onClick={handleSaveNewContact}><Save size={12} /></button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsAddingContact(false)}><X size={12} /></button>
                        </td>
                      </tr>
                    )}
                    {contacts.map(contact => (
                      <tr key={contact.id}>
                        {editingContactId === contact.id ? (
                          <>
                            <td><input className="form-control form-control-sm" value={editContact.name} onChange={e => setEditContact({ ...editContact, name: e.target.value })} /></td>
                            <td><input className="form-control form-control-sm" value={editContact.email} onChange={e => setEditContact({ ...editContact, email: e.target.value })} /></td>
                            <td><input className="form-control form-control-sm" value={editContact.phone} onChange={e => setEditContact({ ...editContact, phone: e.target.value })} /></td>
                            <td>
                              <select className="form-select form-select-sm" value={editContact.role} onChange={e => setEditContact({ ...editContact, role: e.target.value })}>
                                <option>Attorney</option><option>Case Manager</option><option>FDM (Final Decision Maker)</option><option>Paralegal</option><option>Support Staff</option>
                              </select>
                            </td>
                            <td className="small">{contact.lastUpdatedDate}</td>
                            <td>
                              <button className="btn btn-sm btn-success me-1" onClick={() => handleSaveEditContact(contact.id)}><Save size={12} /></button>
                              <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingContactId(null)}><X size={12} /></button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="small fw-medium">{contact.name}</td>
                            <td className="small">{contact.email}</td>
                            <td className="small">{contact.phone}</td>
                            <td><span className={`badge ${getRoleBadgeClass(contact.role)}`}>{contact.role}</span></td>
                            <td className="small text-muted">{contact.lastUpdatedBy} — {contact.lastUpdatedDate}</td>
                            <td>
                              <button className="btn btn-sm btn-link p-0 me-2" onClick={() => handleEditContact(contact)}><Edit size={14} /></button>
                              <button className="btn btn-sm btn-link text-danger p-0" onClick={() => handleDeleteContact(contact.id)}><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Consent Tab */}
        {activeTab === "consent" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Terms and Consent</h5></div>
              <div className="card-body">
                {/* Terms of Service */}
                <div className="mb-3">
                  <button className="btn btn-light w-100 d-flex justify-content-between align-items-center" onClick={() => setTermsOpen(!termsOpen)}>
                    <span className="fw-medium">Terms of Service</span>
                    <ChevronDown size={16} className={termsOpen ? "rotate-180" : ""} style={{ transition: "transform 0.2s" }} />
                  </button>
                  {termsOpen && (
                    <div className="border rounded p-3 mt-2 small text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  )}
                </div>

                {/* Privacy Policy */}
                <div className="mb-4">
                  <button className="btn btn-light w-100 d-flex justify-content-between align-items-center" onClick={() => setPrivacyOpen(!privacyOpen)}>
                    <span className="fw-medium">Privacy Policy Summary</span>
                    <ChevronDown size={16} className={privacyOpen ? "rotate-180" : ""} style={{ transition: "transform 0.2s" }} />
                  </button>
                  {privacyOpen && (
                    <div className="border rounded p-3 mt-2">
                      <ul className="small text-muted mb-0">
                        <li>We collect minimal personal information necessary for service provision</li>
                        <li>Your data is encrypted and stored securely</li>
                        <li>We do not share your information with third parties without consent</li>
                        <li>You have the right to access, modify, or delete your data</li>
                        <li>Cookies are used only for essential functionality and analytics</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Consent Checkboxes */}
                <div className="mb-4">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="terms-consent" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
                    <label className="form-check-label small" htmlFor="terms-consent">
                      I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>. <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="email-notifications" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} />
                    <label className="form-check-label small" htmlFor="email-notifications">I agree to receive email notifications about account activity and important updates.</label>
                  </div>
                </div>

                {/* Communication Preferences */}
                <hr />
                <h5 className="fw-medium mb-3">Communication Preferences</h5>
                <div className="row g-3">
                  {[
                    { label: "Email Communications", value: emailCommunicationsConsent, setter: setEmailCommunicationsConsent, desc: "Receive case updates via email." },
                    { label: "Postal Mail Services", value: postalMailConsent, setter: setPostalMailConsent, desc: "Receive official documents via postal mail." },
                    { label: "SMS/Text Notifications", value: smsNotificationsConsent, setter: setSmsNotificationsConsent, desc: "Receive urgent notifications via text." },
                    { label: "Phone Calls", value: phoneCallsConsent, setter: setPhoneCallsConsent, desc: "Receive phone calls for urgent matters." },
                    { label: "Marketing Communications", value: marketingCommunicationsConsent, setter: setMarketingCommunicationsConsent, desc: "Receive information about new services." }
                  ].map((pref, i) => (
                    <div className="col-md-6" key={i}>
                      <label className="form-label small fw-medium">{pref.label}</label>
                      <select className="form-select form-select-sm" value={pref.value} onChange={e => pref.setter(e.target.value)}>
                        <option value="allow">Allow</option><option value="do-not-allow">Do Not Allow</option><option value="ask-each-time">Ask Each Time</option>
                      </select>
                      <p className="small text-muted mt-1">{pref.desc}</p>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary w-100 mt-4" disabled={!termsAccepted}>Update Consent Settings</button>
              </div>
            </div>
          </div>
        )}

        {/* Attorneys Tab */}
        {activeTab === "attorneys" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white"><h5 className="card-title mb-0 fw-semibold">Attorney Dashboard</h5></div>
              <div className="card-body">
                <p className="text-muted">Access the attorney dashboard to view and manage accepted cases.</p>
                <button className="btn btn-primary" onClick={() => navigate("/attorney/dashboard")}>Go to Attorney Dashboard</button>
              </div>
            </div>
          </div>
        )}

        {/* Child component tabs */}
        {activeTab === "testing" && <Dynamics365SinglePageDashboard />}
        {activeTab === "agency-test" && <AgencyTestScreen />}
        {activeTab === "test2" && <AgencyTest2Screen />}
        {activeTab === "test1" && <AgencyTest1Screen />}

        {/* Organization2 Tab */}
        {activeTab === "organization2" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-light border-bottom"><h5 className="card-title mb-0 fw-semibold">Entity Information</h5></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Department Name</label><input className="form-control" value="Department of Natural Resources" disabled /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Department Code</label><input className="form-control" value="DNR" disabled /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Parent Entity</label><input className="form-control" disabled placeholder="(None)" /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Participation Group</label><input className="form-control bg-light" value="State Entities" disabled /></div>
                      <div className="col-12"><label className="form-label small fw-medium text-secondary">Participation Type</label><input className="form-control bg-light" value="Department" disabled /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-header bg-light border-bottom"><h5 className="card-title mb-0 fw-semibold">Department Details</h5></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Case Coordinator</label><input className="form-control" value="John Smith" disabled /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">Department Attorney</label><input className="form-control" value="Jane Legal" disabled /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">FDM</label><input className="form-control" value="Michael Brown" disabled /></div>
                      <div className="col-6"><label className="form-label small fw-medium text-secondary">General Counsel</label><input className="form-control" value="Sarah White" disabled /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
