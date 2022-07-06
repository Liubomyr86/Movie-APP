export interface IQuery {
    [key: string]: string | number;
}

export interface IFetchOptions {
    method?: string;
    query?: IQuery;
    payload?: ReadableStream | null;
    contentType?: string;
}
