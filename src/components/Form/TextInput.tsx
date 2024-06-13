import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalidMessage?: string;
}

const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  ({ name, value, onChange, invalidMessage }, ref) => {
    return (
      <div ref={ref} className="w-full">
        <Input 
          name={name} 
          value={value} 
          onChange={onChange} 
          className={cn("w-full", invalidMessage ? 'border-red-500' : '')} 
        />
      </div>
    );
  }
);

export default TextInput