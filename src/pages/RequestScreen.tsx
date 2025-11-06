import { Header } from "@/components/shared/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RequestScreen() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Requests</h1>
            <p className="text-muted-foreground mt-1">Manage and track your requests</p>
          </div>
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Request
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Request management content will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
