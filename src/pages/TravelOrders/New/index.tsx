import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Form from "../Form"

import { initialValues } from "../validation"

const New = () => {

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
          <CardTitle>Add New Travel Order</CardTitle>
          <CardDescription>Accomplish the form below to add new travel order</CardDescription>
      </CardHeader>
      <CardContent>
        <Form initialValues={initialValues} />
      </CardContent>
    </Card>
  )
}

export default New