import useContextData from "./useContextData.tsx";

const useProfileData = () => useContextData().profileData;

export default useProfileData;