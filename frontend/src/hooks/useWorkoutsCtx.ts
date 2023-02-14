import { useContext } from 'react';
import { WorkoutsContext } from './../contexts/WorkoutContext';

const useWorkoutsCtx = () => {
    const context = useContext(WorkoutsContext)
    return context
}

export default useWorkoutsCtx