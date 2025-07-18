import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { SkeletonCard } from "../skeleton-card";
import { useAssignments } from "@/hooks/useAssignment";
import {
  Book,
  CalendarClock,
  ClipboardList,
  Eye,
  Loader2,
  Plus,
  User,
  Video,
} from "lucide-react";
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
import { useRoutines } from "@/hooks/useRoutine";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const icons = {
  Profile: <User size={16} />,
  Assignment: <Book size={16} />,
  Attendance: <ClipboardList size={16} />,
  Routine: <CalendarClock size={16} />,
  "Join Class": <Video size={16} />,
};

export const tabs = [
  { label: "Profile", value: "Profile" },
  { label: "Assignment", value: "Assignment" },
  { label: "Attendance", value: "Attendance" },
  { label: "Routine", value: "Routine" },
  { label: "Join Class", value: "Join Class" },
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
              <strong>Name:</strong>
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
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">📍 Academic Info</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <strong>Core Papers:</strong>{" "}
              {profile.papers
                ?.sort()
                ?.map((val: string, i: number) =>
                  profile.papers && i < profile.papers?.length - 1
                    ? `${val}, `
                    : `${val}`
                )}
            </li>
            <li>
              <strong>Semester:</strong> {profile.semester}
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
  const { paper } = usePaper(assignment?.paper_code || null);
  const { profile: teacher } = useUserProfile(assignment?.teacher_id || null);
  const { attachments } = useSubmissionAttachments(
    assignment?.assignment_id || null
  );

  const { upload, uploading } = useUploadAttachment();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !assignment?.assignment_id) return;

    try {
      await upload(assignment.assignment_id, file, (progress) => {
        toast.message(`Uploading: ${progress}%`);
      });
    } catch (err) {
      toast.error("Can not upload attachment");
      console.error(err);
    }
  };

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
                    {assignmentLoading ? "Loading..." : "View"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{assignment?.title}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="space-y-2 text-sm text-left">
                    <p>
                      <strong>📘 Paper:</strong>{" "}
                      {paper?.paper_title || assignment?.paper_code}
                    </p>
                    <p>
                      <strong>👨‍🏫 Teacher:</strong> {teacher?.first_name}{" "}
                      {teacher?.middle_name} {teacher?.last_name}
                    </p>
                    <p>
                      <strong>📂 Type:</strong> {assignment?.assignment_type}
                    </p>
                    <p>
                      <strong>📝 Instructions:</strong>{" "}
                      {assignment?.instructions || "N/A"}
                    </p>

                    <div>
                      <strong>📎 Your Submissions:</strong>
                      {attachments.length === 0 ? (
                        <p className="text-sm py-3 text-zinc-400 italic">
                          No attachments submitted.
                        </p>
                      ) : (
                        <ul className="list-disc list-inside text-sm">
                          {attachments.flatMap((sub) =>
                            sub.attachments.map((att: any, idx: number) => (
                              <li key={idx}>
                                <a
                                  href={att.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  {att.original_filename}
                                </a>
                              </li>
                            ))
                          )}
                        </ul>
                      )}
                    </div>

                    <label className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-800 transition cursor-pointer">
                      <Plus className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Submission"}
                      <input
                        type="file"
                        accept="*/*"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={uploading}
                      />
                    </label>
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

export const JoinClassTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold">💻 Google Meet Link</h2>
        <p>Click below to join your class:</p>
        <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md">
          Join Class
        </button>
      </CardContent>
    </Card>
  </div>
);
