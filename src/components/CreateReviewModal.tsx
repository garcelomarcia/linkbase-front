import React from "react";
import { Button, Center, HStack, Modal, Pressable, TextArea } from "native-base";
import StarSvg from "../assets/svg/StarSvg";

type Props = {
  isLoading: boolean,
  setShowWriteReview: React.Dispatch<React.SetStateAction<boolean>>,
  showWriteReview: boolean,
  setNewReviewText: React.Dispatch<React.SetStateAction<string>>, 
  newReviewText: string, 
  setStarRating: React.Dispatch<React.SetStateAction<number>>, 
  starRating: number,
  handleSubmitReview: () => Promise<void>
}

const CreateReviewModal: React.FC<Props> = props => (

  <Modal 
    isOpen={props.showWriteReview} 
    onClose={() => {
      if (!props.isLoading) props.setShowWriteReview(false)
    }}
  >
    <Modal.Content maxWidth="400">
      <Modal.Header>Nueva Reseña</Modal.Header>
      <Modal.Body>
        <Center>
          <TextArea
            isDisabled={props.isLoading}
            defaultValue={props.newReviewText}
            onChangeText={props.setNewReviewText}
            h={20}
            placeholder="¿Que te pareció este proveedor?"
            w="100%"
            maxW="350" 
            autoCompleteType={false}
            _focus={{ bg: "none", borderColor: "gray" }}              
          />
          <HStack width="100%" mt="4" justifyContent="center" space={1}>
          {[...Array(5)].map((element, index) => (
            <Pressable 
              key={index} 
              onPress={() => { if (!props.isLoading) props.setStarRating(index + 1)}}
            >
              <StarSvg 
                size={25} 
                fill={!props.isLoading
                  ? props.starRating >= index + 1 ? "#981D9A" : "#BAB1B1"
                  : "#dadada"
                } 
              />
            </Pressable>
          ))}
          </HStack>
        </Center>
      </Modal.Body>
      <Modal.Footer>
      <Button.Group space={2}>
        <Button 
          isDisabled={props.isLoading}
          variant="ghost" 
          colorScheme="blueGray" 
          onPress={() => {
            props.setShowWriteReview(false);
          }}
        >Cancel</Button>
        <Button 
          size="lg"
          isLoading={props.isLoading}
          isLoadingText="Submitting..."
          spinnerPlacement="end"
          variant="outline"
          colorScheme="gray"
          onPress={props.handleSubmitReview}
        >Save</Button>
      </Button.Group>
    </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default CreateReviewModal;