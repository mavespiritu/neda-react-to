import { travelOrders } from '@/data/travelOrders'
import View from '@/pages/TravelOrders/View'
import { 
  ErrorComponent,
  ErrorComponentProps,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute('/travelOrders/$id')({
  loader: async ({ params: { id } }) => {
    const travelOrder = travelOrders.find(to => to.id === parseInt(id, 10));
    if (!travelOrder) {
      throw new Error('Resolution not found');
    }
    return travelOrder;
  },
  errorComponent: TravelOrderErrorComponent as any,
  notFoundComponent: () => {
    return <p>Travel Order not found</p>
  },
  component: TravelOrderComponent,
})

export function TravelOrderErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function TravelOrderComponent(){
  const travelOrder = Route.useLoaderData()

  return <View travelOrder={travelOrder} />
}