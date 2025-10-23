import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/shared/Header";

const DivisionDetails = () => {
  const { divisionId } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched based on divisionId
  const divisionData: Record<string, any> = {
    "office-of-forestry": {
      name: "Office of Forestry",
      city: "Springfield",
      phone: "(217) 555-2100",
      primaryContact: "Rachel Evans",
      email: "rachel.evans@dnr.illinois.gov",
      address: "1 Natural Resources Way, Springfield, IL 62702",
      description: "The Office of Forestry manages and protects Illinois' forest resources, promoting sustainable forestry practices and conservation.",
      staff: [
        { name: "Rachel Evans", role: "Division Chief", email: "rachel.evans@dnr.illinois.gov", phone: "(217) 555-2100" },
        { name: "Mike Johnson", role: "Forest Ecologist", email: "mike.johnson@dnr.illinois.gov", phone: "(217) 555-2101" },
        { name: "Sarah Williams", role: "Conservation Specialist", email: "sarah.williams@dnr.illinois.gov", phone: "(217) 555-2102" },
      ],
    },
    "office-of-oil-gas": {
      name: "Office of Oil & Gas Management",
      city: "Springfield",
      phone: "(217) 555-2200",
      primaryContact: "Tom Reyes",
      email: "tom.reyes@dnr.illinois.gov",
      address: "1 Natural Resources Way, Springfield, IL 62702",
      description: "The Office of Oil & Gas Management regulates oil and gas exploration, production, and operations in Illinois.",
      staff: [
        { name: "Tom Reyes", role: "Division Chief", email: "tom.reyes@dnr.illinois.gov", phone: "(217) 555-2200" },
        { name: "Jennifer Lee", role: "Petroleum Engineer", email: "jennifer.lee@dnr.illinois.gov", phone: "(217) 555-2201" },
        { name: "David Martinez", role: "Compliance Officer", email: "david.martinez@dnr.illinois.gov", phone: "(217) 555-2202" },
      ],
    },
    "office-of-water-resources": {
      name: "Office of Water Resources",
      city: "Springfield",
      phone: "(217) 555-2300",
      primaryContact: "Priya Nair",
      email: "priya.nair@dnr.illinois.gov",
      address: "1 Natural Resources Way, Springfield, IL 62702",
      description: "The Office of Water Resources manages Illinois' water supply and quality, overseeing programs for water conservation and protection.",
      staff: [
        { name: "Priya Nair", role: "Division Chief", email: "priya.nair@dnr.illinois.gov", phone: "(217) 555-2300" },
        { name: "Robert Chen", role: "Hydrologist", email: "robert.chen@dnr.illinois.gov", phone: "(217) 555-2301" },
        { name: "Emily Davis", role: "Water Quality Specialist", email: "emily.davis@dnr.illinois.gov", phone: "(217) 555-2302" },
      ],
    },
  };

  const division = divisionData[divisionId || ""] || divisionData["office-of-forestry"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/profile")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="space-y-6">
          {/* Header Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{division.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{division.description}</p>
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{division.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{division.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Contact</p>
                      <p className="font-medium">{division.primaryContact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{division.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Directory */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {division.staff.map((member: any, index: number) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DivisionDetails;
