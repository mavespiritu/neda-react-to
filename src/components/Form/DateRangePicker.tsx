import { useState, forwardRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  onChange: (dateRange: DateRange | undefined) => void;
}

const DateRangePicker = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & DateRangePickerProps>(
  ({ className, onChange }, ref) => {
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(),
    })

    const handleSelectDateRange = (dateRange: DateRange | undefined) => {
      setSelectedDateRange(dateRange)
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
                "w-full justify-start text-left font-normal",
                !selectedDateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDateRange && selectedDateRange?.from ? (
                selectedDateRange.to ? (
                  <>
                    {format(selectedDateRange.from, "MMMM d, y")} -{" "}
                    {format(selectedDateRange.to, "MMMM d, y")}
                  </>
                ) : (
                  format(selectedDateRange.from, "MMMM d, y")
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
              defaultMonth={selectedDateRange?.from}
              selected={selectedDateRange}
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