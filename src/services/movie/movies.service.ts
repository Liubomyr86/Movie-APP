import {
    ApiLevelAuthentication,
    ApiPath,
    ApiQueryProperty,
    ApiQueryValue,
    ENV,
} from '../../common/enums/enum';
import { IQuery } from '../../common/models/api.model';
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

    getPopularMovies() {
        return this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Popular}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: ApiQueryValue.PAGE,
                },
            }
        );
    }

    getTopRatedMovies() {
        return this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.TopRated}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: ApiQueryValue.PAGE,
                },
            }
        );
    }

    getUpcomingMovies() {
        return this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Upcoming}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: ApiQueryValue.PAGE,
                },
            }
        );
    }

    searchMovie(searchQuery: string) {
        return this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.Search}`,
            {
                query: {
                    ...query,
                    [ApiQueryProperty.PAGE]: ApiQueryValue.PAGE,
                    [ApiQueryProperty.INCLUDE_ADULT]:
                        ApiQueryValue.INCLUDE_ADULT,
                    [ApiQueryProperty.QUERY]: searchQuery,
                },
            }
        );
    }

    getMovieForId(id: string) {
        return this.http.load(
            `${this.apiPath}/${ApiLevelAuthentication.Level_3}/${ApiPath.MovieForId}/${id}`,
            {
                query: {
                    ...query,
                },
            }
        );
    }
}

export { Movies };