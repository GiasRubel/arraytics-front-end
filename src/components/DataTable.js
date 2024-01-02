import React from "react";
import "./table.css";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import FilterFunction from "./FilterFunction";

const DataTable = ({ addressBooks, title, columnDefWithFilter }) => {
  const finalData = React.useMemo(() => addressBooks, []);
  const finalColumnDef = React.useMemo(() => columnDefWithFilter, []);
  const defaultColumn = React.useMemo(() => {
    return {
      youTubeProp: "hello world",
    };
  }, []);

  const [columnFilters, setColumnFilters] = React.useState([]);
  const [filtering, setFiltering] = React.useState("");

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: columnFilters,
      globalFilter: filtering,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChanged: setFiltering,
  });

  const shouldShowPagination = finalData.length > 10;

  //   console.log("test", tableInstance.getHeaderGroups());

  React.useEffect(() => {
    //console.log(tableInstance.getState().columnFilters);
  });


  return (
    <>
      <input
          className="inputSearch"
          placeholder={'Please search'}
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
      />
      <hr />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                          {columnEl.column.getCanFilter() ? (
                            <div>
                              <FilterFunction
                                column={columnEl.column}
                                table={tableInstance}
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />

      {shouldShowPagination && (
          <div>
            <button
                onClick={() => tableInstance.setPageIndex(0)}
                disabled={!tableInstance.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
                onClick={() => tableInstance.previousPage()}
                disabled={!tableInstance.getCanPreviousPage()}
            >
              Previous Page
            </button>
            <button
                onClick={() => tableInstance.nextPage()}
                disabled={!tableInstance.getCanNextPage()}
            >
              Next Page
            </button>
            <button
                onClick={() =>
                    tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
                }
                disabled={!tableInstance.getCanNextPage()}
            >
              {">>"}
            </button>
            <hr />
            <ul className="pagination-info">
              <li>
                You are on page number:{" "}
                {tableInstance.options.state.pagination.pageIndex + 1}
              </li>
              <li>Total pages: {tableInstance.getPageCount()}</li>
            </ul>
          </div>
      )}

    </>
  )
};

export default DataTable;
