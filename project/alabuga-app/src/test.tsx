import star from './imgs/star.svg';
import meteor from './imgs/meteor.svg';
import { BranchListProps } from "./components/Branches/Branch/list/BranchList.tsx";
import { ContentProps } from "./components/Branches/Content/Content";
import { ArtifactProps, LeaderProps, PersonProps, ProfileModel } from "./models/personal/types.tsx";
import { BranchModel } from './models/branches/types.tsx';

const data: PersonProps  = {
    id: 2,
    mana: 100,
    fullName: "Сидоров Егор Иванович",
    place: 2,
    experience: 200,
};
const Artifacts: ArtifactProps[] = [
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

const leaders: LeaderProps[] = [
    {
        id: 1,
        name: 'строкова алёна',
        index: 0,
        experience: 100,
        isCurrentUser: false,
    },
    {
        id: 2,
        name: 'сидров егор',
        index: 1,
        experience: 99950,
        isCurrentUser: false,
    },
    {
        id: 3,
        name: 'иванов иван',
        index: 0,
        experience: 300,
        isCurrentUser: false,
    },
    {
        id: 4,
        name: 'петрович петр',
        isCurrentUser: false,
        index: 0,
        experience: 100,
    },
    {
        id: 5,
        name: 'верлов игорь',
        isCurrentUser: false,
        index: 0,
        experience: 120,
    },
    {
        id: 6,
        name: 'петькин николай',
        index: 0,
        isCurrentUser: false,
        experience: 1100,
    },
    {
        id: 7,
        name: 'олрлова ольга',
        index: 0,
        experience: 150,
        isCurrentUser: false,
    },
    {
        id: 8,
        name: 'лептен игорь',
        index: 0,
        experience: 144,
        isCurrentUser: false,
    },
    {
        id: 9,
        name: 'какак аааа',
        index: 0,
        experience: 443,
        isCurrentUser: false,
    },
    {
        id: 10,
        name: 'рееререр ерерр',
        index: 0,
        experience: 545,
        isCurrentUser: false,
    },
    {
        id: 11,
        name: 'шош оо',
        index: 0,
        experience: 34543,
        isCurrentUser: false,
    },
    {
        id: 12,
        name: 'лллл лшлш',
        index: 0,
        experience: 545,
        isCurrentUser: false,
    },
    {
        id: 13,
        name: 'дддд лшлшл',
        index: 0,
        experience: 3330,
        isCurrentUser: false,
    },
    {
        id: 14,
        name: 'оло олл',
        index: 0,
        experience: 4320,
        isCurrentUser: false,
    },

];

const missions: ContentProps[] = [
    {
    id: 1,
    mana: 100,
    name: "Главный филиал",
    status: 1,
    experience: 5000,
    description: "Основной филиал компании в центре города",
    type: "main"
  },
  {
    id: 2,
    mana: 75,
    name: "Северный филиал",
    status: 1,
    experience: 3200,
    description: "Филиал в северной части города",
    type: "regional"
  },
  {
    id: 3,
    mana: 50,
    name: "Западный филиал",
    status: 0,
    experience: 1500,
    description: "Филиал на западе, временно неактивен",
    type: "regional"
  },
  {
    id: 4,
    mana: 120,
    name: "Южный филиал",
    status: 1,
    experience: 4200,
    description: "Филиал в южном районе с высоким трафиком",
    type: "premium"
  },
  {
    id: 5,
    mana: 30,
    name: "Восточный филиал",
    status: 0,
    experience: 800,
    description: "Новый филиал в восточной части",
    type: "startup"
  },
  {
    id: 6,
    mana: 90,
    name: "Центральный офис",
    status: 1,
    experience: 6500,
    description: "Центральный офис управления",
    type: "headquarters"
  }
]

export const Branches: ContentProps[] = [
    {
    id: 1,
    mana: 100,
    name: "Первая",
    status: 1,
    experience: 5000,
    description: "Основной филиал компании в центре города",
    type: "main"
  },
  {
    id: 2,
    mana: 75,
    name: "Вторая",
    status: 1,
    experience: 3200,
    description: "Филиал в северной части города",
    type: "regional"
  },
  {
    id: 3,
    mana: 50,
    name: "Третья",
    status: 0,
    experience: 1500,
    description: "Филиал на западе, временно неактивен",
    type: "regional"
  },
  {
    id: 4,
    mana: 120,
    name: "Четвертая",
    status: 1,
    experience: 4200,
    description: "Филиал в южном районе с высоким трафиком",
    type: "premium"
  },
  {
    id: 5,
    mana: 30,
    name: "Пятая",
    status: 0,
    experience: 800,
    description: "Новый филиал в восточной части",
    type: "startup"
  },
  {
    id: 6,
    mana: 90,
    name: "Шестая",
    status: 1,
    experience: 6500,
    description: "Центральный офис управления",
    type: "headquarters"
  }
];

export const ProfileData: ProfileModel = {
    personData: data,
    artifacts: Artifacts,
    leaderBord: leaders,
}

export const BranchData: BranchModel[] = [
    {
        branch: Branches[0],
        missions: missions,
    },
    {
        branch: Branches[1],
        missions: missions,
    },
    {
        branch: Branches[2],
        missions: missions,
    },
    {
        branch: Branches[3],
        missions: missions,
    },
    {
        branch: Branches[4],
        missions: missions,
    },
    {
        branch: Branches[5],
        missions: missions,
    },
    {
        branch: Branches[6],
        missions: missions,
    },
]
