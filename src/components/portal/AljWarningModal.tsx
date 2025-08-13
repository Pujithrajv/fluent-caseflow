import { useState, useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AljWarningModalProps {
  onAcknowledge: () => void;
}

export const AljWarningModal = ({ onAcknowledge }: AljWarningModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if warning has been acknowledged in this session
    const hasAcknowledged = sessionStorage.getItem('aljWarningAck') === 'true';
    if (!hasAcknowledged) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    sessionStorage.setItem('aljWarningAck', 'true');
    setIsOpen(false);
    onAcknowledge();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-2xl max-h-[75vh] p-0 gap-0 font-['Segoe_UI',system-ui,sans-serif]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="warning-title"
        aria-describedby="warning-content"
      >
        {/* Header with logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-gray-600" />
            <span className="text-lg font-medium text-gray-900">
              Illinois Bureau of Administrative Hearings
            </span>
          </div>
        </div>

        {/* Warning banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <h3 
            id="warning-title" 
            className="text-lg font-bold text-amber-800"
          >
            System Use Warning
          </h3>
        </div>

        {/* Scrollable content */}
        <div 
          id="warning-content"
          className="overflow-y-auto max-h-96 p-6 text-sm leading-relaxed text-gray-700 space-y-4"
        >
          <p className="font-medium text-gray-900">
            Illinois Bureau of Administrative Hearings
          </p>
          
          <p>
            <strong>WARNING! THIS SYSTEM CONTAINS U.S. GOVERNMENT INFORMATION. BY USING THIS INFORMATION SYSTEM, YOU CONSENT TO SYSTEM MONITORING FOR LAW ENFORCEMENT AND OTHER AUTHORIZED PURPOSES.</strong>
          </p>

          <p>
            <strong>UNAUTHORIZED OR IMPROPER USE OF, OR ACCESS TO, THIS SYSTEM MAY SUBJECT YOU TO STATE AND FEDERAL CRIMINAL PROSECUTION AND PENALTIES, AS WELL AS CIVIL PENALTIES. AT ANY TIME, THE GOVERNMENT MAY INTERCEPT, SEARCH, AND SEIZE ANY COMMUNICATION OR DATA TRANSITING OR STORED ON THIS SYSTEM.</strong>
          </p>

          <p>
            <strong>YOU MAY HAVE ACCESS TO CONFIDENTIAL OR PROPRIETARY INFORMATION ("CONFIDENTIAL INFORMATION"), INCLUDING, BUT NOT LIMITED TO, PERSONALLY IDENTIFIABLE INFORMATION (PII), PROTECTED HEALTH INFORMATION (PHI) UNDER HIPAA, OR OTHER SENSITIVE CASE INFORMATION. AUTHORIZED USE OF THIS SYSTEM IS FOR CASE MANAGEMENT, ADMINISTRATIVE HEARING OPERATIONS, AND RELATED OFFICIAL PURPOSES ONLY.</strong>
          </p>

          <p>
            <strong>BY CLICKING "OK," YOU ACKNOWLEDGE AND AGREE THAT ALL CONFIDENTIAL INFORMATION OR DATA MAY NOT BE RELEASED, COPIED, OR DISCLOSED, IN WHOLE OR IN PART, UNLESS PROPERLY AUTHORIZED BY THE ILLINOIS BUREAU OF ADMINISTRATIVE HEARINGS OR OTHER GOVERNING STATE AGENCY.</strong>
          </p>
        </div>

        {/* Footer with action button */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <Button
            onClick={handleAcknowledge}
            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            autoFocus
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};