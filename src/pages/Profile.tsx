import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [createProfile, setCreateProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [accountProfile, setAccountProfile] = useState({
    organizationName: "",
    website: "",
    telephone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);

  const handleCreateChange = (field: string, value: string) => {
    setCreateProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAccountChange = (field: string, value: string) => {
    setAccountProfile(prev => ({ ...prev, [field]: value }));
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const formatZip = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/portal")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button variant="ghost" size="icon">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            My Profile Page
          </h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0">
            <TabsTrigger 
              value="profile" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              My Profile
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="consent" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Consent and Settings
            </TabsTrigger>
          </TabsList>

          {/* My Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="create-firstName">First Name *</Label>
                    <Input
                      id="create-firstName"
                      value={createProfile.firstName}
                      onChange={(e) => handleCreateChange("firstName", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-middleName">Middle Name</Label>
                    <Input
                      id="create-middleName"
                      value={createProfile.middleName}
                      onChange={(e) => handleCreateChange("middleName", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-lastName">Last Name *</Label>
                    <Input
                      id="create-lastName"
                      value={createProfile.lastName}
                      onChange={(e) => handleCreateChange("lastName", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-email">Email *</Label>
                    <Input
                      id="create-email"
                      type="email"
                      value={createProfile.email}
                      onChange={(e) => handleCreateChange("email", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-phone">Phone</Label>
                    <Input
                      id="create-phone"
                      value={createProfile.phone}
                      onChange={(e) => handleCreateChange("phone", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-organization">Organization</Label>
                    <Input
                      id="create-organization"
                      value={createProfile.organization}
                      onChange={(e) => handleCreateChange("organization", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-address">Address</Label>
                    <Input
                      id="create-address"
                      value={createProfile.address}
                      onChange={(e) => handleCreateChange("address", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-city">City</Label>
                    <Input
                      id="create-city"
                      value={createProfile.city}
                      onChange={(e) => handleCreateChange("city", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-state">State</Label>
                    <Input
                      id="create-state"
                      value={createProfile.state}
                      onChange={(e) => handleCreateChange("state", e.target.value)}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-zipCode">Zip Code</Label>
                    <Input
                      id="create-zipCode"
                      value={createProfile.zipCode}
                      onChange={(e) => handleCreateChange("zipCode", formatZip(e.target.value))}
                      className="bg-gray-50 border-gray-300"
                      placeholder="12345"
                    />
                  </div>
                </div>
                
                <Button className="w-full mt-6">Create Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Organization Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="account-organizationName">Organization Name *</Label>
                      <Input
                        id="account-organizationName"
                        value={accountProfile.organizationName}
                        onChange={(e) => handleAccountChange("organizationName", e.target.value)}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-website">Website</Label>
                      <Input
                        id="account-website"
                        type="url"
                        value={accountProfile.website}
                        onChange={(e) => handleAccountChange("website", e.target.value)}
                        className={`bg-gray-50 border-gray-300 ${
                          accountProfile.website && !validateURL(accountProfile.website) 
                            ? 'border-red-500' 
                            : ''
                        }`}
                        placeholder="https://example.com"
                      />
                      {accountProfile.website && !validateURL(accountProfile.website) && (
                        <p className="text-sm text-red-500">Please enter a valid URL</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-telephone">Telephone</Label>
                      <Input
                        id="account-telephone"
                        value={accountProfile.telephone}
                        onChange={(e) => handleAccountChange("telephone", formatPhone(e.target.value))}
                        className="bg-gray-50 border-gray-300"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-address">Address</Label>
                      <Input
                        id="account-address"
                        value={accountProfile.address}
                        onChange={(e) => handleAccountChange("address", e.target.value)}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-city">City</Label>
                      <Input
                        id="account-city"
                        value={accountProfile.city}
                        onChange={(e) => handleAccountChange("city", e.target.value)}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-state">State</Label>
                      <Input
                        id="account-state"
                        value={accountProfile.state}
                        onChange={(e) => handleAccountChange("state", e.target.value)}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-zipCode">Zip Code</Label>
                      <Input
                        id="account-zipCode"
                        value={accountProfile.zipCode}
                        onChange={(e) => handleAccountChange("zipCode", formatZip(e.target.value))}
                        className="bg-gray-50 border-gray-300"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6">Update Organization Information</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consent and Settings Tab */}
          <TabsContent value="consent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms and Consent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Terms of Service Section */}
                <div className="mb-4">
                  <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                      <span className="font-medium text-foreground">Terms of Service</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 border border-border rounded-md bg-white">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Privacy Policy Section */}
                <div className="mb-6">
                  <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                      <span className="font-medium text-foreground">Privacy Policy Summary</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${privacyOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 border border-border rounded-md bg-white">
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>We collect minimal personal information necessary for service provision</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Your data is encrypted and stored securely using industry standards</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>We do not share your information with third parties without consent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>You have the right to access, modify, or delete your data at any time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Cookies are used only for essential functionality and analytics</span>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms-consent"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms-consent" className="text-sm text-foreground leading-relaxed">
                      I agree to the{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-primary hover:text-primary-hover underline">
                            Terms of Service
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Terms of Service</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              Full terms of service would be displayed here in a real application.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {" "}and{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-primary hover:text-primary-hover underline">
                            Privacy Policy
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              Full privacy policy would be displayed here in a real application.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      . <span className="text-destructive">*</span>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={(checked) => setEmailNotifications(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="email-notifications" className="text-sm text-foreground leading-relaxed">
                      I agree to receive email notifications about account activity and important updates. 
                      You can unsubscribe at any time.
                    </Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <Button
                    disabled={!termsAccepted}
                    className="w-full h-10"
                  >
                    Update Consent Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;