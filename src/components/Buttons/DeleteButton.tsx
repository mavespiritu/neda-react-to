import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { 
    Trash2
   } from "lucide-react"

const DeleteButton = () => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button
            variant="destructive"
            className="ml-auto h-8 gap-2"
            >
            <Trash2 className="h-4 w-4" />
            <span className="hidden md:block">Delete</span>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item and remove the data from our server.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="h-8">Cancel</AlertDialogCancel>
            <AlertDialogAction className="h-8">Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton