import { tagName } from '../common/enums/enum';
import { createHTMLElement, setLocalStorageItem } from '../helpers/helpers';
import { movies } from '../services/services';
import { global } from '../store/store';
import { createMovieCardImage } from './moviesCard';

const renderFavoriteMovie = (container: Element): void => {
    const localStorageFavoritesId = localStorage.getItem('favorites');
    if (localStorageFavoritesId) {
        const favoritesId: Set<number> = JSON.parse(localStorageFavoritesId);
        appendFavoriteMovie(container, favoritesId);
    }
};

const appendFavoriteMovie = (
    container: Element,
    favoritesId: Set<number>
): void => {
    favoritesId.forEach(async (id) => {
        global.set.add(id);
        const movie = await movies.getMovieForId(id);
        const { poster_path, overview, release_date } = movie;
        const favoriteMovieContainer = createHTMLElement({
            tagName: tagName.DIV,
            className: 'col-12 p-2',
        });
        const card = createMovieCardImage(
            {
                poster_path,
                overview,
                release_date,
                id,
            },
            container
        );

        card.children[1].classList.add('active');

        favoriteMovieContainer.append(card);
        container?.append(favoriteMovieContainer);
    });
};

const toggleFavoriteMovie = (
    id: number,
    event: Event,
    set: Set<number>,
    favoriteMoviesContainer: Element
): void => {
    const containerId = (event.currentTarget as HTMLElement).parentElement
        ?.parentElement?.id;

    if (set.has(id) && !containerId) {
        const mainCard = document.body.querySelector(`#main-${id}`);
        const card = mainCard?.children[0].children[1] as SVGAElement;
        card && card.classList.remove('active');
    }

    set.has(id) ? set.delete(id) : set.add(id);
    setLocalStorageItem('favorites', set);

    if (favoriteMoviesContainer) {
        favoriteMoviesContainer.innerHTML = '';
        appendFavoriteMovie(favoriteMoviesContainer, set);
    }
};

export { renderFavoriteMovie, appendFavoriteMovie, toggleFavoriteMovie };
