import { lazy, Suspense, useState } from "react";
const TeacherForm = lazy(() => import("./forms/TeacherForm"));
const StudentForm = lazy(() => import("./forms/StudentForm"));
const ParentForm = lazy(() => import("./forms/ParentForm"));
const SubjectForm = lazy(() => import("./forms/SubjectForm"));
const PlaceholderForm = ({ table }) => <h1 className="text-center text-gray-500">{table} Form Coming Soon</h1>;
const forms = {
  teacher: (type, data) => <Suspense fallback={<h1>Loading...</h1>}>
      <TeacherForm type={type} data={data} />
    </Suspense>,
  student: (type, data) => <Suspense fallback={<h1>Loading...</h1>}>
      <StudentForm type={type} data={data} />
    </Suspense>,
  parent: (type, data) => <Suspense fallback={<h1>Loading...</h1>}>
      <ParentForm type={type} data={data} />
    </Suspense>,
  subject: (type, data) => <Suspense fallback={<h1>Loading...</h1>}>
      <SubjectForm type={type} data={data} />
    </Suspense>,
  class: () => <PlaceholderForm table="Class" />,
  lesson: () => <PlaceholderForm table="Lesson" />,
  exam: () => <PlaceholderForm table="Exam" />,
  assignment: () => <PlaceholderForm table="Assignment" />,
  result: () => <PlaceholderForm table="Result" />,
  attendance: () => <PlaceholderForm table="Attendance" />,
  message: () => <PlaceholderForm table="Message" />,
  event: () => <PlaceholderForm table="Event" />,
  announcement: () => <PlaceholderForm table="Announcement" />
};
const FormModal = ({
  table,
  type,
  data,
  id
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" : "bg-lamaPurple";
  const [open, setOpen] = useState(false);
  const Form = () => {
    if (type === "delete" && id) {
      return <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>;
    }
    if ((type === "create" || type === "update") && forms[table]) {
      return forms[table](type, data);
    }
    return <span className="text-center text-red-500">Form not found!</span>;
  };
  return <>
      <button
    className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
    onClick={() => setOpen(true)}
  >
        <img src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] text-gray-800">
            <Form />
            <div
    className="absolute top-4 right-4 cursor-pointer"
    onClick={() => setOpen(false)}
  >
              <img src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>}
    </>;
};
export default FormModal;
