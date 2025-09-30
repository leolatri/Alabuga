import React, { createContext, useEffect, useState } from "react";
import { DataProps, Permissios } from "./dataProps.tsx";
import { ProfileModel } from "../models/personal/types";
import { BranchModel } from "../models/branches/types";
import { BranchData, ProfileData } from "../test.tsx";

export const DataContext = createContext<DataProps | undefined>(undefined);

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [profileData, setProfileData] = useState<ProfileModel>();
    const [branchData, setBranchData] = useState<BranchModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [userPermissions, setPermission] = useState<Permissios>(Permissios.USER);

    const value: DataProps = {
        userPermissions,
        profileData,
        branchData,
        loading,
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = {profileData: ProfileData, branchData: BranchData, userPermissions: Permissios.USER}; 

                setProfileData(data.profileData);
                setBranchData(data.branchData);
                setPermission(data.userPermissions);
            }
            catch {
                throw Error('Error with catch data!');
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
};
export default DataProvider;