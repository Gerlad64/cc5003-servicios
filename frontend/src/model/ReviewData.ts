export interface ReviewData {
    id: string;
    service_id: string;
    user_id: string;
    rating: number; // e.g., 1 to 5
    comment: string;
    created_at: Date; // ISO date string
}   