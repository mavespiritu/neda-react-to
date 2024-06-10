import Breadcrumbs from "@/components/Breadcrumbs"

import ProtectedWrapper from "@/components/Wrappers/ProtectedWrapper"
import List from "./List"
import { Outlet, useLocation, useMatches } from "@tanstack/react-router"
import { travelOrders } from "@/data/travelOrders";

interface Crumb {
  name: string;
  to: string;
}

const setCrumb = (pathname: string) : Crumb[] => {

  let crumb: Crumb[] = []

  if (pathname==='/travelOrders') {
    crumb = [
      {
        name: 'All Travel Orders',
        to: pathname
      }
    ]
  }

  if (pathname==='/travelOrders/new') {
    crumb = [
        {
          name: 'All Travel Orders',
          to: '/travelOrders'
        },
        {
          name: 'Add New Travel Order',
          to: pathname
        }
      ]
  }

  if (pathname.includes('/travelOrders/') && !pathname.includes('/travelOrders/new')) {
    const travelOrderId = pathname.split('/').pop(); // Get the resolution ID from the pathname
    const travelOrder = travelOrders.find(to => to.id.toString() === travelOrderId);
    
    if(travelOrder){
      crumb = [
        {
          name: 'All Travel Orders',
          to: '/travelOrders'
        },
        {
          name: `Travel Order No. ${travelOrder.reference_no}`,
          to: pathname
        }
      ]
    }
  }

  if (pathname.includes('/travelOrders/') && pathname.includes('/edit')) {

    const segments = pathname.split('/');
    const travelOrderId = segments[segments.length - 2]; // Get the resolution ID from the pathname
    const travelOrder = travelOrders.find((to) => to.id.toString() === travelOrderId);

    if(travelOrder){
      crumb = [
        {
          name: 'All Travel Order',
          to: '/travelOrders'
        },
        {
          name: `Edit Travel Order No. ${travelOrder.reference_no}`,
          to: `/travelOrders/${travelOrderId}/edit`,
        }
      ]
    }
  }

  return crumb
  
}

const TravelOrders = () => {

  const matches = useMatches()
  const hasNestedRoute = matches.length > 2
  const location = useLocation()

  return (
    <ProtectedWrapper>
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Travel Orders</h1>
            <Breadcrumbs
              items={setCrumb(location.pathname)}
            />
        </div>
        {
          hasNestedRoute ? 
            <Outlet /> :
            <List />
        }
    </ProtectedWrapper>
  )
}

export default TravelOrders