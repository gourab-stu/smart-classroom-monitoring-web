import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface AttendanceRecord {
  date: string;
  subject: string;
  teacher: string;
  time: string;
  status: "Present" | "Absent";
}

const attendanceData: AttendanceRecord[] = [
  {
    date: "2025-06-01",
    subject: "Computer Science",
    teacher: "Dr. Sharma",
    time: "10:00 AM - 11:00 AM",
    status: "Present",
  },
  {
    date: "2025-06-01",
    subject: "Mathematics",
    teacher: "Prof. Roy",
    time: "12:00 PM - 1:00 PM",
    status: "Absent",
  },
  {
    date: "2025-06-02",
    subject: "Computer Graphics",
    teacher: "Ms. Kapoor",
    time: "9:00 AM - 10:00 AM",
    status: "Absent",
  },
  {
    date: "2025-06-02",
    subject: "AI & ML",
    teacher: "Dr. Verma",
    time: "11:30 AM - 12:30 PM",
    status: "Absent",
  },
  {
    date: "2025-06-03",
    subject: "DBMS",
    teacher: "Mr. Das",
    time: "10:00 AM - 11:00 AM",
    status: "Present",
  },
  {
    date: "2025-06-03",
    subject: "Python Lab",
    teacher: "Dr Sharma",
    time: "1:00 PM - 3:00 PM",
    status: "Present",
  },
];

export default function Attendance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-950  p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="underline text-2xl sm:text-3xl font-bold text-center text-zinc-200 mb-6">
          Attendance Details
        </h1>

        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]"> Date</TableHead>
                  <TableHead className="min-w-[150px]"> Subject</TableHead>
                  <TableHead className="min-w-[140px]"> Teacher</TableHead>
                  <TableHead className="min-w-[160px]"> Time</TableHead>
                  <TableHead className="text-center min-w-[100px]">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.teacher}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell className="text-center text-lg">
                      {record.status === "Present" ? "✅" : "❌"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
