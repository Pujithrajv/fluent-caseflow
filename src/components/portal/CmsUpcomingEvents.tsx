import React, { useMemo, useState } from "react";

/**
 * CMS Portal – Upcoming Events + Appointment Details
 * - React + Tailwind CSS
 * - Single-file, drop-in component
 *
 * Notes:
 * - Replace the mock data with API data.
 * - Wire "Join Teams" to your Teams join URL.
 * - "Open Case" can navigate to case details route.
 */

type EventType = "Conference" | "Hearing";

type EventItem = {
  id: string;
  title: string;
  eventType: EventType;
  caseNumber: string;
  caseName: string;
  department: string;
  party: string;
  dateText: string;
  timeText: string;
  meetingMode: "Microsoft Teams Meeting" | "In-Person Meeting" | "In-Person and Online (Teams)";
  teamsMeetingId?: string;
  locationName?: string;
  locationLine1?: string;
  locationLine2?: string;
  locationLine3?: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};

const NAVY = "bg-[#0B3A78]";
const NAVY_DARK = "bg-[#083062]";
const BORDER = "border-slate-200";
const TEXT_MUTED = "text-slate-600";

function Pill({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "red" | "amber" | "slate";
}) {
  const cls = {
    blue: "bg-sky-100 text-sky-800",
    red: "bg-red-100 text-red-800",
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-700",
  }[tone];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}

function Icon({ name }: { name: "calendar" | "clock" | "pin" | "doc" | "people" | "bell" | "grid" | "user" | "teams" }) {
  const common = "w-4 h-4 text-slate-500";

  switch (name) {
    case "calendar":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
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
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v5l3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "pin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 10.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "people":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M16 11a4 4 0 1 0-8 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 20a8 8 0 0 1 16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "doc":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
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
        <svg className={common} viewBox="0 0 24 24" fill="none">
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
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
        </svg>
      );
    case "user":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "teams":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 8h6a3 3 0 0 1 3 3v7H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M16 12l4-2v8l-4-2v-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${NAVY} hover:${NAVY_DARK} text-white w-full rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm`}
      type="button"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`border ${BORDER} hover:bg-slate-50 text-slate-800 w-full rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2`}
      type="button"
    >
      {children}
    </button>
  );
}

function UpcomingEventCard({
  ev,
  onOpenAppointment,
  onOpenCase,
  onJoinTeams,
}: {
  ev: EventItem;
  onOpenAppointment: () => void;
  onOpenCase: () => void;
  onJoinTeams: () => void;
}) {
  const typeTone = ev.eventType === "Hearing" ? "red" : "blue";

  return (
    <div className={`rounded-lg border ${BORDER} bg-white shadow-sm overflow-hidden`}>
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-semibold text-slate-900">{ev.title}</div>
          <div className={`mt-1 space-y-1 text-sm ${TEXT_MUTED}`}>
            <div className="flex items-center gap-2">
              <Icon name="doc" />
              <span className="font-medium text-slate-700">{ev.caseNumber}</span>
              <span className="text-slate-400">•</span>
              <span>{ev.caseName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="doc" />
              <span>{ev.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="people" />
              <span>{ev.party}</span>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <Pill tone={typeTone}>{ev.eventType}</Pill>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-slate-100">
        <div className={`space-y-2 text-sm ${TEXT_MUTED}`}>
          <div className="flex items-center gap-2">
            <Icon name="calendar" />
            <span>{ev.dateText}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="clock" />
            <span>{ev.timeText}</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="pin" />
            <div>
              <div className="text-slate-700 font-medium">{ev.meetingMode}</div>
              {ev.teamsMeetingId ? <div className="text-slate-500">Meeting ID: {ev.teamsMeetingId}</div> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <PrimaryButton onClick={onJoinTeams}>
          <Icon name="teams" />
          Join Teams
        </PrimaryButton>
        <div className="mt-3 grid grid-cols-2 gap-3">
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

function EventTabs({
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

function AppointmentDetailsView({
  ev,
  onBack,
}: {
  ev: EventItem;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"details" | "participants" | "notice">("details");
  const statusTone = ev.status === "Scheduled" ? "amber" : ev.status === "Completed" ? "slate" : "red";

  return (
    <div className="py-6">
      <div className="text-sm text-slate-600 mb-2">
        <button className="text-[#0B3A78] hover:underline" onClick={onBack} type="button">
          Events
        </button>{" "}
        <span className="text-slate-400">/</span> Event Details
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{ev.title}</h1>
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
              <Pill tone={statusTone}>{ev.status}</Pill>
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
        <EventTabs
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
            {/* Left – Event Details */}
            <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Icon name="calendar" />
                    Event Details
                  </div>
                </div>
                <button
                  type="button"
                  className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2`}
                >
                  <Icon name="calendar" />
                  Add to My Calendar
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <div className="text-slate-500 font-semibold">Event Date</div>
                  <div className="text-slate-800">{ev.dateText}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Event Type</div>
                  <div className="text-slate-800">{ev.meetingMode}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Event Time</div>
                  <div className="text-slate-800">{ev.timeText}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Duration</div>
                  <div className="text-slate-800">1 Hour</div>
                </div>
                <div>
                  <div className="text-slate-500 font-semibold">Instructions</div>
                  <p className="text-slate-700 leading-relaxed">
                    Add any event-specific instructions here (e.g., join 5 minutes early, bring documents, etc.).
                    This area is designed to match the layout shown in your portal screenshot.
                  </p>
                </div>
              </div>
            </div>

            {/* Right – Meeting Cards */}
            <div className="space-y-5">
              {/* Online Meeting */}
              <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-100">
                        <Icon name="teams" />
                      </span>
                      Online Meeting
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2`}
                  >
                    <Icon name="teams" />
                    Join Teams
                  </button>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-slate-800 font-semibold">Microsoft Teams Meeting</div>
                  {ev.teamsMeetingId ? (
                    <div className="mt-1 text-slate-500">Meeting ID: {ev.teamsMeetingId}</div>
                  ) : (
                    <div className="mt-1 text-slate-500">Meeting ID: (not available)</div>
                  )}
                </div>
              </div>

              {/* In-Person Meeting */}
              <div className={`rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-100">
                        <Icon name="pin" />
                      </span>
                      In-Person Meeting
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`${NAVY} hover:${NAVY_DARK} text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center gap-2`}
                  >
                    <Icon name="pin" />
                    Get Directions
                  </button>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-slate-500 font-semibold">Location</div>
                  <div className="mt-1 text-slate-800">
                    <div>{ev.locationName ?? "William G. Stratton Building"}</div>
                    <div className="text-slate-600">{ev.locationLine1 ?? "Conference Room A"}</div>
                    <div className="text-slate-600">{ev.locationLine2 ?? "401 South Spring Street"}</div>
                    <div className="text-slate-600">{ev.locationLine3 ?? "Springfield, IL 62706-4540"}</div>
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
            <p className="mt-3 text-sm text-slate-600">
              This tab can display participants associated with the event (read-only or editable per role).
            </p>
          </div>
        ) : (
          <div className={`mt-5 rounded-lg border ${BORDER} bg-white shadow-sm p-5`}>
            <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Icon name="bell" />
              Event Notice
            </div>
            <p className="mt-3 text-sm text-slate-600">
              This tab can display the event notice PDF link and related metadata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CmsUpcomingEvents() {
  const events: EventItem[] = useMemo(
    () => [
      {
        id: "ev-1",
        title: "Initial Case Management Conference",
        eventType: "Conference",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 22, 2025",
        timeText: "11:30 AM CST",
        meetingMode: "Microsoft Teams Meeting",
        teamsMeetingId: "222 647 995 075",
        status: "Scheduled",
      },
      {
        id: "ev-2",
        title: "Hearing",
        eventType: "Hearing",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 30, 2025",
        timeText: "2:00 PM CST",
        meetingMode: "In-Person Meeting",
        locationName: "William G. Stratton Building",
        locationLine1: "Conference Room A",
        locationLine2: "401 South Spring Street",
        locationLine3: "Springfield, IL 62706-4000",
        status: "Scheduled",
      },
      {
        id: "ev-3",
        title: "Case Management Conference Continuance",
        eventType: "Conference",
        caseNumber: "DNR-OLE-HFSS-25-00001",
        caseName: "Summary Suspension",
        department: "Department of Natural Resources (Complainant)",
        party: "Rajaram Sheppard (Defendant)",
        dateText: "September 23, 2025",
        timeText: "1:30 PM CST",
        meetingMode: "Microsoft Teams Meeting",
        teamsMeetingId: "222 647 995 074",
        status: "Scheduled",
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

  const joinTeams = (ev: EventItem) => {
    alert(`Join Teams for "${ev.title}" (Meeting ID: ${ev.teamsMeetingId ?? "N/A"})`);
  };

  const openCase = (ev: EventItem) => {
    alert(`Open Case: ${ev.caseNumber}`);
  };

  return (
    <>
      {view === "events" ? (
        <div>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-sm text-slate-600">Dashboard / My Cases</div>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Upcoming Events</h1>
              <p className="mt-1 text-sm text-slate-600">
                Upcoming conferences and hearings for cases you are associated with.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {events.map((ev) => (
              <UpcomingEventCard
                key={ev.id}
                ev={ev}
                onJoinTeams={() => joinTeams(ev)}
                onOpenCase={() => openCase(ev)}
                onOpenAppointment={() => openAppointment(ev)}
              />
            ))}
          </div>
        </div>
      ) : (
        <AppointmentDetailsView
          ev={selected ?? events[0]}
          onBack={() => {
            setView("events");
            setSelected(null);
          }}
        />
      )}
    </>
  );
}
