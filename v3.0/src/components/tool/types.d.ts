
export interface CanvasProps {
    id: string,
    toolLink: string,
    isDataset: boolean,
    isBlog: boolean
}

export interface DescriptionProps {
    description: string
}

export interface BasicInfoProps {
    title: string;
    developers: string;
    creationDate: string;
    category: string;
    keywords: string;
    host: string;
    source?: string;
    sourceLink?: string;
    authors?: string;
    publisher?: string;
    publishDate?: string;
}