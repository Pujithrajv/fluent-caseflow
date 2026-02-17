import { Header } from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Link as LinkIcon } from "lucide-react";

interface DocketEntry {
  date: string;
  time: string;
  role: "Clerk" | "Administrative Law Judge" | "System" | "Petitioner Attorney" | "Respondent Attorney" | "Petitioner" | "Bureau Staff" | "Referring Agency";
  person?: string;
  title: string;
  description?: string;
  document?: string;
  link?: string;
  serviceMethod?: string;
  createdBy?: string;
  manualEntry?: boolean;
  internalOnly?: boolean;
  freeText?: boolean;
  headerColor: string;
}

const docketEntries: DocketEntry[] = [
  // INTAKE
  { date: "January 2, 2026", time: "9:15 AM CT", role: "System", title: "Case Referred for Adjudication", headerColor: "bg-gray-500" },
  { date: "January 3, 2026", time: "10:05 AM CT", role: "Clerk", person: "Sandra Lee", title: "Case Rejected by Clerk", description: "Reason: Missing required initiating documents", headerColor: "bg-[#1e3a5f]" },
  { date: "January 6, 2026", time: "11:20 AM CT", role: "Clerk", person: "Sandra Lee", title: "Intake Correction Received", headerColor: "bg-[#1e3a5f]" },
  { date: "January 7, 2026", time: "2:45 PM CT", role: "Clerk", person: "Sandra Lee", title: "Case Accepted by Clerk", document: "Initiating_Complaint.pdf", headerColor: "bg-[#1e3a5f]" },
  { date: "January 8, 2026", time: "9:00 AM CT", role: "System", title: "Administrative Law Judge Assigned", headerColor: "bg-gray-500" },
  { date: "January 8, 2026", time: "11:00 AM CT", role: "Administrative Law Judge", person: "Rebecca Lawson", title: "Assignment Accepted", headerColor: "bg-[#1e3a5f]" },
  { date: "January 9, 2026", time: "4:30 PM CT", role: "Administrative Law Judge", person: "Rebecca Lawson", title: "Procedural Checklist Completed – Ready to Proceed", headerColor: "bg-[#1e3a5f]" },
  // NOTICES / EVENTS
  { date: "January 15, 2026", time: "1:30 PM CT", role: "Clerk", title: "Initial Case Management Conference Scheduled", headerColor: "bg-[#1e3a5f]" },
  { date: "January 15, 2026", time: "4:00 PM CT", role: "Administrative Law Judge", title: "Notice Entered", document: "Notice_ICMC.pdf", headerColor: "bg-[#c5930a]" },
  { date: "January 16, 2026", time: "8:15 AM CT", role: "Clerk", title: "Notice Served", serviceMethod: "Email + Portal", headerColor: "bg-[#1e3a5f]" },
  { date: "January 28, 2026", time: "10:00 AM CT", role: "Administrative Law Judge", title: "Conference Conducted", headerColor: "bg-[#1e3a5f]" },
  { date: "January 28, 2026", time: "2:00 PM CT", role: "System", title: "Recording Available", link: "ICMC_Recording.mp4", headerColor: "bg-[#c5930a]" },
  { date: "January 29, 2026", time: "9:00 AM CT", role: "Administrative Law Judge", title: "Conference Report Entered", document: "Conference_Report.pdf", headerColor: "bg-[#c5930a]" },
  { date: "January 29, 2026", time: "1:30 PM CT", role: "Clerk", title: "Conference Report Served", headerColor: "bg-[#1e3a5f]" },
  { date: "February 5, 2026", time: "3:00 PM CT", role: "Clerk", title: "Prehearing Conference Rescheduled", description: "Reason: Scheduling Conflict", headerColor: "bg-[#1e3a5f]" },
  { date: "February 10, 2026", time: "9:00 AM CT", role: "Administrative Law Judge", title: "Prehearing Conference Canceled", description: "Reason: Settlement Discussions", headerColor: "bg-[#1e3a5f]" },
  { date: "February 15, 2026", time: "10:00 AM CT", role: "Administrative Law Judge", title: "Status Conference Held – No Substantive Business Conducted", headerColor: "bg-[#1e3a5f]" },
  // MOTIONS
  { date: "February 1, 2026", time: "11:15 AM CT", role: "Respondent Attorney", title: "Motion to Dismiss Filed", document: "Motion_to_Dismiss.pdf", headerColor: "bg-[#3b6bb5]" },
  { date: "February 2, 2026", time: "3:00 PM CT", role: "Administrative Law Judge", title: "Briefing Schedule Entered", document: "Briefing_Schedule.pdf", headerColor: "bg-[#3b6bb5]" },
  { date: "February 2, 2026", time: "4:15 PM CT", role: "Clerk", title: "Briefing Schedule Served", serviceMethod: "Portal", headerColor: "bg-[#1e3a5f]" },
  { date: "February 10, 2026", time: "10:30 AM CT", role: "Petitioner Attorney", title: "Response Filed", document: "Response.pdf", headerColor: "bg-[#3b6bb5]" },
  { date: "February 14, 2026", time: "9:00 AM CT", role: "Respondent Attorney", title: "Reply Filed", headerColor: "bg-[#3b6bb5]" },
  { date: "February 20, 2026", time: "1:00 PM CT", role: "Petitioner Attorney", title: "Supplemental Document Filed in Relation to Motion to Dismiss", headerColor: "bg-[#3b6bb5]" },
  { date: "February 25, 2026", time: "2:00 PM CT", role: "Clerk", title: "Hearing on Motion Scheduled", headerColor: "bg-[#1e3a5f]" },
  { date: "March 1, 2026", time: "4:30 PM CT", role: "Administrative Law Judge", title: "Order on Motion to Dismiss – Denied", document: "Order.pdf", headerColor: "bg-[#5b2d8e]" },
  { date: "March 2, 2026", time: "8:45 AM CT", role: "Clerk", title: "Order Served", serviceMethod: "Certified Mail", headerColor: "bg-[#4a6a8a]" },
  // CERTIFIED MAIL TRACKING
  { date: "March 2, 2026", time: "9:10 AM CT", role: "Clerk", title: "Free Text – Manual Entry", description: "Certified Mail Article Number 7015 0640 0001 2345 6789 entered for Order on Motion to Dismiss mailed to Petitioner.", freeText: true, manualEntry: true, headerColor: "bg-red-700" },
  { date: "March 2, 2026", time: "9:15 AM CT", role: "Clerk", title: "Free Text – Manual Entry", description: "Additional Certified Mail Article Number 7015 0640 0001 9876 5432 entered for alternate mailing address.", freeText: true, manualEntry: true, headerColor: "bg-red-700" },
  { date: "March 5, 2026", time: "3:00 PM CT", role: "Clerk", title: "Certified Mail Return Receipt Received (Signed)", headerColor: "bg-[#4a6a8a]" },
  { date: "March 6, 2026", time: "9:30 AM CT", role: "Clerk", title: "Regular Mail Returned Undeliverable", headerColor: "bg-[#4a6a8a]" },
  // ORAL MOTIONS
  { date: "March 5, 2026", time: "10:15 AM CT", role: "Bureau Staff", title: "Oral Motion on the Record – Motion to Continue", headerColor: "bg-[#3b6bb5]" },
  { date: "March 5, 2026", time: "3:00 PM CT", role: "Administrative Law Judge", title: "Ruling on Oral Motion – Granted", headerColor: "bg-[#5b2d8e]" },
  // SUBPOENAS
  { date: "March 6, 2026", time: "9:30 AM CT", role: "Petitioner Attorney", title: "Request for Issuance of Subpoena Filed", headerColor: "bg-[#3b6bb5]" },
  { date: "March 8, 2026", time: "2:00 PM CT", role: "Administrative Law Judge", title: "Subpoena Issued", headerColor: "bg-[#3b6bb5]" },
  { date: "March 15, 2026", time: "1:00 PM CT", role: "Respondent Attorney", title: "Motion to Quash Subpoena Filed", headerColor: "bg-[#3b6bb5]" },
  // DISCOVERY
  { date: "March 20, 2026", time: "11:00 AM CT", role: "Administrative Law Judge", title: "Discovery Schedule Entered", headerColor: "bg-[#3b6bb5]" },
  { date: "March 20, 2026", time: "2:30 PM CT", role: "Clerk", title: "Discovery Schedule Served", headerColor: "bg-[#1e3a5f]" },
  { date: "April 10, 2026", time: "4:00 PM CT", role: "Petitioner", title: "Discovery Compliance Certificate Filed", headerColor: "bg-[#3b6bb5]" },
  // EXHIBITS + IN CAMERA
  { date: "April 15, 2026", time: "9:00 AM CT", role: "Petitioner Attorney", title: "Proposed Exhibits Uploaded", headerColor: "bg-[#3b6bb5]" },
  { date: "April 16, 2026", time: "10:00 AM CT", role: "Petitioner Attorney", title: "In Camera Exhibit Submitted – Visible to ALJ Only", internalOnly: true, headerColor: "bg-[#3b6bb5]" },
  { date: "April 18, 2026", time: "1:30 PM CT", role: "Administrative Law Judge", title: "Free Text – Manual Entry", description: "In-person in camera inspection completed. Portions remain confidential.", freeText: true, manualEntry: true, internalOnly: true, headerColor: "bg-red-700" },
  { date: "April 20, 2026", time: "11:00 AM CT", role: "Clerk", title: "In Camera Exhibit Released per ALJ Order", headerColor: "bg-[#1e3a5f]" },
  // DECISION
  { date: "May 1, 2026", time: "1:00 PM CT", role: "Administrative Law Judge", title: "Findings of Fact, Conclusions of Law, and Recommended Decision Entered", headerColor: "bg-[#5b2d8e]" },
  { date: "May 1, 2026", time: "3:30 PM CT", role: "Clerk", title: "FFCLRD Served", headerColor: "bg-[#1e3a5f]" },
  { date: "May 20, 2026", time: "10:00 AM CT", role: "Referring Agency", title: "Final Administrative Decision Entered", description: "Activity Date: May 18, 2026", headerColor: "bg-[#5b2d8e]" },
  { date: "May 20, 2026", time: "2:00 PM CT", role: "Clerk", title: "FAD Served", headerColor: "bg-[#1e3a5f]" },
  // PARTY CONTACT UPDATE
  { date: "June 1, 2026", time: "11:00 AM CT", role: "Clerk", title: "Party Contact Updated for Petitioner", headerColor: "bg-[#1e3a5f]" },
  // FINAL FREE TEXT
  { date: "June 5, 2026", time: "9:30 AM CT", role: "Bureau Staff", title: "Free Text – Manual Entry", description: "Court reporter notified regarding transcript correction.", freeText: true, manualEntry: true, internalOnly: true, headerColor: "bg-red-700" },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Clerk": return "bg-[#e0f2f1] text-[#00695c] border-[#b2dfdb]";
    case "Administrative Law Judge": return "bg-[#fff8e1] text-[#f57f17] border-[#ffecb3]";
    case "System": return "bg-gray-100 text-gray-600 border-gray-200";
    case "Bureau Staff": return "bg-gray-100 text-gray-700 border-gray-200";
    case "Referring Agency": return "bg-gray-100 text-gray-700 border-gray-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export default function DocketLog() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* Case Header */}
        <Card className="shadow-md border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Case Number</p>
                <p className="text-lg font-bold text-foreground">BAH-2026-000145</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Case Type</p>
                <p className="text-lg font-semibold text-foreground">Professional License Disciplinary Appeal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Petitioner</p>
                <p className="font-semibold">John A. Smith <span className="text-sm font-normal text-muted-foreground">(Represented)</span></p>
                <p className="text-sm text-muted-foreground">Attorney: Maria Gonzalez, Esq.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Respondent</p>
                <p className="font-semibold">Illinois Department of Licensing <span className="text-sm font-normal text-muted-foreground">(Represented)</span></p>
                <p className="text-sm text-muted-foreground">Attorney: Daniel Harper, Assistant Attorney General</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Assigned ALJ</p>
                <p className="font-semibold">Hon. Rebecca Lawson</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Case Status</p>
                <Badge className="bg-green-600 text-white hover:bg-green-700 mt-1">Active – Pre-Hearing Phase</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[260px] w-0.5 bg-gray-300 top-0 bottom-0 hidden md:block" />

          <div className="space-y-8">
            {docketEntries.map((entry, index) => (
              <div key={index} className="relative flex items-start gap-6">
                {/* Left: Date/Role Card */}
                <div className="w-[230px] flex-shrink-0 flex justify-end">
                  <div className={`inline-flex flex-col items-center rounded-full border px-5 py-3 shadow-sm text-center ${getRoleColor(entry.role)}`}>
                    <span className="text-xs font-bold">{entry.date} {entry.time}</span>
                    <span className="text-xs font-medium">{entry.person || entry.role}</span>
                    <span className="text-[10px]">{entry.person ? entry.role : ''}</span>
                  </div>
                </div>

                {/* Center: Timeline node */}
                <div className="flex-shrink-0 mt-4 hidden md:block relative z-10">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow ${entry.freeText ? 'bg-red-500' : 'bg-gray-400'}`} />
                </div>

                {/* Right: Event Card */}
                <div className="flex-1 min-w-0">
                  <Card className={`shadow-sm border-0 overflow-hidden ${entry.internalOnly && entry.freeText ? 'bg-red-50' : ''}`}>
                    <div className={`${entry.headerColor} px-4 py-2`}>
                      <h4 className="text-sm font-bold text-white">{entry.title}</h4>
                    </div>
                    <CardContent className="p-4 space-y-2">
                      {entry.description && (
                        <p className="text-sm text-foreground">{entry.description}</p>
                      )}
                      {entry.document && (
                        <div>
                          <p className="text-xs font-bold text-foreground mb-1">Documents Uploaded</p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <FileText className="h-4 w-4" />
                            <a href="#" className="underline hover:text-blue-800">{entry.document}</a>
                          </div>
                        </div>
                      )}
                      {entry.link && (
                        <div>
                          <p className="text-xs font-bold text-foreground mb-1">Link to Recording</p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <LinkIcon className="h-4 w-4" />
                            <a href="#" className="underline hover:text-blue-800">{entry.link}</a>
                          </div>
                        </div>
                      )}
                      {entry.serviceMethod && (
                        <p className="text-xs text-muted-foreground">Service Method: <span className="font-medium">{entry.serviceMethod}</span></p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {entry.manualEntry && (
                          <Badge variant="outline" className="text-[10px] border-amber-400 text-amber-700 bg-amber-50">Manual Entry</Badge>
                        )}
                        {entry.internalOnly && (
                          <Badge variant="outline" className="text-[10px] border-red-400 text-red-700 bg-red-50">Internal Only</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-border bg-white mt-12">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-muted-foreground">
          © 2026 Illinois Department of Central Management Services. All rights reserved.
        </div>
      </div>
    </div>
  );
}
