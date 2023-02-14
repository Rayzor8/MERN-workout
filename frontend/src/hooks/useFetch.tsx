import axios from "axios";
import { useState, useEffect } from "react";
import useWorkoutsCtx from "./useWorkoutsCtx";
import { WorkoutsEnum } from "../contexts/WorkoutContext";
const useFetch = <T,>(
  url: string,
  initialState: T
): [ errorFetch: string, isLoading: boolean] => {
  const [errorFetch, setErrorFetch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useWorkoutsCtx()

  useEffect(() => {
    async function getWorkouts() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          //   process.env.REACT_APP_API_URL as string
          url
        );
        dispatch({type:WorkoutsEnum.SET_WORKOUTS,payload:response.data});
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
  }, [url,dispatch]);
  return [ errorFetch, isLoading];
};

export default useFetch;
