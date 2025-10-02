import { ProfileDTO } from "../../api/types.tsx";
import { ProfileModel, PersonProps, ArtifactProps, LeaderProps } from "./types";

export default function mapperPersonData(rowData?: ProfileDTO): ProfileModel {
    if (!rowData) throw new Error('Data is empty');

    const personData: PersonProps = {
        id: rowData.personData.id,
        mana: rowData.personData.mana,
        place: rowData.personData.place,
        fullName: rowData.personData.fullName,
        experience: rowData.personData.experience,
        permissions: rowData.personData.permissions,
    };

    const artifacts: ArtifactProps[] = rowData.artifacts.map(artifact => ({
        id: artifact.id,
        name: artifact.name,
        img: artifact.img,
        description: '',
        rarity: artifact.rarity,
    }));

    const leaderBord: LeaderProps[] = rowData.leaderBord.map(leader => ({
        id: leader.id,
        index: leader.index,
        name: leader.name,
        experience: leader.experience,
        isCurrentUser: leader.isCurrentUser,
    }));
    return {
        personData,
        artifacts,
        leaderBord,
    };
}
