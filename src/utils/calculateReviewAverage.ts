import { Review } from "../components/ProviderScreen";

const calculateReviewAverage = (reviews: Review[]): number => {
  
  const stars: number[] = reviews.map((review: Review): number => review.stars);
  let average: number = stars.reduce((average, currentValue, index, { length }) => {
    return average + currentValue / length;
  }, 0);
  
  return Number((Math.floor(average * 100) / 100).toFixed(1));
}

export default calculateReviewAverage; 