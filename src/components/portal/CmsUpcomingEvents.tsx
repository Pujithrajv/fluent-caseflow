import React, { useMemo, useState } from "react";

/**
 * CMS Portal – Upcoming Events + Appointment Details (Post-Ruling included)
 * React + TailwindCSS, single-file demo component.
 *
 * Includes event types:
 * - Conference / Hearing
 * - Appeal Filed
 * - Appeal Decision Upheld
 * - Appeal Decision Remanded
 *
 * Buttons:
 * - Join Teams (when online)
 * - Open Case
 * - Open Appointment (navigates to details)
 * - Upload (for appeal artifacts)
 *
 * Replace mock handlers with your real navigation + API actions.
 */

type PillTone = "blue" | "red" | "amber" | "teal" | "orange" | "slate";

type EventCategory =
  | "Conference"
  | "Hearing"
  | "Appeal Filed"
  | "Appeal Decision Upheld"
  | "Appeal Decision Remanded";

type MeetingMode = "Microsoft Teams Meeting" | "In-Person Meeting" | "In-Person and Online (Teams)" | "N/A";

type EventStatus = "Scheduled" | "Action Required" | "Info" | "Completed" | "Cancelled";

type EventItem = {
  id: string;

  // Top label
  title: string; // card title (e.g., "Appeal Filed", "Initial Case Management Conference")
  category: EventCategory;

  // Case info
  caseNumber: string;
  caseName: string;
  department: string;
  party: string;

  // Timing
  dateText: string; // e.g., "September 22, 2025"
  timeText?: string; // optional for post-ruling items
  timezone?: string;

  // Status
  status: EventStatus;

  // Meeting info (if applicable)
  meetingMode: MeetingMode;
  teamsMeetingId?: string;

  // In-person location (optional)
  locationName?: string;
  locationLine1?: string;
  locationLine2?: string;
  locationLine3?: string;

  // Post-ruling fields (optional)
  appealFiledDate?: string; // e.g., "September 12, 2025"
  appealResponseDue?: string; // e.g., "October 12, 2025"
  requiredActionLabel?: string; // e.g., "Upload Circuit Court Decision"
  instructions?: string;

  // Links (optional)
  teamsJoinUrl?: string;
};

const NAVY = "bg-[#0B3A78]";
const NAVY_DARK = "bg-[#083062]";
const BORDER = "border-slate-200";

function Icon({
  name,
  className = "w-4 h-4 text-slate-500",
}: {
  name:
    | "calendar"
    | "clock"
    | "pin"
    | "doc"
    | "people"
    | "bell"
    | "grid"
    | "user"
    | "teams"
    | "upload"
    | "arrow";
  className?: string;
}) {
  switch (name) {
    case "calendar":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M6 5h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "pin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M12 10.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M14 3v4a2 2 0 0 0 2 2h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "bell":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9 19a3 3 0 0 0 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "grid":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "teams":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 8h6a3 3 0 0 1 3 3v7H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M16 12l4-2v8l-4-2v-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "upload":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 16V4m0 0l-4 4m4-4l4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function Pill({ children, tone }: { children: React.ReactNode; tone: PillTone }) {
  const cls: Record<PillTone, string> = {
    blue: "bg-sky-100 text-sky-800",
    red: "bg-red-100 text-red-800",
    amber: "bg-amber-100 text-amber-800",
    teal: "bg-teal-100 text-teal-800",
    orange: "bg-orange-100 text-orange-800",
    slate: "bg-slate-100 text-slate-700",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls[tone]}`}>{children}</span>;
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${NAVY} hover:${NAVY_DARK} disabled:opacity-60 disabled:cursor-not-allowed text-white w-full rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm`}
      type="button"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  rightArrow,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  rightArrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`border ${BORDER} hover:bg-slate-50 text-slate-800 w-full rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2`}
      type="button"
    >
      <span className="flex items-center gap-2">{children}</span>
      {rightArrow ? <Icon name="arrow" className="w-4 h-4 text-slate-500" /> : null}
    </button>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}

function categoryPill(category: EventCategory): { text: string; tone: PillTone } {
  switch (category) {
    case "Conference":
      return { text: "Conference", tone: "blue" };
    case "Hearing":
      return { text: "Hearing", tone: "red" };
    case "Appeal Filed":
      return { text: "Appeal Filed", tone: "teal" };
    case "Appeal Decision Upheld":
      return { text: "Decision Upheld", tone: "slate" };
    case "Appeal Decision Remanded":
      return { text: "Decision Remanded", tone: "orange" };
  }
}

function statusPill(status: EventStatus): { text: string; tone: PillTone } {
  switch (status) {
    case "Scheduled":
      return { text: "Scheduled", tone: "amber" };
    case "Action Required":
      return { text: "Action Required", tone: "orange" };
    case "Info":
      return { text: "Info", tone: "slate" };
    case "Completed":
      return { text: "Completed", tone: "slate" };
    case "Cancelled":
      return { text: "Cancelled", tone: "red" };
  }
}

function UpcomingEventCard({
  ev,
  onOpenAppointment,
  onOpenCase,
  onJoinTeams,
  onUpload,
}: {
  ev: EventItem;
  onOpenAppointment: () => void;
  onOpenCase: () => void;
  onJoinTeams: () => void;
  onUpload: () => void;
}) {
  const cat = categoryPill(ev.category);
  const showJoin = ev.meetingMode !== "N/A" && (ev.meetingMode.includes("Teams") || !!ev.teamsMeetingId);
  const showUpload = !!ev.requiredActionLabel;

  return (
    <div className={`rounded-lg border ${BORDER} bg-white shadow-sm overflow-hidden`}>
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-base font-semibold text-slate-900 truncate">{ev.title}</div>

          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Icon name="doc" />
              <span className="font-medium text-slate-700">{ev.caseNumber}</span>
              <span className="text-slate-400">•</span>
              <span className="truncate">{ev.caseName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="doc" />
              <span className="truncate">{ev.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="people" />
              <span className="truncate">{ev.party}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Pill tone={cat.tone}>{cat.text}</Pill>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-slate-100">
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Icon name="calendar" />
            <span>{ev.dateText}</span>
          </div>

          {ev.timeText ? (
            <div className="flex items-center gap-2">
              <Icon name="clock" />
              <span>
                {ev.timeText} {ev.timezone ? ev.timezone : ""}
              </span>
            </div>
          ) : null}

          {ev.category.startsWith("Appeal") ? (
            <div className="mt-2 rounded-md bg-slate-50 border border-slate-200 p-3">
              {ev.appealFiledDate ? (
                <div className="text-sm text-slate-700">
                  <span className="font-semibold">Appeal Filed:</span> {ev.appealFiledDate}
                </div>
              ) : null}
              {ev.appealResponseDue ? (
                <div className="text-sm text-slate-700 mt-1">
                  <span className="font-semibold">Agency Response Due:</span> {ev.appealResponseDue}
                </div>
              ) : null}
              {ev.requiredActionLabel ? (
                <div className="text-sm text-slate-700 mt-1">
                  <span className="font-semibold">Action:</span> {ev.requiredActionLabel}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <Icon name="pin" />
              <div>
                <div className="text-slate-700 font-medium">{ev.meetingMode}</div>
                {ev.teamsMeetingId ? <div className="text-slate-500">Meeting ID: {ev.teamsMeetingId}</div> : null}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 space-y-3">
        {showJoin ? (
          <PrimaryButton onClick={onJoinTeams}>
            <Icon name="teams" className="w-4 h-4 text-white" />
            Join Teams
          </PrimaryButton>
        ) : (
          <PrimaryButton disabled>
            <Icon name="teams" className="w-4 h-4 text-white" />
            Join Teams
          </PrimaryButton>
        )}

        <div className="grid gap-3 grid-cols-2">
          <SecondaryButton onClick={onOpenCase}>
            <Icon name="doc" />
            Open Case
          </SecondaryButton>
          <SecondaryButton onClick={onOpenAppointment}>
            <Icon name="calendar" />
            Open Appointment
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function Tabs({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (v: string) => void;
  items: { key: string; label: string; icon?: React.ReactNode }[];
}) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-6">
        {items.map((it) => {
          const active = it.key === value;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              className={`relative py-3 text-sm font-semibold flex items-center gap-2 ${
                active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {it.icon}
              {it.label}
              {active ? <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] rounded-t bg-[#0B3A78]" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppointmentDetails({
  ev,
  onBack,
  onOpenCase,
  onJoinTeams,
  onUpload,
}: {
  ev: EventItem;
  onBack: () => void;
  onOpenCase: () => void;
  onJoinTeams: () => void;
  onUpload: () => void;
}) {
  const [tab, setTab] = useState<"details" | "participants" | "notice">("details");
  const status = statusPill(ev.status);
  const cat = categoryPill(ev.category);
  const showJoin = ev.meetingMode !== "N/A" && (ev.meetingMode.includes("Teams") || !!ev.teamsMeetingId);
  const showUpload = !!ev.requiredActionLabel;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="text-sm text-slate-600 mb-2">
        <button className="text-[#0B3A78] hover:underline" onClick={onBack} type="button">
          Events
        </button>{" "}
        <span className="text-slate-400">/</span> Event Details
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
            {ev.title}
            <Pill tone={cat.tone}>{cat.text}</Pill>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="text-sm text-slate-700">
            <div className="font-semibold">Case: {ev.caseNumber}</div>
            <div className="text-slate-500">{ev.caseName}</div>
            <div className="text-slate-500">Primary Party</div>
          </div>

          <div className="h-px md:h-10 md:w-px bg-slate-200" />

          <div className="text-sm text-slate-700">
            <div className="font-semibold">Event Date / Status</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-500">{ev.dateText}</span>
              <Pill tone={status.tone}>{status.text}</Pill>
            </div>
          </div>

          <div className="hidden md:block h-10 w-px bg-slate-200" />
          <button type="button" className="ml-auto md:ml-0 rounded-full p-2 hover:bg-slate-100" aria-label="Help">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold">
              ?
            </span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Tabs
          value={tab}
          onChange={(v) => setTab(v as any)}
          items={[
            { key: "details", label: "Event Details", icon: <Icon name="calendar" /> },
            { key: "participants", label: "Participants", icon: <Icon name="people" /> },
            { key: "notice", label: "Event Notice", icon: <Icon name="bell" /> },
          ]}
        />

        {tab === "details" ? (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left card */}
            <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Icon name="calendar" />
                  Event Details
                </div>

                <button
                  type="button"
                  className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2`}
                >
                  <Icon name="calendar" className="w-4 h-4 text-white" />
                  Add to My Calendar
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                {ev.appealFiledDate ? (
                  <div>
                    <div className="text-slate-500 font-semibold">Appeal Filed</div>
                    <div className="text-slate-800">{ev.appealFiledDate}</div>
                  </div>
                ) : null}

                <div>
                  <div className="text-slate-500 font-semibold">Event Date</div>
                  <div className="text-slate-800">{ev.dateText}</div>
                </div>

                {ev.timeText ? (
                  <div>
                    <div className="text-slate-500 font-semibold">Event Time</div>
                    <div className="text-slate-800">
                      {ev.timeText} {ev.timezone ?? ""}
                    </div>
                  </div>
                ) : null}

                <div>
                  <div className="text-slate-500 font-semibold">Event Type</div>
                  <div className="text-slate-800">{ev.meetingMode}</div>
                </div>

                {ev.appealResponseDue ? (
                  <div>
                    <div className="text-slate-500 font-semibold">Agency Response Due</div>
                    <div className="text-slate-800">{ev.appealResponseDue}</div>
                  </div>
                ) : null}

                {ev.requiredActionLabel ? (
                  <div>
                    <div className="text-slate-500 font-semibold">Required Action</div>
                    <div className="text-slate-800">{ev.requiredActionLabel}</div>
                  </div>
                ) : null}

                <div>
                  <div className="text-slate-500 font-semibold">Instructions</div>
                  <p className="text-slate-700 leading-relaxed">
                    {ev.instructions ??
                      "Add any event-specific instructions here (e.g., upload the decision document, confirm administrative record, or follow internal routing steps)."}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <SecondaryButton onClick={onOpenCase}>
                  <Icon name="doc" />
                  Open Case
                </SecondaryButton>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Online Meeting (only if applicable) */}
              <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-100">
                      <Icon name="teams" />
                    </span>
                    Online Meeting
                  </div>
                  <button
                    type="button"
                    onClick={showJoin ? onJoinTeams : undefined}
                    className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2 ${
                      showJoin ? "" : "opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <Icon name="teams" className="w-4 h-4 text-white" />
                    Join Teams
                  </button>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-slate-800 font-semibold">Microsoft Teams Meeting</div>
                  <div className="mt-1 text-slate-500">Meeting ID: {ev.teamsMeetingId ?? "(not available)"}</div>
                </div>
              </div>

              {/* In-person (shows placeholder even for appeal items) */}
              <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-100">
                      <Icon name="pin" />
                    </span>
                    In-Person Meeting
                  </div>
                  <button
                    type="button"
                    className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2`}
                  >
                    <Icon name="pin" className="w-4 h-4 text-white" />
                    Get Directions
                  </button>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-slate-500 font-semibold">Location</div>
                  <div className="mt-1 text-slate-800">
                    <div>{ev.locationName ?? "—"}</div>
                    <div className="text-slate-600">{ev.locationLine1 ?? ""}</div>
                    <div className="text-slate-600">{ev.locationLine2 ?? ""}</div>
                    <div className="text-slate-600">{ev.locationLine3 ?? ""}</div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <div className="h-52 w-full flex items-center justify-center text-slate-500 text-sm">
                    Map preview (embed iframe here)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : tab === "participants" ? (
          <div className={`mt-5 rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
            <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Icon name="people" />
              Participants
            </div>
            <p className="mt-3 text-sm text-slate-600">Render participants for this event (role-based: view/edit).</p>
          </div>
        ) : (
          <div className={`mt-5 rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
            <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Icon name="bell" />
              Event Notice
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Provide the notice PDF link (e.g., Notice of Appeal, Circuit Court Decision, Remand Order) and metadata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CmsUpcomingEvents() {
  const events: EventItem[] = useMemo(
    () => [
      // --- Post-Ruling (Appeal Filed)
      {
        id: "appeal-filed-1",
        title: "Appeal Filed",
        category: "Appeal Filed",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 1, 2025",
        meetingMode: "N/A",
        status: "Action Required",
        appealFiledDate: "September 1, 2025",
        appealResponseDue: "October 1, 2025",
        requiredActionLabel: "Prepare / transfer Final Administrative Record",
        instructions:
          "Agency (Case Manager) must respond within 30 days and transfer the Final Administrative Record to the appellate court as required.",
      },

      // --- Post-Ruling (Decision Upheld)
      {
        id: "appeal-upheld-1",
        title: "Appeal Decision Upheld",
        category: "Appeal Decision Upheld",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "October 15, 2025",
        meetingMode: "N/A",
        status: "Action Required",
        appealFiledDate: "September 1, 2025",
        requiredActionLabel: "Upload Circuit Court / Appellate Decision document",
        instructions:
          "Upload the upheld decision document and (if applicable) confirm the Final Administrative Record is attached. No case reopening required for upheld outcomes.",
      },

      // --- Post-Ruling (Decision Remanded)
      {
        id: "appeal-remanded-1",
        title: "Appeal Decision Remanded",
        category: "Appeal Decision Remanded",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 22, 2025",
        meetingMode: "N/A",
        status: "Action Required",
        appealFiledDate: "September 12, 2025",
        appealResponseDue: "October 22, 2025",
        requiredActionLabel: "Upload remand decision + Final Administrative Record",
        instructions:
          "Upload remand decision documents. After upload/save, Clerk task should be generated for routing. ALJ will be notified only if remand requires judicial action.",
      },

      // --- Normal event (Conference)
      {
        id: "conf-1",
        title: "Initial Case Management Conference",
        category: "Conference",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 22, 2025",
        timeText: "11:30 AM",
        timezone: "CST",
        meetingMode: "Microsoft Teams Meeting",
        teamsMeetingId: "222 647 995 075",
        status: "Scheduled",
        teamsJoinUrl: "https://teams.microsoft.com/",
      },

      // --- Normal event (Hearing)
      {
        id: "hear-1",
        title: "Hearing",
        category: "Hearing",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 30, 2025",
        timeText: "2:00 PM",
        timezone: "CST",
        meetingMode: "In-Person Meeting",
        status: "Scheduled",
        locationName: "William G. Stratton Building",
        locationLine1: "Conference Room A",
        locationLine2: "401 South Spring Street",
        locationLine3: "Springfield, IL 62706-4000",
      },
    ],
    []
  );

  const [view, setView] = useState<"events" | "appointment">("events");
  const [selected, setSelected] = useState<EventItem | null>(null);

  const openAppointment = (ev: EventItem) => {
    setSelected(ev);
    setView("appointment");
  };

  // Replace these with real routing/actions
  const joinTeams = (ev: EventItem) => {
    if (!ev.teamsJoinUrl) return;
    window.open(ev.teamsJoinUrl, "_blank", "noopener,noreferrer");
  };

  const openCase = (ev: EventItem) => {
    alert(`Navigate to Case: ${ev.caseNumber}`);
  };

  const uploadDocs = (ev: EventItem) => {
    alert(`Open Upload for: ${ev.caseNumber}\nAction: ${ev.requiredActionLabel ?? "N/A"}`);
  };

  return (
    <PageShell>
      {view === "events" ? (
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="text-sm text-slate-600">Dashboard / My Cases</div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Upcoming Events</h1>
          <p className="mt-1 text-sm text-slate-600">Upcoming conferences, hearings, and post-ruling appeal items.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((ev) => (
              <UpcomingEventCard
                key={ev.id}
                ev={ev}
                onJoinTeams={() => joinTeams(ev)}
                onOpenCase={() => openCase(ev)}
                onOpenAppointment={() => openAppointment(ev)}
                onUpload={() => uploadDocs(ev)}
              />
            ))}
          </div>
        </div>
      ) : (
        <AppointmentDetails
          ev={selected ?? events[0]}
          onBack={() => {
            setView("events");
            setSelected(null);
          }}
          onOpenCase={() => selected && openCase(selected)}
          onJoinTeams={() => selected && joinTeams(selected)}
          onUpload={() => selected && uploadDocs(selected)}
        />
      )}
    </PageShell>
  );
}
