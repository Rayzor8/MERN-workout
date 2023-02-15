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
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
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

  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields,setEmptyFields] = useState< string[]>([])
  const toast = useToast();
  const { dispatch } = useWorkoutsCtx();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { title, reps, load } = formData;
    const workouts = { title, reps, load };
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await axios.post("/api/workouts", workouts);
      if (response) {
        setErrorMsg(null);
        setEmptyFields([])
        dispatch({ type: WorkoutsEnum.CREATE_WORKOUT, payload: response.data });
        setFormData({ title: "", reps: "", load: "" });
        onClose();
        toast({
          title: "Success",
          description: "Success create new workout",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error: any) {
      if (error) {
        setErrorMsg(error.response.data);
        setEmptyFields(error.response.data.emptyBody)
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleClose() {
    setErrorMsg(null);
    onClose();
    setEmptyFields([])
  }

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
              {emptyFields.includes('title') && <FormHelperText>Please enter title</FormHelperText> }
              
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
             {emptyFields.includes('reps') && <FormHelperText>Please enter reps</FormHelperText> }
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
           {emptyFields.includes('load') && <FormHelperText>Please enter load</FormHelperText> }
            </FormControl>

            {errorMsg && (
              <Text color="red.400" fontSize="sm">
                {errorMsg.error}
              </Text>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit" form="create-form">
            <Flex gap={2} justifyContent="center" alignItems="center">
              {isLoading && <Spinner />}
              Submit
            </Flex>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
