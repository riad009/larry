import { Option } from "@/types/option";

export const COUNTRY_OPTIONS: Option[] = [
    { key: "FR", name: "France" },
    { key: "IT", name: "Italy" },
    { key: "ES", name: "Spain" },
];

export const REGION_OPTIONS: Record<string, Option[]> = {
    FR: [
        { key: "Rhone", name: "Rhone" },
        { key: "Champagne", name: "Champagne" },
        { key: "Bordeaux", name: "Bordeaux" },
    ],
    IT: [
        { key: "Tuscany", name: "Tuscany" },
        { key: "Piedmont", name: "Piedmont" },
    ],
    ES: [
        { key: "Rioja", name: "Rioja" },
        { key: "Catalonia", name: "Catalonia" },
    ],
};
