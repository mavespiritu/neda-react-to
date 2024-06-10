import { createFileRoute } from '@tanstack/react-router'
import TravelOrders from "../pages/TravelOrders"

export const Route = createFileRoute('/travelOrders')({
  component: ListTravelOrdersComponent,
})

function ListTravelOrdersComponent(){
  return <TravelOrders />
}