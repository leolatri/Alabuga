import React, { createContext, useEffect, useState } from "react";
import { DataProps, Permissios } from "./dataProps.tsx";
import { ProfileModel } from "../models/personal/types";
import { BranchModel } from "../models/branches/types";
import { BranchData, ProfileData } from "../test.tsx";
import { EduAPI } from "../api/edu.ts";
import mapperPersonData from "../models/personal/mapper.tsx";
import { ProfileDTO } from "../api/types.ts";

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
                // const profile = await EduAPI.profile(); 
                const leaderBord = await EduAPI.leaderboard();
                const personData = await EduAPI.profile();
                const artifacts = await EduAPI.artifacts();

                const data: ProfileDTO = {
                    leaderBord,
                    personData, 
                    artifacts,
                }

                const branches = await EduAPI.branches();


                setProfileData(mapperPersonData(data));
                setBranchData(branches);
                setPermission(0);
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