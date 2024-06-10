import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { TravelOrder } from "@/data/travelOrders"
import Form from "../Form"

const Edit = ({travelOrder}:{travelOrder: TravelOrder}) => {

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
          <CardTitle>Edit Travel Order No. {travelOrder.reference_no}</CardTitle>
          <CardDescription>Accomplish the form below to edit the travel order</CardDescription>
      </CardHeader>
      <CardContent>
        <Form initialValues={travelOrder} />
      </CardContent>
    </Card>
  )
}

export default Edit