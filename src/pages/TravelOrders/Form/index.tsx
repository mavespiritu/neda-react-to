import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  formSchema, 
} from "../validation"

import { Button } from "@/components/ui/button"
import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import SingleComboBox from "@/components/Form/SingleComboBox"
import DateRangePicker from "@/components/Form/DateRangePicker"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import MultipleComboBox from "@/components/Form/MultipleComboBox"
import { useEffect, useState } from "react"
import { TravelOrder } from "@/data/travelOrders"
import { format } from "date-fns"

type FormProps = {
  initialValues?: TravelOrder
}

const Form = ({ initialValues }: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ? { ...initialValues } : {},
  })

  const travelTypes = [
    {
      value: "Meeting",
      label: "Meeting",
    },
    {
      value: "Conference",
      label: "Conference",
    },
    {
      value: "Seminar",
      label: "Seminar",
    },
  ]

  const staffs = [
    {
      value: "020593",
      label: "Mark Anthony Espiritu",
      recom: "Arnel Palabay",
      final: "Irenea Ubungen" 
    },
    {
      value: "110923",
      label: "Daphne Meir Abat",
      recom: "Rey Ferreria",
      final: "Irenea Ubungen" 

    },
    {
      value: "258784",
      label: "Jeremy Raphael Garcia",
      recom: "Caroline Castro",
      final: "Irenea Ubungen" 
    },
    {
      value: "112433",
      label: "Allan Oliva",
      recom: "Caroline Castro",
      final: "Irenea Ubungen" 
    },
    {
      value: "343444",
      label: "Dainty Love Aquino",
      recom: "Ednore Freynon Perez",
      final: "Irenea Ubungen" 
    },
    {
      value: "144222",
      label: "Christian Campos",
      recom: "Arnel Palabay",
      final: "Irenea Ubungen" 
    },
    {
      value: "533434",
      label: "Juvy Anne Tadiarca",
      recom: "Rey Ferreria",
      final: "Irenea Ubungen" 
    },
    {
      value: "223444",
      label: "Arnel Palabay",
      recom: "Irenea Ubungen",
      final: "Stephanie Christiansen" 
    },
  ]

  const approvers = [
    {
      name: "Stephanie Christiansen",
      position: "Regional Director",
    },
    {
      name: "Irenea Ubungen",
      position: "Assistant Regional Director",

    }
  ]

  const [selectedStaffs, setSelectedStaffs] = useState<string[]>([])
  const [selectedDates, setSelectedDates] = useState<string>('')
  const [recommendingApprovals, setRecommendingApprovals] = useState<string[]>([])
  const [selectedApprover, setSelectedApprover] = useState<{ name: string, position: string } | null>(null)

  useEffect(() => {
    console.log("Initial Values:", initialValues);
    console.log("Staffs from initialValues:", initialValues?.staffs);
    console.log("Staffs from form:", form.getValues("staffs"));
  }, [form, initialValues])

  const handleStaffsChange = (selectedItems: string[]) => {
    setSelectedStaffs(selectedItems)
    updateRecommendingApprovals(selectedItems)
    updateFinalApprover(selectedItems)
  }

  const handleDateRangeChange = (selectedDateRange: any) => {
    if (selectedDateRange) {
      const { from, to } = selectedDateRange;
      const formattedStartDate = `${format(from, "yyyy-MM-dd")}`
      const formattedEndDate = to ? `${format(to, "yyyy-MM-dd")}` : formattedStartDate
      const formattedDateRangeDisplay = to ? from.getTime() === to.getTime() ? `${format(from, "MMMM d, y")}` : `${format(from, "MMMM d, y")} to ${format(to, "MMMM d, y")}` : `${format(from, "MMMM d, y")}`
      form.setValue("start_date", formattedStartDate)
      form.setValue("end_date", formattedEndDate)
      setSelectedDates(formattedDateRangeDisplay)
    }
  }
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const updateRecommendingApprovals = (selectedStaffs: string[]) => {
    const newApprovals = selectedStaffs.map((staffValue) => {
      const staff = staffs.find((s) => s.value === staffValue)
      return staff ? staff.recom : '';
    }).filter((approval, index, self) => approval && self.indexOf(approval) === index)

    setRecommendingApprovals(newApprovals)
  }

  const updateFinalApprover = (selectedStaffs: string[]) => {
    const approversSet = new Set<string>()
    selectedStaffs.forEach(staffValue => {
      const staff = staffs.find((s) => s.value === staffValue)
      if (staff) {
        approversSet.add(staff.final)
      }
    })
    const finalApprover = approvers.find(approver => approversSet.has(approver.name)) || null
    setSelectedApprover(finalApprover)
  }

  const emptyPersonnelDivsCount = Math.max(0, 7 - selectedStaffs.length)
  const emptyPersonnelDivs = Array.from({ length: emptyPersonnelDivsCount }, (_, index) => (
    <div key={`personnel-empty-${index}`} className="border-b border-black w-full h-6"></div>
  ))

  const personnelSection = selectedStaffs.map((staffId) => {
    
    const selectedStaff = staffs.find((staff) => staff.value === staffId)

    return (
      <div key={selectedStaff?.value} className="border-b border-black w-full">
        <small>{selectedStaff?.label}</small>
      </div>
    )
  })

  const emptyRecommendingDivsCount = Math.max(0, 7 - recommendingApprovals.length)
  const emptyRecommendingDivs = Array.from({ length: emptyRecommendingDivsCount }, (_, index) => (
    <div key={`recommending-empty-${index}`} className="border-b border-black w-full h-6"></div>
  ))

  const recommendingApprovalSection = recommendingApprovals.map((approval) => (
    <div key={approval} className="border-b border-black w-full">
      <small>{approval}</small>
    </div>
  ))

  return (
    <div className="flex gap-6">
      <div className="flex-1 lg:w-1/2">
        <FormComponent {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Travel</FormLabel>
                  <FormControl>
                    <DateRangePicker {...field} onChange={handleDateRangeChange} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="staffs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff Included</FormLabel>
                  <FormControl>
                    <MultipleComboBox {...field} items={staffs} onChange={handleStaffsChange} name="employee"/>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="travel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Type</FormLabel>
                  <FormControl>
                    <SingleComboBox {...field} items={travelTypes} name="travel type"/>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="withVehicle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                      <Label>Request vehicle?</Label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost">Discard</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormComponent>
      </div>
      <div className="flex-1 flex-col hidden xl:flex lg:w-1/2 border rounded p-8 gap-y-6">
          <div className="flex flex-col text-center">
            <small>Republic of the Philippines</small>
            <small className="font-semibold">NATIONAL ECONOMIC AND DEVELOPMENT AUTHORITY</small>
            <small>Regional Office 1</small>
            <small>Guerrero Road, City of San Fernando, La Union</small>
            <small className="border-2 border-black p-1 w-1/4 mx-auto mt-2 font-semibold">TRAVEL ORDER NO. </small>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end items-end gap-2">
              <small className="text-right">Date:</small>
              <div className="border-b border-black w-[100px]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-1 gap-2">
              <small>To:</small>
              <div className="border-b border-black w-full">
                <small className="font-semibold">CONCERNED STAFF</small>
              </div>
            </div>
            <div className="flex flex-1 gap-2">
              <small>Purpose:</small>
              <div className="border-b border-black w-full">
                <small className="break-all">{form.watch('purpose')}</small>
              </div>
            </div>
            <div className="flex flex-1 gap-2">
              <small>Destination:</small>
              <div className="border-b border-black w-full"></div>
            </div>
          </div>
          <small>1. The following personnel of this Authority are hereby authorized to proceed to official destination on <span className="font-semibold underline">{selectedDates}</span></small>
          <div className="flex flex-1 justify-between gap-2">
            <div className="flex flex-1 flex-col">
              <small className="font-semibold">PERSONNEL</small>
              {personnelSection}
              {emptyPersonnelDivs}
            </div>
            <div className="flex flex-1 flex-col">
              <small className="font-semibold">RECOMMENDING APPROVAL</small>
              {recommendingApprovalSection}
              {emptyRecommendingDivs}
            </div>
          </div>
          <small>2. Per approved Itinerary of Travel, expenses are hereby authorized, subject to availability of funds and the usual accounting and auditing rules and regulations, chargeable against the fund of the:</small>
          <small className="flex justify-center font-semibold underline">NEDA REGIONAL OFFICE 1</small>
          <small>3. Upon completion of the travel, the Certificate of Appearance, Certificate of Travel Completed and a Report on the purpose shall be submitted to the office.</small>
          <small className="font-semibold ml-32">APPROVED:</small>
          <div className="flex flex-col items-center">
            <small className="font-semibold underline">{selectedApprover?.name}</small>
            <small>{selectedApprover?.position}</small>
          </div>
      </div>
    </div>
  )
}

export default Form