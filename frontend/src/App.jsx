import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";
import Home from "@/pages/Home.jsx";
import About from "@/pages/About.jsx";
import Contact from "@/pages/Contact.jsx";
import Login from "@/pages/Login.jsx";
import SelectRole from "@/pages/SelectRole.jsx";
import SelectInstitute from "@/pages/SelectInstitute.jsx";
import UserDetails from "@/pages/UserDetails.jsx";
import AdminSignUp from "@/pages/AdminSignUp.jsx";
import Admin from "@/pages/dashboard/Admin.jsx";
import Teacher from "@/pages/dashboard/Teacher.jsx";
import Student from "@/pages/dashboard/Student.jsx";
import Parent from "@/pages/dashboard/Parent.jsx";
import Subjects from "@/pages/dashboard/list/Subjects.jsx";
import Parents from "@/pages/dashboard/list/Parents.jsx";
import Assignments from "@/pages/dashboard/list/Assignments.jsx";
import Announcements from "@/pages/dashboard/list/Announcements.jsx";
import Classes from "@/pages/dashboard/list/Classes.jsx";
import Events from "@/pages/dashboard/list/Events.jsx";
import Exams from "@/pages/dashboard/list/Exams.jsx";
import Lessons from "@/pages/dashboard/list/Lessons.jsx";
import Results from "@/pages/dashboard/list/Results.jsx";
import Students from "@/pages/dashboard/list/Students.jsx";
import Teachers from "@/pages/dashboard/list/Teachers.jsx";
import StudentDetail from "@/pages/dashboard/list/StudentDetail.jsx";
import TeacherDetail from "@/pages/dashboard/list/TeacherDetail.jsx";
import Attendance from "@/pages/dashboard/list/Attendance.jsx";
import Messages from "@/pages/dashboard/list/Messages.jsx";
import Profile from "@/pages/dashboard/Profile.jsx";
import Settings from "@/pages/dashboard/Settings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/select-institute" element={<SelectInstitute />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="/admin-signup" element={<AdminSignUp />} />

      <Route element={<DashboardLayout />}>
        <Route path="admin" element={<Admin />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="student" element={<Student />} />
        <Route path="parent" element={<Parent />} />
        <Route path="list/subjects" element={<Subjects />} />
        <Route path="list/parents" element={<Parents />} />
        <Route path="list/assignments" element={<Assignments />} />
        <Route path="list/announcements" element={<Announcements />} />
        <Route path="list/classes" element={<Classes />} />
        <Route path="list/events" element={<Events />} />
        <Route path="list/exams" element={<Exams />} />
        <Route path="list/lessons" element={<Lessons />} />
        <Route path="list/results" element={<Results />} />
        <Route path="list/students" element={<Students />} />
        <Route path="list/students/:id" element={<StudentDetail />} />
        <Route path="list/teachers" element={<Teachers />} />
        <Route path="list/teachers/:id" element={<TeacherDetail />} />
        <Route path="list/attendance" element={<Attendance />} />
        <Route path="list/messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
