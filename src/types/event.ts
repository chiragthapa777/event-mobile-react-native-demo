export interface Event {
    categories: Category[]
    createdAt: string
    date: string
    description: string
    eventBannerPhoto: EventBannerPhoto
    eventLayoutPhoto: EventLayoutPhoto
    eventPhoto: EventPhoto
    id: string
    lat: string
    lng: string
    name: string
    status: string
    termsAndCondition: string
    tickets: Ticket[]
    venue: string
}

export interface Category {
    id: string
    name: string
}

export interface EventBannerPhoto {
    filePath: string
    id: string
    link: string
}

export interface EventLayoutPhoto {
    filePath: string
    id: string
    link: string
}

export interface EventPhoto {
    filePath: string
    id: string
    link: string
}

export interface Ticket {
    createdAt: string
    eventId: string
    id: string
    name: string
    price: string
    totalBooked: number
    totalQty: number
}
