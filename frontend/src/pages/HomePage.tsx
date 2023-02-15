import {
  Button,
  Flex,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import LoadSkeleton from "../components/LoadSkeleton";
import ModalForm from "../components/ModalForm";
import WorkoutDetail from "../components/WorkoutDetail";
import useFetch from "../hooks/useFetch";
import useWorkoutsCtx from "../hooks/useWorkoutsCtx";
import { WorkoutsType } from "../types";

const HomePage = () => {
  const [errorFetch, isLoading] = useFetch<WorkoutsType[] | null>(
    process.env.REACT_APP_API_URL as string
  );
  const {
    state: { workouts },
  } = useWorkoutsCtx();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex as="section" gap={4} direction="column" justifyContent="start">
      <h1>Homepage</h1>
      <Button
        width="max-content"
        bg="primary.300"
        _hover={{ bg: "primary.400" }}
        onClick={onOpen}
      >
        Create WorkOut
      </Button>
      <ModalForm isOpen={isOpen} onClose={onClose} />
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {workouts.length > 0 &&
          workouts.map((workout) => (
            <WorkoutDetail workoutsData={workout} key={workout._id} />
          ))}
      </SimpleGrid>
      {errorFetch}
      {isLoading && <LoadSkeleton />}
    </Flex>
  );
};

export default HomePage;
