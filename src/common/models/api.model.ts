interface IQuery {
    [key: string]: string | number | boolean;
}

interface IFetchOptions {
    method?: string;
    query?: IQuery;
    payload?: ReadableStream | null;
    contentType?: string;
}

export { IQuery, IFetchOptions };
