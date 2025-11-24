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
            <TabsTrigger value="ruling" className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted px-6 py-4 transition-colors">
              <Gavel className="mr-2 h-5 w-5" />
              Ruling
            </TabsTrigger>
            <TabsTrigger value="process" className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted px-6 py-4 transition-colors">
              <ExternalLink className="mr-2 h-5 w-5" />
              Process
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
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Request content will be displayed here
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="mt-6">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Response content will be displayed here
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ruling" className="mt-6">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Ruling content will be displayed here
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="mt-6">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Process content will be displayed here
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default MotionDetails;