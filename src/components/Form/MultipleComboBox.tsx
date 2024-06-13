import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useState, forwardRef } from "react"
import { Separator } from "../ui/separator"

interface Item {
    value: string;
    label: string;
}

interface MultipleComboBoxProps {
    items: Item[],
    name: string,
    onChange: (selectedItems: string[]) => void,
    value: string[],
    invalidMessage?: string
}

const MultipleComboBox = forwardRef<HTMLDivElement, MultipleComboBoxProps>(
  ({ 
    items,
    name,
    onChange,
    value,
    invalidMessage
   }, ref) => {
    
      const [open, setOpen] = useState<boolean>(false)
      const [selectedValues, setSelectedValues] = useState<string[]>(value)
      const [inputValue, setInputValue] = useState<string>("")
    
      const toggleSelection = (currentValue: string) => {
        const updatedValues = selectedValues.includes(currentValue)
          ? selectedValues.filter((value) => value !== currentValue)
          : [...selectedValues, currentValue];
        setSelectedValues(updatedValues)
        onChange(updatedValues)
      }

      const toggleSelectAll = () => {
        const updatedValues =
          selectedValues.length === items.length
            ? []
            : items.map((item) => item.value);
        setSelectedValues(updatedValues)
        onChange(updatedValues)
      }

      const getToggleLabel = () => {
        return selectedValues.length === items.length ? 'Deselect All' : 'Select All';
      }
    
      const getButtonLabel = () => {
        if (selectedValues.length === 0) return `Select ${name}s...`
        if (selectedValues.length === 1) {
          const selectedItem = items.find(
            (item) => item.value === selectedValues[0]
          )
          return selectedItem ? selectedItem.label : `Select ${name}s...`
        }
        return `${selectedValues.length} selected`
      }

      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )

  return (
    <div ref={ref}>
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
          <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`justify-between w-full ${invalidMessage ? 'border-red-500' : ''}`}
          >
              {getButtonLabel()}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
          <Command>
              <CommandInput 
                placeholder={`Select ${name}...`} 
                onValueChange={setInputValue}
                value={inputValue}
              />
              <CommandList>
                <CommandItem
                  value="toggle-select"
                  onSelect={() => {
                    toggleSelectAll();
                    setOpen(false); // Close the popover after toggling
                  }}
                  className="text-right"
                >
                  {getToggleLabel()}
                </CommandItem>
                <Separator />
                <CommandEmpty>{`No ${name}s found`}</CommandEmpty>
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item.label}
                      value={item.label}
                      onSelect={() => {
                        toggleSelection(item.value)
                        // Do not close the popover on select
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(item.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
          </Command>
          </PopoverContent>
      </Popover>
    </div>
  )
}
)

export default MultipleComboBox