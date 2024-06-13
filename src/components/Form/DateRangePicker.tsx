import { useState, forwardRef } from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  onChange: (dateRange: DateRange | undefined) => void,
  value: DateRange | undefined,
  invalidMessage?: string
}

const DateRangePicker = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & DateRangePickerProps>(
  ({ 
    className, 
    onChange,
    value,
    invalidMessage
  }, ref) => {

    const [date, setDate] = useState<DateRange | undefined>(value)

    const handleSelectDateRange = (dateRange: DateRange | undefined) => {
      setDate(dateRange)
      onChange(dateRange)
    }

    return (
      <div ref={ref} className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                `w-full justify-start text-left font-normal ${invalidMessage ? 'border-red-500' : ''}`,
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelectDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

export default DateRangePicker
