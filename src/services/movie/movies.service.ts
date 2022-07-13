import {
    ApiLevelAuthentication,
    ApiPath,
    ApiQueryProperty,
    ApiQueryValue,
    ENV,
} from '../../common/enums/enum';
import { IResponse } from '../../common/models/api.model';
import { ICard, IQuery } from '../../common/models/models';
import { mapper } from '../../helpers/common/mapper';
import { Http } from '../http/http.service';

const query: IQuery = {
    [ApiQueryProperty.API_KEY]: ENV.API_KEY,
    [ApiQueryProperty.LANGUAGE]: ApiQueryValue.LANGUAGE,
};

class Movies {
    private apiPath: string;
    private http: Http;

    constructor(apiPath: string, http: Http) {
        this.apiPath = apiPath;
        this.http = http;
    }

    async getPopularMovies(pageNumber: number): Promise<ICard[]> {
        const response: IResponse = await this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Popular}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: pageNumber,
                },
            }
        );
        const { results } = response;
        const mappedResults = (results as ICard[]).map(
            (item: ICard) =>
                mapper(
                    item,
                    'backdrop_path',
                    'id',
                    'title',
                    'overview',
                    'poster_path',
                    'release_date'
                ) as ICard
        );

        return mappedResults;
    }

    async getTopRatedMovies(pageNumber: number): Promise<ICard[]> {
        const response: IResponse = await this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.TopRated}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: pageNumber,
                },
            }
        );
        const { results } = response;
        const mappedResults = (results as ICard[]).map(
            (item: ICard) =>
                mapper(
                    item,
                    'backdrop_path',
                    'id',
                    'title',
                    'overview',
                    'poster_path',
                    'release_date'
                ) as ICard
        );

        return mappedResults;
    }

    async getUpcomingMovies(pageNumber: number): Promise<ICard[]> {
        const response: IResponse = await this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Upcoming}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: pageNumber,
                },
            }
        );
        const { results } = response;
        const mappedResults = (results as ICard[]).map(
            (item: ICard) =>
                mapper(
                    item,
                    'backdrop_path',
                    'id',
                    'title',
                    'overview',
                    'poster_path',
                    'release_date'
                ) as ICard
        );

        return mappedResults;
    }

    async searchMovie(
        searchQuery: string,
        pageNumber: number
    ): Promise<ICard[]> {
        const response: IResponse = await this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Search}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: pageNumber,
                    [ApiQueryProperty.INCLUDE_ADULT]:
                        ApiQueryValue.INCLUDE_ADULT,
                    [ApiQueryProperty.QUERY]: searchQuery,
                },
            }
        );

        const { results } = response;
        const mappedResults = (results as ICard[]).map(
            (item: ICard) =>
                mapper(
                    item,
                    'backdrop_path',
                    'id',
                    'title',
                    'overview',
                    'poster_path',
                    'release_date'
                ) as ICard
        );

        return mappedResults;
    }

    async getMovieForId(id: number): Promise<ICard> {
        const response: ICard = await this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.MovieForId}/${id}`,
            {
                query: {
                    ...query,
                },
            }
        );
        const mappedResults = mapper(
            response,
            'backdrop_path',
            'id',
            'title',
            'overview',
            'poster_path',
            'release_date'
        ) as ICard;

        return mappedResults;
    }
}

export { Movies };
