import { ColumnDef } from "@tanstack/react-table"
import { TravelOrder } from "@/data/travelOrders"
import DateRange from "@/utils/DateRange"
import SingleDate from "@/utils/SingleDate"
 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Eye,
    FilePenLine,
    Trash2,
    MoreHorizontal,
    Printer
  } from "lucide-react"
import { DataTableColumnHeader } from "@/components/DataTable/DataColumnHeader"
import { Link } from "@tanstack/react-router"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<TravelOrder>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="rounded"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="rounded"
        />
        ),
        enableSorting: false,
        enableHiding: false,
  },
  {
    accessorKey: "reference_no",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Reference No."/>
        )
    },
    cell: ({row}) => {
        const travelOrder = row.original

        return <span>{travelOrder.reference_no}</span>
    },
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Purpose" />
        )
    },
    cell: ({row}) => {
        const travelOrder = row.original

        return <div className="leading-loose font-semibold truncate max-w-[500px]"><Badge variant="outline">{travelOrder.travel_type}</Badge> {travelOrder.purpose}</div>
    }
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Travel Date" className="hidden md:table-cell" />
        )
    },
    cell: ({row}) => {
        const travelOrder = row.original
        return <span className="hidden md:table-cell"><DateRange startDate={travelOrder.start_date} endDate={travelOrder.end_date} /></span>
    }
  },
  {
    accessorKey: "withVehicle",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Requesting Vehicle?" className="hidden md:table-cell" />
        )
    },
    cell: ({row}) => {
        const travelOrder = row.original

        return <span className="hidden md:table-cell">{travelOrder.withVehicle ? 'Yes' : 'No'}</span>
    }
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Created By" className="hidden md:table-cell" />
        )
    },
    cell: ({row}) => {
      return <span className="hidden md:table-cell">{row.getValue("created_by")}</span>
  }
  },
  {
    accessorKey: "date_created",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Date Created" className="hidden md:table-cell" />
        )
    },
    cell: ({row}) => {
        return <span className="hidden md:table-cell"><SingleDate selectedDate={row.getValue("date_created")} /></span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const travelOrder = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {/* <DropdownMenuLabel className="text-base">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" /> */}
            <Link to="/travelOrders/$id" params={{ id: String(travelOrder.id) }} >
              <DropdownMenuItem className="gap-2">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
              </DropdownMenuItem>
            </Link>
            <Link to={`/travelOrders/${travelOrder.id}/edit`}>
              <DropdownMenuItem className="gap-2">
                <FilePenLine className="h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="gap-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(travelOrder.reference_no)}
            >
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Reference No.</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="gap-2">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]