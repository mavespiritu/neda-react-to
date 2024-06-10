import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Form from "../Form"

const New = () => {

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
          <CardTitle>Add New Travel Order</CardTitle>
          <CardDescription>Accomplish the form below to add new travel order</CardDescription>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default New