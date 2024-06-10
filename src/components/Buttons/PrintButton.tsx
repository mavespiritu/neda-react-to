import { Button } from "@/components/ui/button"
import { 
    Printer
   } from "lucide-react"

const PrintButton = () => {
  return (
    <Button
    variant="outline"
    className="ml-auto h-8 gap-2"
    >
        <Printer className="h-4 w-4" />
    <span className="hidden md:block">Print</span>
    </Button>
  )
}

export default PrintButton