import { ArtifactProps } from "./components/Personal/Artifact/Artifact";
import star from './imgs/star.svg';
import meteor from './imgs/meteor.svg';
import { LiderProps } from "./components/Personal/LiderBord/LiderBord";

export const data = {
    id: 2,
    mana: 100,
    fullName: "Сидоров Егор Иванович",
    place: 2,
    experience: 200,
};


export const Artifacts: ArtifactProps[] = [
    {
        id: 1,
        name: 'полярная звезда',
        img: star,
        description: "За начало обучния на платформе",
        rarity: 0,
    },
    {
        id: 2,
        name: 'полярная звезда',
        img: star,
        description: "За начало обучния на платформе",
        rarity: 0,
    },
    {
        id: 3,
        name: 'метеорит',
        img: meteor,
        description: "За успешное завершениемисси менее чем за 48 часов",
        rarity: 1,
    }
];

export const Liders: LiderProps[] = [
    {
        id: 1,
        name: 'строкова алёна',
        index: 0,
        counts: 100,
    },
    {
        id: 2,
        name: 'сидров егор',
        index: 0,
        counts: 99950,
    },
    {
        id: 3,
        name: 'иванов иван',
        index: 0,
        counts: 300,
    },
    {
        id: 4,
        name: 'петрович петр',
        index: 0,
        counts: 100,
    },
    {
        id: 5,
        name: 'верлов игорь',
        index: 0,
        counts: 120,
    },
    {
        id: 6,
        name: 'петькин николай',
        index: 0,
        counts: 1100,
    },
    {
        id: 7,
        name: 'олрлова ольга',
        index: 0,
        counts: 150,
    },
    {
        id: 8,
        name: 'лептен игорь',
        index: 0,
        counts: 144,
    },
    {
        id: 9,
        name: 'какак аааа',
        index: 0,
        counts: 443,
    },
    {
        id: 10,
        name: 'рееререр ерерр',
        index: 0,
        counts: 545,
    },
    {
        id: 11,
        name: 'шош оо',
        index: 0,
        counts: 34543,
    },
    {
        id: 12,
        name: 'лллл лшлш',
        index: 0,
        counts: 545,
    },
    {
        id: 13,
        name: 'дддд лшлшл',
        index: 0,
        counts: 3330,
    },
    {
        id: 14,
        name: 'оло олл',
        index: 0,
        counts: 4320,
    },

];