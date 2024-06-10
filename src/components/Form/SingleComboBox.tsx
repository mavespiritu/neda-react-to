import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState, forwardRef } from "react";

interface Item {
  value: string,
  label: string
}

interface SingleComboBoxProps {
  items: Item[],
  name: string,
  onChange: (selectedItem: string | null) => void
}

const SingleComboBox = forwardRef<HTMLDivElement, SingleComboBoxProps>(
  ({ items, name, onChange }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const toggleSelection = (currentValue: string) => {
      setSelectedValue((prevValue) => (prevValue === currentValue ? null : currentValue));
      setOpen(false); // Close the popover after selection
      onChange(currentValue === selectedValue ? null : currentValue)
    };

    return (
      <div ref={ref}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full"
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              {selectedValue ? items.find((item) => item.value === selectedValue)?.label : `Select ${name}...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={`Select ${name}...`} />
              <CommandList>
                <CommandEmpty>{`No ${name} found`}</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => toggleSelection(item.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValue === item.value ? "opacity-100" : "opacity-0"
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
    );
  }
);

export default SingleComboBox