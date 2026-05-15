import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { messagesData } from "@/lib/data";

const columns = [
  { header: "From", accessor: "from" },
  { header: "Subject", accessor: "subject" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "read" },
];

export default function MessagesListPage() {
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4 font-medium">{item.from}</td>
      <td>{item.subject}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            item.read ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.read ? "Read" : "Unread"}
        </span>
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 text-gray-800">
      <section className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Messages</h1>
        <TableSearch />
      </section>
      <Table columns={columns} renderRow={renderRow} data={messagesData} />
      <Pagination />
    </section>
  );
}
