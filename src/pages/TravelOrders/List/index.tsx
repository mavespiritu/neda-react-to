import { travelOrders } from "../../../data/travelOrders"
import { columns } from "../../../models/TravelOrder/columns"
import { DataTable } from "../../../components/DataTable/DataTable"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EmptyTable from "@/components/DataTable/EmptyTable"

const List = () => {
  
  return (
    <Card className="flex flex-col flex-1">
        <CardHeader>
            <CardTitle>All Travel Orders</CardTitle>
            <CardDescription>Manage and view travel order details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          {travelOrders.length > 0 ? (
            <DataTable columns={columns} data={travelOrders} addLink="/travelOrders/new" />
          ) : (
            <EmptyTable name="travel order" addLink="/travelOrders/new" />
          )}
        </CardContent>
    </Card>
  )
}

export default List