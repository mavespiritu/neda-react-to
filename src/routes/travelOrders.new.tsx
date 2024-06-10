import New from '@/pages/TravelOrders/New'
import { 
  ErrorComponent,
  ErrorComponentProps,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute('/travelOrders/new')({
  component: NewTravelOrderComponent,
})

export function TravelOrderErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function NewTravelOrderComponent(){
  
  return <New />
}