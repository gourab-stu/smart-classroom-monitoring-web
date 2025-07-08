import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { SkeletonCard } from "../skeleton-card";

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
  console.log(profile.papers);
  console.log(profile.elective_papers);

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

export const AssignmentTab = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {["Math", "Science", "AI"].map((subject, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <h2 className="font-semibold text-teal-300">{subject} Assignment</h2>
          <p className="text-sm text-zinc-300">
            Submit by: {["June 30", "July 5", "July 10"][i]}
          </p>
          <button className="mt-4 w-full bg-teal-700 text-white px-4 py-2 rounded-md text-sm">
            Upload
          </button>
        </CardContent>
      </Card>
    ))}
  </div>
);

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

export const RoutineTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold">🕘 Mon - Wed</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>9 AM - Math</li>
          <li>10 AM - AI</li>
          <li>11 AM - Computer Graphics</li>
        </ul>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold">🕘 Thu - Fri</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>9 AM - DBMS</li>
          <li>10 AM - Python</li>
          <li>11 AM - Lab</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

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
    <Card>
      <CardContent className="p-4">
        <h2 className="font-semibold">🔔 Upcoming Classes</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>Today 10:00 AM - AI</li>
          <li>Tomorrow 9:00 AM - Math</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);
