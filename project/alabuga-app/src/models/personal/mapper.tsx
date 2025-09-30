import { ProfileDTO } from "../../api/types.tsx";
import { ProfileModel, PersonProps, ArtifactProps, LiderProps } from "./types";

export default function mapperPersonData(rowData?: ProfileDTO): ProfileModel {
    if (!rowData) throw new Error('Data is empty');

    const personData: PersonProps = {
        id: rowData.personData.id,
        mana: rowData.personData.mana,
        place: rowData.personData.place,
        fullName: rowData.personData.fullName,
        experience: rowData.personData.experience,
    };

    const artifacts: ArtifactProps[] = rowData.artifacts.map(artifact => ({
        id: artifact.id,
        name: artifact.name,
        img: artifact.img,
        description: '',
        rarity: artifact.rarity,
    }));

    const liderBord: LiderProps[] = rowData.liderBord.map(lider => ({
        id: lider.id,
        index: lider.index,
        name: lider.name,
        counts: lider.expirience, 
    }));

    return {
        personData,
        artifacts,
        liderBord,
    };
}
