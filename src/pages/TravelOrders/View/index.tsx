import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DateRange from "@/utils/DateRange"

import { TravelOrder } from "@/data/travelOrders"
import { Button } from "@/components/ui/button"
import { 
  FilePenLine,
 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import DeleteButton from "@/components/Buttons/DeleteButton"
import PrintButton from "@/components/Buttons/PrintButton"

const View = ({ travelOrder }:{ travelOrder: TravelOrder }) => {

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span>Resolution No. {travelOrder.reference_no}</span>
              <div className="flex gap-2">
              <Link to={`/travelOrders/${travelOrder.id}/edit`}>
                <Button
                  variant="outline"
                  className="ml-auto h-8 gap-2"
                >
                  <FilePenLine className="h-4 w-4" />
                  <span className="hidden md:block">Edit</span>
                </Button>
              </Link>
              <PrintButton />
              <DeleteButton />
              </div>
            </div>
          </CardTitle>
          <CardDescription>Read here the details of the resolution</CardDescription>
      </CardHeader>
      <CardContent>
        <small className="text-sm font-medium leading-none">
          Date: {<DateRange startDate={travelOrder.start_date} endDate={travelOrder.end_date} />} <br/>
          {travelOrder.purpose}
        </small>
      </CardContent>
    </Card>
  )
}

export default View