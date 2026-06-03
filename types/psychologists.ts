export interface Review {
    comment: string,
    rating: number,
    reviewer: string
}

export interface Psychologist {
    id: string,
    about: string,
    avatar_url: string,
    experience: string,  
    initial_consultation: string,
    license: string,
    name: string,
    price_per_hour: number,
    rating: number,
    reviews: Review[],
    specialization: string
}