import { ApiQueryValue } from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { movies } from '../services/services';

class Global {
    data: ICard[] = [];
    set: Set<number> = new Set();
    count: number = ApiQueryValue.PAGE;

    async getData(): Promise<ICard[]> {
        const popularMovies = await movies.getPopularMovies(ApiQueryValue.PAGE);

        return popularMovies;
    }
}

const global = new Global();

export { global };
