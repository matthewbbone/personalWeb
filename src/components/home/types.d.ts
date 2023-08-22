
export interface TileProps {
    id: number,
    thumbnail: string;
    title: string,
    date: string,
}

export interface RowProps {
    name: string;
    ids: Array<number>
}

export interface FeaturedProps {
    id: number
}

export interface FeaturedAttr {
    title: string;
    developers: string
}
