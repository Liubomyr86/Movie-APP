interface ICard {
    id?: number;
    title?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    toggle?: (id: number, event: Event, set: Set<number>) => void;
}

export { ICard };
