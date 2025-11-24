import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare, HandMetal, Gavel, ExternalLink, HelpCircle } from "lucide-react";
const MotionDetails = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Header Section with Party Information */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Discovery: Deposition  
            </h1>
            
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <a href="#" className="text-primary hover:underline">Cases</a>
              <span className="mx-2">/</span>
              <a href="#" className="text-primary hover:underline">DBE-EC-02025-004</a>
              <span className="mx-2">/</span>
              <a href="#" className="text-primary hover:underline">Discovery</a>
              <span className="mx-2">/</span>
              <span>Response</span>
            </div>
            
            <Badge className="bg-blue-600 text-white hover:bg-blue-700">
              Awaiting Response
            </Badge>
          </div>

          {/* Party Information */}
          <div className="gap-4 flex flex-row">
          <Card className="w-64">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Requesting Party</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="text-muted-foreground">Department of Natural Resources</p>
              <p>First Party: <span className="font-medium">Complainant</span></p>
              <p>Dept#: <span className="font-medium">S14-7311-0025</span></p>
            </CardContent>
          </Card>

          <Card className="w-64">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Responding Party</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="text-muted-foreground">Tommy Welldorf</p>
              <p>Second Party: <span className="font-medium">Respondent</span></p>
              <p>Attorney: <span className="font-medium">Dell Spington</span></p>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="motion-details" className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0 w-full">
            <TabsTrigger value="motion-details" className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted px-6 py-4 transition-colors">
              <FileText className="mr-2 h-5 w-5" />
              Discovery Details
            </TabsTrigger>
            <TabsTrigger value="request" className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted px-6 py-4 transition-colors">
              <MessageSquare className="mr-2 h-5 w-5" />
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted px-6 py-4 transition-colors">
              <HandMetal className="mr-2 h-5 w-5" />
              Response
            </TabsTrigger>
          </TabsList>

          <TabsContent value="motion-details" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Card - Request Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Request Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Request Group</p>
                    <p className="text-base">Discovery</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Request Type</p>
                    <p className="text-base">Deposition</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Request Summary</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                      vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus 
                      leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus 
                      bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut 
                      hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra 
                      inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque 
                      faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis 
                      convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus 
                      nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc 
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Right Card - Motion to Compel Discovery Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">Deposition Questions<FileText className="mr-2 h-5 w-5 text-primary" />
                    Motion to Compel Discovery Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      What did you ask the other side to give you?
                    </p>
                    <p className="text-base">jane doe     7894561230     janedoe@gmail.com                               </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      why is their deposition necessary ?     
                    </p>
                    <p className="text-base">Other (please explain)</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      can testimony be gotten by interrogatories ?      
                    </p>
                    <p className="text-base">Yes</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      

                    </p>
                    <p className="text-base">
                      

                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      

                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      

                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="request" className="mt-6">
            <div className="grid grid-cols-[400px_1fr] gap-6">
              {/* Left Sidebar - Request Details */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Request Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-3">Requesting Party</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Department of Natural Resources</p>
                      <p>First Party: <span className="font-medium">Complainant</span></p>
                      <p>Case Manager: <span className="font-medium">Fred Appleton</span></p>
                      <p>General Counsel: <span className="font-medium">Bob Standishn</span></p>
                      <p>Case Coordinator: <span className="font-medium">Dell Spington</span></p>
                      <p>Decision Maker: <span className="font-medium">Sara Mc Murry</span></p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1">Requesting Party Due Date</p>
                    <p className="text-sm">November 13, 2025</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1">ALJ Ruling Date</p>
                    <p className="text-sm">November 24, 2025</p>
                  </div>
                </CardContent>
              </Card>

              {/* Right Content Area */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Comments Section */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Comments</label>
                    <textarea className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="Enter notes" />
                  </div>

                  {/* Document Upload Section */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Document Upload</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                      <p className="text-base font-medium mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
                      <Button variant="outline" className="mt-2">Browse Files</Button>
                    </div>
                  </div>

                  {/* Request Documents Table */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Request Documents</label>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 text-sm font-semibold">Document Name</th>
                            <th className="text-left p-3 text-sm font-semibold">Type</th>
                            <th className="text-left p-3 text-sm font-semibold">Uploaded By</th>
                            <th className="text-left p-3 text-sm font-semibold">Upload Date</th>
                            <th className="text-left p-3 text-sm font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">17AC23-Compel-Discovery.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>Attorney Motion Request</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">Bob Standish</td>
                            <td className="p-3 text-sm">2025-10-15</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">Additional_Documentation.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>Supporting Evidence</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">Sara Mc Murry</td>
                            <td className="p-3 text-sm">2025-10-15</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">Motion-to-Compel-Discovery.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>System Generated</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">CMS System</td>
                            <td className="p-3 text-sm">2025-10-15</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">Sequential-Briefing-Schedule-Order.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>System Generated</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">CMS System</td>
                            <td className="p-3 text-sm">2025-10-15</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Request Completed On */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Request Completed On</label>
                    <input type="text" className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="mm/dd/yyyy" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="response" className="mt-6">
            <div className="grid grid-cols-[400px_1fr] gap-6">
              {/* Left Sidebar - Response Details */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Response Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-3">Responding Party</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Tommy Welldorf</p>
                      <p>Second Party: <span className="font-medium">Respondent</span></p>
                      <p>Attorney: <span className="font-medium">Dell Spington</span></p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1">Responding Party Due Date</p>
                    <p className="text-sm">November 13, 2025</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1">ALJ Ruling Date</p>
                    <p className="text-sm">November 24, 2025</p>
                  </div>
                </CardContent>
              </Card>

              {/* Right Content Area */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Response
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Comments Section */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Comments</label>
                    <textarea className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="Enter notes" />
                  </div>

                  {/* Document Upload Section */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Document Upload</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                      <p className="text-base font-medium mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
                      <Button variant="outline" className="mt-2">Browse Files</Button>
                    </div>
                  </div>

                  {/* Response Documents Table */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Response Documents</label>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 text-sm font-semibold">Document Name</th>
                            <th className="text-left p-3 text-sm font-semibold">Type</th>
                            <th className="text-left p-3 text-sm font-semibold">Uploaded By</th>
                            <th className="text-left p-3 text-sm font-semibold">Upload Date</th>
                            <th className="text-left p-3 text-sm font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">Attorney-Response.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>Attorney Motion Request</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">Dell Spington</td>
                            <td className="p-3 text-sm">2025-10-21</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-sm">
                              <a href="#" className="text-primary hover:underline">Support-Documentation.pdf</a>
                            </td>
                            <td className="p-3 text-sm">
                              <select className="text-sm border-0 bg-muted rounded px-2 py-1">
                                <option>Supporting Evidence</option>
                              </select>
                            </td>
                            <td className="p-3 text-sm">Tommy Welldorf</td>
                            <td className="p-3 text-sm">2025-10-25</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Response Complete Checkbox */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Response Complete</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="response-complete" className="h-4 w-4 rounded border-input" />
                      <label htmlFor="response-complete" className="text-sm">Yes</label>
                    </div>
                  </div>

                  {/* Response Completed On */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Response Completed On</label>
                    <input type="text" className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="mm/dd/yyyy" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default MotionDetails;