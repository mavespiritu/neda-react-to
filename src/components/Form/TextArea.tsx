import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalidMessage?: string;
}

const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ name, value, onChange, invalidMessage }, ref) => {
    return (
      <div ref={ref} className="w-full">
        <Textarea 
          name={name} 
          value={value} 
          onChange={onChange} 
          className={cn("w-full", invalidMessage ? 'border-red-500' : '')} 
        />
      </div>
    );
  }
);

export default TextArea