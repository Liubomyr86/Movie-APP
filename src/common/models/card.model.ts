interface ICard {
    id?: number | string;
    title?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    toggle?: (
        id: number | string,
        event: Event,
        set: Set<number | string>
    ) => void;
}

export { ICard };
