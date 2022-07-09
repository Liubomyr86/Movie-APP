import { tagName } from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { ILocalstorage } from '../common/models/localstorage.model';
import {
    createHTMLElement,
    getObjectFromLocalStorage,
} from '../helpers/helpers';
import { createMovieCardImage } from './moviesCard';

const createMovieCards = (
    results: any,
    favoriteMoviesContainer: Element
): HTMLElement => {
    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'row',
        attributes: { id: 'film-container' },
    });

    const movieCards: HTMLElement[] = results.map((item: ICard) => {
        const { poster_path, overview, release_date, id } = item;
        return createMovieCard(
            {
                poster_path,
                overview,
                release_date,
                id,
            },
            favoriteMoviesContainer
        );
    });

    movieCards.forEach((card) => container.append(card));

    return container;
};

const createMovieCard = (
    { poster_path, overview, release_date, id }: ICard,
    favoriteMoviesContainer: Element
): HTMLElement => {
    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'col-lg-3 col-md-4 col-12 p-2',
        attributes: { id: `main-${String(id)}` },
    });
    const cardImageConatainer = createMovieCardImage(
        {
            poster_path,
            overview,
            release_date,
            id,
        },
        favoriteMoviesContainer
    );

    const localStorageFavoritesId = localStorage.getItem('favorites');
    if (localStorageFavoritesId) {
        const favoritesId: number[] = JSON.parse(localStorageFavoritesId);
        const isFavorite = favoritesId.some((item) => item === id);
        if (isFavorite && cardImageConatainer) {
            (cardImageConatainer.childNodes[1] as HTMLElement).classList.add(
                'active'
            );
        }
    }

    container.append(cardImageConatainer);

    return container;
};

export { createMovieCards };
