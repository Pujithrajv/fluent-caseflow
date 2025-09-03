import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit, Eye, FileText, Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface RequestReviewSubmitTabProps {
  data: any;
  onPrevious?: () => void;
  onSubmit?: () => void;
}

export function RequestReviewSubmitTab({ data, onPrevious, onSubmit }: RequestReviewSubmitTabProps) {
  // Generate reference number and current date
  const referenceNumber = `REQ-${Date.now().toString().slice(-6)}`;
  const submissionDate = format(new Date(), "PPP");

  // Helper function to get display value
  const getDisplayValue = (value: any) => {
    if (!value || value === '') return 'Not provided';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object' && value.name) return value.name;
    return value;
  };

  // Get request type specific details
  const getRequestDetails = () => {
    const { requestGroup, requestType } = data;
    
    if (requestGroup === 'motion') {
      return {
        title: 'Motion Details',
        fields: [
          { label: 'Motion Type', value: requestType },
          { label: 'Consulted Other Side', value: data.consultOtherSide },
          { label: 'Outcome', value: data.outcome }
        ]
      };
    }
    
    if (requestGroup === 'exhibit') {
      const fields = [
        { label: 'Exhibit Type', value: requestType }
      ];
      
      if (requestType === 'Oversized/Voluminous Document') {
        fields.push({ label: 'Document Title', value: data.documentTitle });
      }
      
      if (requestType === 'Physical Item') {
        fields.push(
          { label: 'Category', value: data.physicalItemCategory },
          { label: 'Item Name', value: data.itemName },
          { label: 'Description', value: data.itemDescription },
          { label: 'Estimated Size', value: data.estimatedSize },
          { label: 'Estimated Weight', value: data.estimatedWeight },
          { label: 'Evidence Justification', value: data.evidenceJustification }
        );
      }
      
      // Content review questions for all exhibit types except Physical Item
      if (requestType !== 'Physical Item') {
        fields.push(
          { label: 'Appropriate for Public Viewing', value: data.hasInappropriateContent === 'yes' ? 'Yes' : 'No' },
          { label: 'Contains PII', value: data.hasPII === 'yes' ? 'Yes' : 'No' },
          { label: 'Contains Confidential Information', value: data.hasConfidentialInfo === 'yes' ? 'Yes' : 'No' }
        );
        
        if (data.hasConfidentialInfo === 'yes') {
          fields.push(
            { label: 'Has Protective Order', value: data.hasProtectiveOrder === 'yes' ? 'Yes' : 'No' }
          );
          if (data.hasProtectiveOrder === 'yes') {
            fields.push({ label: 'Exhibit ID Number', value: data.exhibitIdNumber });
          }
        }
      }
      
      return {
        title: 'Exhibit Details',
        fields
      };
    }
    
    // For other request types (discovery, certificate, pleading, notices)
    return {
      title: `${requestGroup.charAt(0).toUpperCase() + requestGroup.slice(1)} Details`,
      fields: [
        { label: 'Type', value: requestType },
        { label: 'Description', value: data.description }
      ]
    };
  };

  const requestDetails = getRequestDetails();

  // Mock uploaded documents data
  const uploadedDocuments = data.uploadedDocuments || [
    { name: 'Request Document.pdf', type: 'Primary Document', size: '2.3 MB', uploadedDate: new Date() },
    { name: 'Supporting Evidence.pdf', type: 'Supporting Document', size: '1.8 MB', uploadedDate: new Date() }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Request Information */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Request Information</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Request Group</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.requestGroup)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Request Type</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.requestType)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Reference Number</p>
              <p className="font-medium font-fluent">{referenceNumber}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Submission Date</p>
              <p className="font-medium font-fluent">{submissionDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">{requestDetails.title}</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {requestDetails.fields.map((field, index) => (
              <div key={index}>
                <p className="text-sm font-fluent text-muted-foreground">{field.label}</p>
                <p className="font-medium font-fluent">{getDisplayValue(field.value)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Documents Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-fluent">Uploaded Documents</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {uploadedDocuments.length > 0 ? (
            <div className="space-y-4">
              {uploadedDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium font-fluent">{doc.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                        </span>
                        <span>{doc.size}</span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(doc.uploadedDate, "MMM dd, yyyy")}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-fluent">No documents uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {(onSubmit || onPrevious) && (
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            Previous
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onSubmit}
            disabled={!onSubmit}
          >
            Submit Request
          </Button>
        </div>
      )}
    </div>
  );
}