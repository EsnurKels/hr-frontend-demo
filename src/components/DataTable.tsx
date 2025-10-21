import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  data: Record<string, any>[];
  columns: Column[];
}

export default function DataTable({ data, columns }: DataTableProps) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Veri bulunamadı.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-100 rounded-sm">
      <table className="min-w-full text-sm text-left text-black">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 border-b border-gray-300">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-300 border-b border-gray-300 transition"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {col.key === "cvPath" ? (
                    item[col.key] ? (
                      <a
                        href={`http://localhost:3000/uploads/${item[col.key]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white transition"
                      >
                        <FontAwesomeIcon icon={faFilePdf} />
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Yok</span>
                    )
                  ) : col.key === "phone" ? (
                    item.phone ? `0${item.phone}` : ""
                  ) : (
                    String(item[col.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
