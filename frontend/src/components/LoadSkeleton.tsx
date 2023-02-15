import { Skeleton, Stack } from "@chakra-ui/react";

const LoadSkeleton = () => {
  const skelArr = [...Array(2).keys()];
  return (
    <>
      {skelArr.map((arr, index) => (
        <Stack key={index}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ))}
    </>
  );
};

export default LoadSkeleton;
