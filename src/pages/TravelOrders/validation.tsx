import { z } from "zod"

export const formSchema = z.object({
    travel_type: z.string({
        required_error: "Travel type is required"
    }),
    purpose: z.string({
        required_error: "Purpose is required"
    }),
    start_date: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Invalid date!",
    }),
    end_date: z.string({
        required_error: "End date is required",
        invalid_type_error: "Invalid date!",
    }),
    withVehicle: z.boolean(),
    staffs: z.array(z.string()).nonempty("Employees cannot be empty")
})

export const initialValues = {
    travel_type: '',
    purpose: '',
    start_date: '',
    end_date: '',
    withVehicle: false,
    staffs: []
  }