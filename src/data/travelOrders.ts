
export type TravelOrder = {
    id: number
    reference_no: string
    purpose: string
    travel_type: string
    travel_date: {
        from: any,
        to?: any
    }
    withVehicle: boolean
    created_by: string
    date_created: string,
    staffs: string[]
  }

export const travelOrders: TravelOrder[] = [
    {
        "id": 1,
        "reference_no": "20240181",
        "purpose": "To attend training on Data Awareness and Fundamentals of Data Cleaning on June 3-7, 2024 at Subic Bay Travelers Hotel and Event Center, Zambales.",
        "travel_type": "Meeting",
        "travel_date": {
            "from": "2024-06-03",
            "to": "2024-06-07"
        },
        "withVehicle": true,
        "created_by": "Juvy Anne Marinas",
        "date_created": "2024-06-02 15:11:54",
        "staffs": [
            "020593",
            "110923"
        ]
    },
    {
        "id": 2,
        "reference_no": "20240180",
        "purpose": "To provide driving services to RD Steph for her attendance to the ManCom",
        "travel_type": "Meeting",
        "travel_date": {
            "from": "2024-06-03",
            "to": "2024-06-07"
        },
        "withVehicle": false,
        "created_by": "Aubrey Abuan",
        "date_created": "2024-05-31 10:25:06",
        "staffs": []
    },
    {
        "id": 3,
        "reference_no": "20240179",
        "purpose": "To provide driving services to RD Steph for her attendance to the ManCom",
        "travel_type": "Meeting",
        "travel_date": {
            "from": "2024-06-03",
            "to": "2024-06-07"
        },
        "withVehicle": false,
        "created_by": "Aubrey Abuan",
        "date_created": "2024-05-31 10:25:06",
        "staffs": []
    },
    {
        "id": 4,
        "reference_no": "20240178",
        "purpose": "To provide driving services to RD Steph for her attendance to the ManCom",
        "travel_type": "Meeting",
        "travel_date": {
            "from": "2024-06-03",
            "to": "2024-06-07"
        },
        "withVehicle": false,
        "created_by": "Aubrey Abuan",
        "date_created": "2024-05-31 10:25:06",
        "staffs": []
    }
]