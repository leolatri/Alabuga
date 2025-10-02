import { BranchDTO } from "../../api/types.tsx";
import { BranchModel, ContentProps } from "./types.tsx";

export default function mapperBranchData(rowData?: BranchDTO[]): BranchModel[] {
    if (!rowData) throw new Error('Data is empty');
    
    return rowData.map((el) => {
        const missions: ContentProps[] = el.missions.map(mission => ({
            id: mission.id,
            mana: mission.mana,
            type: mission.type,
            name: mission.name,
            status: mission.status,
            experience: mission.experience,
            description: mission.description,
        }));

        const totalMana = missions.reduce((sum, el) => sum + (el.mana || 0), 0);
        const totalExperience = missions.reduce((sum, el) => sum + (el.experience || 0), 0);

        const branch: ContentProps = {
            id: el.branch.id,
            mana: totalMana,
            experience: totalExperience,
            type: el.branch.type,
            name: el.branch.name,
            status: el.branch.status,
            description: el.branch.description,
        };

        return {
            branch,
            missions,
        };
    });
}