import { Review } from "../components/ProviderScreen";

const reviewsToGraph = (reviews: Review[]): string[] => {

  let reviewStars: number[]; 
  if (!reviews.length) reviewStars = [0];
  else reviewStars = reviews.map((review: Review): number => review.stars);
  let reviewQuantity: number[] = [0, 0, 0, 0, 0];

  reviewStars.forEach((review: number): void => {

    for (let i = 1; i < 6; i ++) {
      
      if (review === i) reviewQuantity[i - 1] ++;
    }
  });

  const reviewPercentage: number[] = reviewQuantity.map(
    
    (amount: number): number => (amount * 100) / reviewStars.length
  );

  return reviewPercentage.map((percentage: number): string => (

    ((210 / 100) * percentage).toString()
  ));
}

export default reviewsToGraph; 