import {
  Button,
  Flex,
  FormControl,
  Text,
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { AxiosError } from "axios";
import useWorkoutsCtx from "../hooks/useWorkoutsCtx";
import { WorkoutsEnum } from "../contexts/WorkoutContext";

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
  const toast = useToast();
  const { dispatch } = useWorkoutsCtx();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { title, reps, load } = formData;
    const workouts = { title, reps, load };

    try {
      const response = await axios.post("/api/workouts", workouts);
      if (response) {
        setErrorMsg(null);
        dispatch({ type: WorkoutsEnum.CREATE_WORKOUT, payload: response.data });
        setFormData({ title: "", reps: "", load: "" });
        setErrorMsg(null);
        onClose();
        toast({
          title: "Success",
          description: "Success create new workout",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      const errAxios = error as AxiosError;
      if (errAxios) {
        setErrorMsg(errAxios.message);
      }
    }
  };

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

            {errorMsg && (
              <Text color="red.400" fontSize="sm">
                {errorMsg}
              </Text>
            )}
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
