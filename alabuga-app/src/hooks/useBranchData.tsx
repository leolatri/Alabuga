import useContextData from "./useContextData.tsx";

const useBranchData = () => {
    const data = useContextData().branchData;
    return data || [];
}

export default useBranchData;