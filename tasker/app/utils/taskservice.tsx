import { useRecoilState } from 'recoil';
import { updateTheVal } from '../recoil/atoms';

export const useTaskService = () => {
    const [val, setVal] = useRecoilState(updateTheVal);

    const incrementValue = () => {
        setVal((prevVal) => prevVal + 1);
    };

    return { val, incrementValue };
};
