"use client"

import { Input } from "../ui/input"

import { 
    Search
   } from "lucide-react"

import { Table } from "@tanstack/react-table"
import { useState } from "react"

interface DataTableSearchProps<TData> {
  table: Table<TData>,
}


export function DataTableSearch<TData>({
    table,
}: DataTableSearchProps<TData>) {

const [globalFilter, setGlobalFilter] = useState("")

return (
    <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            placeholder="Type to search..."
            value={globalFilter}
            onChange={(event) => {
                const value = event.target.value
                setGlobalFilter(value)
                table.setGlobalFilter(value)
                }
            }
            className="pl-8 sm:w-full md:w-[200px] lg:w-[300px]"
        />
    </div>
)
}
