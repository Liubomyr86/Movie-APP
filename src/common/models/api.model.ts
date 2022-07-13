import { ICard } from './card.model';

interface IQuery {
    [key: string]: string | number | boolean;
}

interface IFetchOptions {
    method?: string;
    query?: IQuery;
    payload?: ReadableStream | null;
    contentType?: string;
}

interface IResponse {
    [key: string]: string | number | ICard[] | boolean;
}

export { IQuery, IFetchOptions, IResponse };
