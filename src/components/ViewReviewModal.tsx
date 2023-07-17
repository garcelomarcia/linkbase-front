import React from "react";
import { Modal } from "native-base";
import { Review } from "./ProviderScreen";
import ReviewCardModal from "../commons/ReviewCardModal";

type Props = {
  setShowViewReview: React.Dispatch<React.SetStateAction<boolean>>,
  showViewReview: boolean,
  singleReview: Review
}

const ViewReviewModal: React.FC<Props> = props => (

  <Modal 
    isOpen={props.showViewReview}
    onClose={() => props.setShowViewReview(false)}
    size="lg"
  >
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Reseña</Modal.Header>
      <ReviewCardModal review={props.singleReview}/>
    </Modal.Content>
  </Modal>
);

export default ViewReviewModal;