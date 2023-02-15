import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Spinner,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { WorkoutsEnum } from "../contexts/WorkoutContext";
import useWorkoutsCtx from "../hooks/useWorkoutsCtx";
import { WorkoutsType } from "../types";
import { formatDistanceToNow } from "date-fns";

interface WorkoutDetailProps {
  workoutsData: WorkoutsType;
}

const WorkoutDetail = ({ workoutsData }: WorkoutDetailProps) => {
  const { dispatch } = useWorkoutsCtx();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/workouts/" + workoutsData._id);
      dispatch({
        type: WorkoutsEnum.DELETE_WORKOUT,
        payload: response.data,
      });
      toast({
        title: "Success",
        description: "Success delete workout",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error, "deleting error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Title
            </Heading>
            <Text pt="2" fontSize="sm">
              {workoutsData.title}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Reps
            </Heading>
            <Text pt="2" fontSize="sm">
              {workoutsData.reps} x
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Load
            </Heading>
            <Text pt="2" fontSize="sm">
              {workoutsData.load}(kg)
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Updated At
            </Heading>
            <Text pt="2" fontSize="sm">
              {formatDistanceToNow(new Date(workoutsData.updatedAt), {
                addSuffix: true,
              })}
            </Text>
          </Box>

          <Flex gap={2}>
            <Button colorScheme="yellow" w="max-content" onClick={handleDelete}>
              <Flex gap={2} justifyContent="center" alignItems="center">
                {isLoading && <Spinner />}
                Delete
              </Flex>
            </Button>
            <Button bg="primary.300" w="max-content">
              <Flex gap={2} justifyContent="center" alignItems="center">
                {isLoading && <Spinner />}
                Update
              </Flex>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default WorkoutDetail;
