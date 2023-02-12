import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { AxiosError } from "axios";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm = ({ isOpen, onClose }: ModalFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    load: "",
  });

  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { title, reps, load } = formData;
    const workouts = { title, reps, load };

    try {
      const response = await axios.post("/api/workouts", workouts);

      if (response) {
        setErrorMsg(null);
        alert("new workout Added");
        setFormData({ title: "", reps: "", load: "" });
        setErrorMsg(null);
        onClose();
      }
    } catch (error) {
      console.log("error bro");
      const errAxios = error as AxiosError;

      if (errAxios) {
        console.log('masuk Axios err')
        setErrorMsg(errAxios.message);
      }
    }
  };

  console.log(errorMsg);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Form Create Workout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as="form"
            gap={4}
            flexDirection="column"
            onSubmit={onSubmit}
            id="create-form"
          >
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="Title"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                value={formData.title}
              />
              <FormHelperText>Please enter something</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Reps</FormLabel>
              <Input
                type="number"
                name="Reps"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, reps: e.target.value }))
                }
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                value={formData.reps}
              />
              <FormHelperText>Please enter something</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Load</FormLabel>
              <Input
                type="number"
                name="Load"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, load: e.target.value }))
                }
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                value={formData.load}
              />
              <FormHelperText>Please enter something</FormHelperText>
            </FormControl>

            <FormControl>
              {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit" form="create-form">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
