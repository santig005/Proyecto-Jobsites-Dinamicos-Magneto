import React from "react";

//import data from "../assets/data.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";


function TableAdmin({ data,onDownload,onApproval,onRejection }) {
  const columns = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Empresa",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "approval_status",
      header: "Estado de aprobación",
      cell: ({ getValue }) => {
        const value = getValue();
        let bgColor, textColor;
      
        switch (value) {
          case "Aprobado":
            bgColor = "bg-green-100";
            textColor = "text-green-800";
            break;
          case "Rechazado":
            bgColor = "bg-red-100";
            textColor = "text-red-800";
            break;
          case "Pendiente":
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-800";
            break;
          default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-800";
        }
      
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "checked",
      header: "Revisión",
      cell: ({ getValue }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            getValue()
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {getValue() ? "Revisado" : "Pendiente"}
        </span>
      ),
    },
    {
      accessorKey: "edition_date",
      header: "Fecha de edicion",
    },
  ];

  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-x-auto px-4 py-6 max-w-7xl mx-auto">
      <table className="w-full max-w-7xl mx-auto divide-y divide-gray-200 rounded-lg bg-white shadow-md">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
                    index === 0 ? "rounded-tl-lg" : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {
                      asc: "↑",
                      desc: "↓",
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
              <th
                key="acciones"
                scope="col"
                className="w-230 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 rounded-tr-lg"
              >
                Acciones
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td className="px-6 py-4 whitespace-nowrap" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {data[row.id].checked ?
                  (
                    <div>
                      <button className="inline-flex items-center justify-center bg-blue-500 bg-opacity-40 hover:bg-opacity-70 text-blue-800 text-xs font-bold py-1 px-2 rounded mr-2" onClick={() => onDownload(data[row.id]._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v12m0 0l-3-3m3 3l3-3m-6 6h6"
                    />
                  </svg>
                  Revisar
                </button>
                      <button
                  className="inline-flex items-center justify-center bg-green-500 bg-opacity-40 hover:bg-opacity-70 text-green-700 text-xs font-bold py-1 px-2 rounded mr-2" onClick={() => onApproval(data[row.id]._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Aprobar
                </button>
                <button className="inline-flex items-center justify-center bg-red-500 bg-opacity-30 hover:bg-opacity-60 text-red-500 text-xs font-bold py-1 px-2 rounded mr-2" onClick={() => onRejection(data[row.id]._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Rechazar
                </button>
                    </div>
                  ) : (
                    <div>
                      <button className="inline-flex items-center justify-center bg-blue-500 bg-opacity-40 hover:bg-opacity-70 text-blue-800 text-xs font-bold py-1 px-2 rounded" onClick={() => onDownload(data[row.id]._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v12m0 0l-3-3m3 3l3-3m-6 6h6"
                    />
                  </svg>
                  Revisar
                </button>
                    </div>
                  )
                  
                }
                
                
                {/* <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14l4 4-.01-4z"
                    />
                  </svg>
                  Comentar
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}

      <div className="flex justify-between items-center max-w-7xl mt-1 mr-1 text-sm px-2 py-2">
        <span className="flex items-center gap-1">
          Ir a página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="bg-transparent first-line:ml-1 w-14 p-1 border border-gray-300 rounded-md text-black"
          />
        </span>

        <div className="flex items-center gap-1">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-transparent p-1 border border-gray-300 rounded-md text-black"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
          <span className="flex items-center gap-1">
            <div>Página</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="p-1 border border-gray-300 rounded-md text-black disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="p-1 border border-gray-300 rounded-md text-black disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableAdmin;
