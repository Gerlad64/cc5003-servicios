import { create } from "zustand";
import type { ReviewData } from "./model/ReviewData";

type ReviewState = {
  reviews: Array<ReviewData>;
  addReview: (review: ReviewData) => void;
}
;
export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  addReview: (newReview: ReviewData) => set((state) => ({
    reviews: [...state.reviews, newReview]
  })),
}));