"use client"
import { 
    useState 
  } from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


import { DataTablePagination } from "./DataTablePagination"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { Button } from "../ui/button"
import { 
  CirclePlus,
  File,
 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { DataTableSearch } from "./DataTableSearch"
   
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    addLink: string
  }
   
  export function DataTable<TData, TValue>({
    columns,
    data,
    addLink
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
   
    return (
      <div>
        <div className="flex items-center justify-between py-4 gap-2">
            <DataTableSearch table={table} />
          <div className="flex justify-around gap-2">
            <DataTableViewOptions table={table} />
            <Button 
              variant="outline"
              className="ml-auto h-8 gap-2"
            >
              <File className="h-4 w-4" />
              <span className="hidden md:block">Export</span>
            </Button>
            <Link to={addLink}>
              <Button 
                className="ml-auto h-8 gap-2"
              >
                <CirclePlus className="h-4 w-4" />
                <span className="hidden md:block">Add New</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
    </div>
    )
  }