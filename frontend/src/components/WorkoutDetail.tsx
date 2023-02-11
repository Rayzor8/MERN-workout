import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { WorkoutsType } from "../types";

interface WorkoutDetailProps {
  workoutsData: WorkoutsType;
}

const WorkoutDetail = ({ workoutsData }: WorkoutDetailProps) => {
//   console.log(workoutsData);
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
              {workoutsData.updatedAt}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default WorkoutDetail;
