import { z } from "zod"

export const formSchema = z.object({
    travel_type: z.string().min(1, { message: "Travel type is required" }),
    purpose: z.string().min(1, { message: "Purpose is required" }),
    travel_date: z.object(
        {
            from: z.date(),
            to: z.date(),
        },
        {
          required_error: "Please select a date range",
        }
      ),
    withVehicle: z.boolean().optional(),
    staffs: z.array(z.string()).min(1, { message: "Must include at least one employee" })
    })

export const initialValues = {
    id: 0,
    reference_no: '',
    travel_type: '',
    purpose: '',
    travel_date: {
        from: '',
        to: '',
    },
    end_date: '',
    created_by: '',
    date_created: '',
    withVehicle: false,
    staffs: []
}