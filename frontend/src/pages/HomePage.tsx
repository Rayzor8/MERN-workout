import { Button, Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import ModalForm from "../components/ModalForm";
import WorkoutDetail from "../components/WorkoutDetail";
import useFetch from "../hooks/useFetch";
import { WorkoutsType } from "../types";

const HomePage = () => {
  const [data, errorFetch, isLoading] = useFetch<WorkoutsType[] | null>(
    process.env.REACT_APP_API_URL as string,
    null
  );
  // console.log(data);
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
      <ModalForm isOpen={isOpen} onClose={onClose}/>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {data &&
          data.map((workout) => (
            <WorkoutDetail workoutsData={workout} key={workout._id} />
          ))}
      </SimpleGrid>
      {errorFetch}
      {isLoading && "Loading..."}
    </Flex>
  );
};

export default HomePage;
