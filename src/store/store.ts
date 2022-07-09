import { RESPONSE_ARRAY_LENGTH } from '../common/constants/servisec';
import { ApiQueryValue } from '../common/enums/enum';
import { randomInteger } from '../helpers/helpers';
import { movies } from '../services/services';

class Global {
    data: any = [];
    set: Set<number | string> = new Set();
    count: number = ApiQueryValue.PAGE;

    async getData() {
        const moviesInfo: any = await movies.getPopularMovies(
            ApiQueryValue.PAGE
        );
        const { results } = moviesInfo;
        return results;
    }
}

const global = new Global();

export { global };
