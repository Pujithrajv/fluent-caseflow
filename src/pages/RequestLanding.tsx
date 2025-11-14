import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function RequestLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Submissions and Requests
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Submit and manage your case-related requests including motions, exhibits, and discovery matters. 
            Track their status and receive rulings in one centralized location.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Submit Requests</h3>
                <p className="text-sm text-muted-foreground">
                  File motions, exhibits, and discovery requests with all required documentation
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor the status of your submissions in real-time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Receive Rulings</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified when decisions are made on your requests
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Stay Informed</h3>
                <p className="text-sm text-muted-foreground">
                  Receive alerts and updates on important deadlines
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Types Section */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Request Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  Motions
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• Motion for Summary Judgment</li>
                  <li>• Motion to Dismiss</li>
                  <li>• Motion for Extension</li>
                  <li>• Motion for Continuance</li>
                  <li>• And more...</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  Exhibits
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• Documentary Evidence</li>
                  <li>• Physical Items</li>
                  <li>• Photographs</li>
                  <li>• Digital Media</li>
                  <li>• Expert Reports</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  Discovery
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• Interrogatories</li>
                  <li>• Document Production</li>
                  <li>• Depositions</li>
                  <li>• Inspections</li>
                  <li>• Admissions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ready to Submit a Request?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our guided wizard will walk you through the process step by step, 
                ensuring all required information is provided.
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/demo-request/wizard")}
              >
                Create New Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
