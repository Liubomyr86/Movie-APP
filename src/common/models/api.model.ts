interface IQuery {
    [key: string]: string | number;
}

interface IFetchOptions {
    method?: string;
    query?: IQuery;
    payload?: ReadableStream | null;
    contentType?: string;
}

export { IQuery, IFetchOptions };
