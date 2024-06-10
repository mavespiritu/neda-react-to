import { capitalize } from "@/lib/functions";
import { Button } from "../ui/button"
import { Link } from "@tanstack/react-router";

interface EmptyTableProps {
    name: string,
    addLink: string
}

const EmptyTable = ({ name, addLink }: EmptyTableProps) => {
  return (
    <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" 
        >
        <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
                {`You have no ${name}s`}
            </h3>
            <p className="text-sm text-muted-foreground">
                {`You can start managing your content as soon as you add ${name}`}.
            </p>
            <Link to={addLink}>
                <Button className="mt-4">{`Add ${capitalize(name)}`}</Button>
            </Link>
        </div>
    </div>
  )
}

export default EmptyTable