import axios from "axios";
import { useState, useEffect } from "react";

interface UsefetchProps {
  url: string;
}

const useFetch = ({ url }: UsefetchProps) => {
  const [data, setData] = useState(null);
  const [errorFetch, setErrorFetch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getWorkouts() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          //   process.env.REACT_APP_API_URL as string
          url
        );
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          if (err) {
            setErrorFetch(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    getWorkouts();
  }, [url]);
  return [data, errorFetch, isLoading];
};

export default useFetch;
