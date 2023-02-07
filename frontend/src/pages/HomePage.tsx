import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const [data, errorFetch, isLoading] = useFetch({
    url: process.env.REACT_APP_API_URL as string,
  });
  console.log(data);

  return (
    <>
      <h1>Homepage</h1>
      {errorFetch}
      {isLoading && "Loading..."}
    </>
  );
};

export default HomePage;
