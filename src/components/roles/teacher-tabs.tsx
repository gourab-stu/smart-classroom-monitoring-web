import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { SkeletonCard } from "../skeleton-card";
import { useAssignments } from "@/hooks/useAssignment";
import { Book, Eye, Loader2, Plus, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSubmissionAttachments } from "@/hooks/useSubmissionAttachments";
import { usePaper } from "@/hooks/usePaper";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAssignmentDetails } from "@/hooks/useAssignmentDetails";
import { useState } from "react";
import { Button } from "../ui/button";
import { useUploadAttachment } from "@/hooks/useUploadAttachment";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAllSubmissions } from "@/hooks/useAllSubmissions";
import { useRoutines } from "@/hooks/useRoutine";

export const icons = {
  Profile: <User size={16} />,
  Assignment: <Book size={16} />,
  // Attendance: <ClipboardList size={16} />,
  // Routine: <CalendarClock size={16} />,
  // "Join Class": <Video size={16} />,
};

export const tabs = [
  { label: "Profile", value: "Profile" },
  { label: "Assignment", value: "Assignment" },
  // { label: "Attendance", value: "Attendance" },
  // { label: "Routine", value: "Routine" },
  // { label: "Join Class", value: "Join Class" },
];

export const ProfileTab = () => {
  const { profile, loading } = useProfile();

  if (loading)
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  if (!profile)
    return (
      <p className="bg-red-500/90 px-5 py-2 text-center tracking-wider rounded">
        No profile data found.
      </p>
    );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">👤 Basic Info</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <strong>Name:</strong> Prof.
              {` ${profile.first_name}${
                profile.middle_name ? " " + profile.middle_name : ""
              } ${profile.last_name}`}
            </li>
            <li>
              <strong>Email:</strong> {profile.email}
            </li>
            <li>
              <strong>Mobile No:</strong> {profile.mobile_no}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export const AssignmentTab = () => {
  const { assignments, loading } = useAssignments();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { assignment, loading: assignmentLoading } =
    useAssignmentDetails(selectedId);
  const { submissions, loading: submissionsLoading } =
    useAllSubmissions(selectedId);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!assignments || assignments.length === 0) {
    return (
      <p className="bg-red-500/90 px-5 py-2 text-center tracking-wider rounded">
        No Assignments found.
      </p>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 outline-none">
        {assignments.map((a, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2 text-sm">
              <h2 className="text-lg font-bold text-teal-300 text-center">
                {a?.title}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-zinc-400 text-xs col-span-1 text-start">
                  Posted:{" "}
                  {new Date(a?.assigned_date).toLocaleDateString("en-GB")}
                </span>
                <span className="text-zinc-400 text-xs col-span-1 text-end">
                  Due by:{" "}
                  {a?.due_date
                    ? new Date(a?.due_date).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>
              </div>
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button
                    className="mt-4 w-full bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-800 transition"
                    onClick={() => setSelectedId(a.assignment_id)}
                  >
                    {assignmentLoading ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <Eye />
                    )}
                    {assignmentLoading
                      ? "Loading... submissions"
                      : "View submissions"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full min-w-6xl min-h-6xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{assignment?.title}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="space-y-2 text-sm text-left">
                    <Table>
                      <TableCaption>All submissions</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead>Submitted At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissionsLoading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">
                              <Loader2 className="animate-spin mx-auto" />
                            </TableCell>
                          </TableRow>
                        ) : submissions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">
                              No submissions found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          submissions.map((sub) => (
                            <TableRow key={sub.submission_id}>
                              <TableCell>{sub.student_name}</TableCell>
                              <TableCell>
                                <ul className="list-disc ml-4">
                                  {sub.attachments.map((att, i) => (
                                    <li key={i}>
                                      <a
                                        href={att.file_url}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                      >
                                        {att.original_filename}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                              <TableCell>
                                {new Date(sub.submitted_at).toLocaleString(
                                  "en-GB"
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export const AttendanceTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold text-green-300">📊 Monthly Attendance</h2>
        <p>
          June 2025: <strong>89%</strong>
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold text-green-300">📅 Last Week</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>Mon: ✅</li>
          <li>Tue: ✅</li>
          <li>Wed: ❌</li>
          <li>Thu: ✅</li>
          <li>Fri: ✅</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

export const RoutineTab = () => {
  const { routines, loading } = useRoutines();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-teal-500" />
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <p className="bg-red-500/90 px-5 py-2 text-center tracking-wider rounded">
        No routines found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Weekly Routine</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Classroom</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routines.map((r) => (
            <TableRow key={r.routine_id}>
              <TableCell>
                {
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                    r.day_of_week
                  ]
                }
              </TableCell>
              <TableCell>
                {r.start_time.slice(0, 5)} - {r.end_time.slice(0, 5)}
              </TableCell>
              <TableCell>{r.paper_code}</TableCell>
              <TableCell>{r.teacher_id}</TableCell>
              <TableCell>{r.classroom_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
