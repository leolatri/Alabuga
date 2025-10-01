import React, { createContext, useEffect, useState } from "react";
import mapperPersonData from "../models/personal/mapper.tsx";
import { DataProps, Permissios } from "./dataProps.tsx";
import { LeaderProps, ProfileModel } from "../models/personal/types";
import { BranchModel } from "../models/branches/types";
import { LeaderDTO, ProfileDTO } from "../api/types.ts";
import { EduAPI } from "../api/edu.ts";

export const DataContext = createContext<DataProps | undefined>(undefined);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [profileData, setProfileData] = useState<ProfileModel>();
    const [branchData, setBranchData] = useState<BranchModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [userPermissions, setPermission] = useState<Permissios>(Permissios.USER);

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
                // const permission = await EduAPI.permission(); 
                const permission = 0;
                const leaderBord = await EduAPI.leaderboard();
                const branches = await EduAPI.branches();

                if (!permission) {
                    const personData = await EduAPI.profile();
                    const artifacts = await EduAPI.artifacts();

                    const data: ProfileDTO = {
                        leaderBord,
                        personData,
                        artifacts,
                    }
                    setProfileData(mapperPersonData(data));
                }

                setBranchData(branches);
                setPermission(permission);
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