import { useContext } from "react"
import { DataContext } from "../Context/DataProvider.tsx"

const useContextData = () => {
    const context = useContext(DataContext);
    if(!context) throw new Error('Data context is undefinded');
    return context;
};
export default useContextData;