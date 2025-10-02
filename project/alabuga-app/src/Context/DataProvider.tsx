import React, { createContext, useEffect, useState } from "react";
import mapperPersonData from "../models/personal/mapper.tsx";
import mapperBranchData from "../models/branches/mapper.tsx";
import { DataProps, Permissios } from "./dataProps.tsx";
import { ProfileModel } from "../models/personal/types";
import { BranchModel } from "../models/branches/types";
import { ProfileDTO } from "../api/types.ts";
import { EduAPI } from "../api/edu.ts";

export const DataContext = createContext<DataProps | undefined>(undefined);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [profileData, setProfileData] = useState<ProfileModel>();
    const [branchData, setBranchData] = useState<BranchModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const value: DataProps = {
        // userPermissions,
        profileData,
        branchData,
        loading,
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const personData = await EduAPI.profile();
                const leaderBord = await EduAPI.leaderboard();
                const branches = await EduAPI.branches();
                const artifacts = await EduAPI.artifacts();

                const data: ProfileDTO = {
                    leaderBord,
                    personData,
                    artifacts,
                }
                setProfileData(mapperPersonData(data));
                setBranchData(mapperBranchData(branches));
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
    
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
};
export default DataProvider;