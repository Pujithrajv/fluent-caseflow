import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const [searchProfile, setSearchProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    notes: ""
  });

  const [createProfile, setCreateProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    notes: ""
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateChange = (field: string, value: string) => {
    setCreateProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/34438d6b-1c2f-4220-9e05-ab41b2d386d9.png" 
            alt="Illinois Bureau of Administrative Hearings" 
            className="h-16 w-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-foreground">
            My Profile Page
          </h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-center">
              My Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="text-center">
              Account
            </TabsTrigger>
            <TabsTrigger value="consent" className="text-center">
              Consent and Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Search Existing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Search Existing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="search-firstName" className="text-sm font-medium text-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="search-firstName"
                        value={searchProfile.firstName}
                        onChange={(e) => handleSearchChange("firstName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="search-middleName" className="text-sm font-medium text-foreground">
                        Middle Name
                      </Label>
                      <Input
                        id="search-middleName"
                        value={searchProfile.middleName}
                        onChange={(e) => handleSearchChange("middleName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="search-lastName" className="text-sm font-medium text-foreground">
                      Last Name *
                    </Label>
                    <Input
                      id="search-lastName"
                      value={searchProfile.lastName}
                      onChange={(e) => handleSearchChange("lastName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="search-email" className="text-sm font-medium text-foreground">
                      Email *
                    </Label>
                    <Input
                      id="search-email"
                      type="email"
                      value={searchProfile.email}
                      onChange={(e) => handleSearchChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="search-phone" className="text-sm font-medium text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="search-phone"
                      type="tel"
                      value={searchProfile.phone}
                      onChange={(e) => handleSearchChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="search-organization" className="text-sm font-medium text-foreground">
                      Organization
                    </Label>
                    <Input
                      id="search-organization"
                      value={searchProfile.organization}
                      onChange={(e) => handleSearchChange("organization", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="search-role" className="text-sm font-medium text-foreground">
                      Role
                    </Label>
                    <Input
                      id="search-role"
                      value={searchProfile.role}
                      onChange={(e) => handleSearchChange("role", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                    Search Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Create New */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Create New</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="create-firstName" className="text-sm font-medium text-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="create-firstName"
                        value={createProfile.firstName}
                        onChange={(e) => handleCreateChange("firstName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="create-middleName" className="text-sm font-medium text-foreground">
                        Middle Name
                      </Label>
                      <Input
                        id="create-middleName"
                        value={createProfile.middleName}
                        onChange={(e) => handleCreateChange("middleName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="create-lastName" className="text-sm font-medium text-foreground">
                      Last Name *
                    </Label>
                    <Input
                      id="create-lastName"
                      value={createProfile.lastName}
                      onChange={(e) => handleCreateChange("lastName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="create-email" className="text-sm font-medium text-foreground">
                      Email *
                    </Label>
                    <Input
                      id="create-email"
                      type="email"
                      value={createProfile.email}
                      onChange={(e) => handleCreateChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="create-phone" className="text-sm font-medium text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="create-phone"
                      type="tel"
                      value={createProfile.phone}
                      onChange={(e) => handleCreateChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="create-organization" className="text-sm font-medium text-foreground">
                      Organization
                    </Label>
                    <Input
                      id="create-organization"
                      value={createProfile.organization}
                      onChange={(e) => handleCreateChange("organization", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="create-role" className="text-sm font-medium text-foreground">
                      Role
                    </Label>
                    <Input
                      id="create-role"
                      value={createProfile.role}
                      onChange={(e) => handleCreateChange("role", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                    Create Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Notes Section - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes..."
                    value={searchProfile.notes}
                    onChange={(e) => handleSearchChange("notes", e.target.value)}
                    className="mt-1 min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Account settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Consent and Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Consent and settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;