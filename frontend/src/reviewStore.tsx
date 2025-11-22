import { create } from "zustand";
import type { ReviewData } from "./model/ReviewData";

type ReviewState = {
  reviews: Array<ReviewData>;
  addReview: (review: ReviewData) => void;
  setReviews: (reviews: Array<ReviewData>) => void;
}
;
export const useReviewsStore = create<ReviewState>((set) => ({
  reviews: [],
  addReview: (newReview: ReviewData) => set((state) => ({
    reviews: [...state.reviews, newReview]
  })),
  setReviews: (newReviews: Array<ReviewData>) => set(() => ({
    reviews: newReviews
  })),
}));