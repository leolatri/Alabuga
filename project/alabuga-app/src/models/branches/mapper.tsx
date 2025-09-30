import { BranchDTO } from "../../api/types.tsx";
import { BranchModel, ContentProps } from "./types.tsx";

export default function mapperBranchData(rowData?: BranchDTO): BranchModel {
    if (!rowData) throw new Error('Data is empty');

    const branch: ContentProps = {
        id: rowData.branch.id,
        mana: rowData.branch.mana,
        type: rowData.branch.type,
        name: rowData.branch.name,
        status: rowData.branch.status,
        experience: rowData.branch.experience,
        description: rowData.branch.description,
    };

    const missions: ContentProps[] = rowData.missions.map(mission => ({
        id: mission.id,
        mana: mission.mana,
        type: mission.type,
        name: mission.name,
        status: mission.status,
        experience: mission.experience,
        description: mission.description,
    }));

    return {
        branch,
        missions,
    };
}
