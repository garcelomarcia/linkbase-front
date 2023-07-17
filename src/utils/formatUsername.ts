import { Review } from "../components/ProviderScreen";

const formatUsername = (review: Review): string => {

  const userFirstName: string = review.User.fullName.trim().split(/(?<=^\S+)\s/)[0];
  return userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1);
}

export default formatUsername;