import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, Camera, Mic, Package, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ExhibitTypeTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onNext: () => void;
  onSkipToUpload: () => void;
  onSkipToEnd: () => void;
}

const exhibitTypes = [
  { value: "document", label: "Document", icon: FileText },
  { value: "oversized", label: "Oversized or Voluminous Document", icon: FileText },
  { value: "photograph", label: "Photograph", icon: Camera },
  { value: "recording", label: "Recording", icon: Mic },
  { value: "physical", label: "Physical Item", icon: Package }
];

const physicalItemCategories = [
  "Electronic Device",
  "Mechanical Component",
  "Chemical Sample",
  "Biological Sample",
  "Tool or Equipment",
  "Weapon",
  "Clothing/Textile",
  "Document (Original)",
  "Other"
];

export function ExhibitTypeTab({ onDataChange, data, onNext, onSkipToUpload, onSkipToEnd }: ExhibitTypeTabProps) {
  const [selectedType, setSelectedType] = useState(data.exhibitType || "");
  const [documentTitle, setDocumentTitle] = useState(data.documentTitle || "");
  const [physicalItemData, setPhysicalItemData] = useState({
    category: data.physicalItemCategory || "",
    name: data.physicalItemName || "",
    description: data.physicalItemDescription || "",
    estimatedSize: data.estimatedSize || "",
    estimatedWeight: data.estimatedWeight || "",
    isBioChemRadHazard: data.isBioChemRadHazard || "",
    hasLithiumBattery: data.hasLithiumBattery || "",
    canBeDeliveredByCourier: data.canBeDeliveredByCourier || "",
    requiresSpecialHandling: data.requiresSpecialHandling || "",
    specialHandlingDescription: data.specialHandlingDescription || "",
    justificationText: data.justificationText || ""
  });

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onDataChange({ exhibitType: type });
  };

  const handleDocumentTitleChange = (title: string) => {
    setDocumentTitle(title);
    onDataChange({ documentTitle: title });
  };

  const handlePhysicalItemChange = (field: string, value: string) => {
    const updatedData = { ...physicalItemData, [field]: value };
    setPhysicalItemData(updatedData);
    onDataChange(updatedData);
  };

  const handleContinue = () => {
    if (selectedType === "oversized") {
      // For oversized documents, assign exhibit ID and send email
      onDataChange({ 
        exhibitId: `EX-${Date.now()}`,
        status: "oversized_submitted"
      });
      onSkipToEnd();
    } else if (selectedType === "physical") {
      // For physical items, generate request and skip to end
      onDataChange({ 
        status: "physical_item_request_submitted"
      });
      onSkipToEnd();
    } else if (["document", "photograph", "recording"].includes(selectedType)) {
      onSkipToUpload();
    }
  };

  const canContinue = () => {
    if (!selectedType) return false;
    
    if (selectedType === "document" || selectedType === "oversized") {
      return documentTitle.trim() !== "";
    }
    
    if (selectedType === "physical") {
      return physicalItemData.category && 
             physicalItemData.name && 
             physicalItemData.description &&
             physicalItemData.isBioChemRadHazard &&
             physicalItemData.hasLithiumBattery &&
             physicalItemData.canBeDeliveredByCourier &&
             physicalItemData.requiresSpecialHandling &&
             physicalItemData.justificationText;
    }
    
    return true; // For photograph and recording
  };

  return (
    <div className="space-y-6">
      {/* Exhibit Type Selection */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Package className="h-5 w-5 text-primary" />
            <span>Select Exhibit Type (Item Class)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full shadow-fluent-8 border-input-border">
              <SelectValue placeholder="Choose the type of exhibit you're submitting" />
            </SelectTrigger>
            <SelectContent>
              {exhibitTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Type-Specific Forms */}
      {(selectedType === "document" || selectedType === "oversized") && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <CardTitle className="font-fluent">Document Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="document-title" className="font-fluent">Document Title *</Label>
                <Input
                  id="document-title"
                  value={documentTitle}
                  onChange={(e) => handleDocumentTitleChange(e.target.value)}
                  placeholder="Enter a descriptive title for this document"
                  className="mt-1 shadow-fluent-8 border-input-border"
                />
              </div>
              {selectedType === "oversized" && (
                <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium font-fluent text-foreground">Oversized Document Process</p>
                      <p className="text-sm font-fluent text-muted-foreground mt-1">
                        An exhibit ID will be automatically assigned to this document title. 
                        You will receive an email with further instructions for submitting oversized or voluminous documents.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedType === "physical" && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <CardTitle className="font-fluent">Physical Item Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="physical-category" className="font-fluent">Category of Physical Item *</Label>
              <Select value={physicalItemData.category} onValueChange={(value) => handlePhysicalItemChange("category", value)}>
                <SelectTrigger className="mt-1 shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {physicalItemCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item-name" className="font-fluent">Name of Item *</Label>
                <Input
                  id="item-name"
                  value={physicalItemData.name}
                  onChange={(e) => handlePhysicalItemChange("name", e.target.value)}
                  placeholder="Enter item name"
                  className="mt-1 shadow-fluent-8 border-input-border"
                />
              </div>
              <div>
                <Label htmlFor="estimated-size" className="font-fluent">Estimated Size</Label>
                <Input
                  id="estimated-size"
                  value={physicalItemData.estimatedSize}
                  onChange={(e) => handlePhysicalItemChange("estimatedSize", e.target.value)}
                  placeholder="e.g., 12 x 8 x 6 inches"
                  className="mt-1 shadow-fluent-8 border-input-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="item-description" className="font-fluent">Description *</Label>
              <Textarea
                id="item-description"
                value={physicalItemData.description}
                onChange={(e) => handlePhysicalItemChange("description", e.target.value)}
                placeholder="Provide a detailed description of the item"
                className="mt-1 shadow-fluent-8 border-input-border"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="estimated-weight" className="font-fluent">Estimated Weight</Label>
              <Input
                id="estimated-weight"
                value={physicalItemData.estimatedWeight}
                onChange={(e) => handlePhysicalItemChange("estimatedWeight", e.target.value)}
                placeholder="e.g., 2.5 lbs"
                className="mt-1 shadow-fluent-8 border-input-border"
              />
            </div>

            {/* Safety Questions */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-semibold font-fluent text-foreground">Safety and Handling Questions</h4>
              
              <div>
                <Label className="font-fluent font-medium">Is it a biological, chemical, or radiation hazard? *</Label>
                <RadioGroup 
                  value={physicalItemData.isBioChemRadHazard} 
                  onValueChange={(value) => handlePhysicalItemChange("isBioChemRadHazard", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hazard-yes" />
                    <Label htmlFor="hazard-yes" className="font-fluent">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hazard-no" />
                    <Label htmlFor="hazard-no" className="font-fluent">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="font-fluent font-medium">Does it contain a permanently mounted lithium battery? *</Label>
                <RadioGroup 
                  value={physicalItemData.hasLithiumBattery} 
                  onValueChange={(value) => handlePhysicalItemChange("hasLithiumBattery", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="battery-yes" />
                    <Label htmlFor="battery-yes" className="font-fluent">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="battery-no" />
                    <Label htmlFor="battery-no" className="font-fluent">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="font-fluent font-medium">Can it be delivered by courier (USPS, FedEx, UPS, Common Carrier)? *</Label>
                <RadioGroup 
                  value={physicalItemData.canBeDeliveredByCourier} 
                  onValueChange={(value) => handlePhysicalItemChange("canBeDeliveredByCourier", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="courier-yes" />
                    <Label htmlFor="courier-yes" className="font-fluent">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="courier-no" />
                    <Label htmlFor="courier-no" className="font-fluent">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="font-fluent font-medium">Does it require special handling/storage/maintenance? *</Label>
                <RadioGroup 
                  value={physicalItemData.requiresSpecialHandling} 
                  onValueChange={(value) => handlePhysicalItemChange("requiresSpecialHandling", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="special-yes" />
                    <Label htmlFor="special-yes" className="font-fluent">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="special-no" />
                    <Label htmlFor="special-no" className="font-fluent">No</Label>
                  </div>
                </RadioGroup>
                
                {physicalItemData.requiresSpecialHandling === "yes" && (
                  <div className="mt-3">
                    <Label htmlFor="special-description" className="font-fluent">Please describe special handling requirements:</Label>
                    <Textarea
                      id="special-description"
                      value={physicalItemData.specialHandlingDescription}
                      onChange={(e) => handlePhysicalItemChange("specialHandlingDescription", e.target.value)}
                      placeholder="Describe the special handling, storage, or maintenance requirements"
                      className="mt-1 shadow-fluent-8 border-input-border"
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Justification */}
            <div className="border-t pt-4">
              <Label htmlFor="justification" className="font-fluent font-medium">
                Please explain why the Physical Item should be used as evidence instead of photographs: *
              </Label>
              <Textarea
                id="justification"
                value={physicalItemData.justificationText}
                onChange={(e) => handlePhysicalItemChange("justificationText", e.target.value)}
                placeholder="Explain why the physical item is necessary as evidence rather than photographs"
                className="mt-2 shadow-fluent-8 border-input-border"
                rows={4}
              />
            </div>

            {/* Upload for Physical Item Photo */}
            <div className="border-t pt-4">
              <Label className="font-fluent font-medium">Upload one photograph of the item:</Label>
              <div className="mt-2 rounded-lg border-2 border-dashed border-muted p-4 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-fluent text-muted-foreground">
                  Click to upload a photograph of the physical item
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      {selectedType && (
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={!canContinue()}
            className="font-fluent"
          >
            {selectedType === "oversized" ? "Submit Oversized Document Request" :
             selectedType === "physical" ? "Submit Physical Item Request" :
             "Continue to Questions"}
          </Button>
        </div>
      )}
    </div>
  );
}