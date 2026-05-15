import { useState } from "react";
import { teachersData } from "@/lib/data";
const SubjectForm = ({ type, data }) => {
  const [subject, setSubject] = useState(data?.subject || "");
  const [teacher, setTeacher] = useState(data?.teacher || "");
  const [assistantTeacher, setAssistantTeacher] = useState(data?.assistantTeacher || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ subject, teacher, assistantTeacher });
  };
  return <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div>
        <label htmlFor="subject" className="block mb-2">Subject</label>
        <input
    type="text"
    id="subject"
    name="subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full p-2 border rounded-md"
    placeholder="Enter subject name"
  />
      </div>

      <div>
        <label htmlFor="teacher" className="block mb-2">Teacher</label>
        <select
    id="teacher"
    name="teacher"
    value={teacher}
    onChange={(e) => setTeacher(e.target.value)}
    className="w-full p-2 border rounded-md"
  >
          <option value="">Select Teacher</option>
          {teachersData.map((teacherData) => <option key={teacherData.id} value={teacherData.name}>
              {teacherData.name}
            </option>)}
        </select>
      </div>

      <div>
        <label htmlFor="assistantTeacher" className="block mb-2">Assistant Teacher</label>
        <select
    id="assistantTeacher"
    name="assistantTeacher"
    value={assistantTeacher}
    onChange={(e) => setAssistantTeacher(e.target.value)}
    className="w-full p-2 border rounded-md"
  >
          <option value="">Select Assistant Teacher</option>
          {teachersData.map((teacherData) => <option key={teacherData.id} value={teacherData.name}>
              {teacherData.name}
            </option>)}
        </select>
      </div>

      <button type="submit" className="bg-lamaYellow text-gray-800 py-2 px-4 rounded-md border-none w-max self-center">
        {type === "create" ? "Create Subject" : "Update Subject"}
      </button>
    </form>;
};
export default SubjectForm;
