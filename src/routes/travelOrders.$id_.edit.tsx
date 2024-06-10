import { travelOrders } from '@/data/travelOrders'
import Edit from '@/pages/TravelOrders/Edit'
import { 
  ErrorComponent,
  ErrorComponentProps,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute('/travelOrders/$id/edit')({
  loader: async ({ params: { id } }) => {
    const travelOrder = travelOrders.find(to => to.id === parseInt(id, 10));
    if (!travelOrder) {
      throw new Error('Travel Order not found');
    }
    return travelOrder;
  },
  errorComponent: TravelOrderErrorComponent as any,
  notFoundComponent: () => {
    return <p>Travel Order not found</p>
  },
  component: EditTravelOrderComponent,
})

export function TravelOrderErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function EditTravelOrderComponent(){
  const travelOrder = Route.useLoaderData()

  return <Edit travelOrder={travelOrder} />
}