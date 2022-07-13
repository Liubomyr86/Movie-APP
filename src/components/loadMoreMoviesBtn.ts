import { tagName } from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import {
    createHTMLElement,
    getObjectFromLocalStorage,
} from '../helpers/helpers';
import { movies } from '../services/services';
import { global } from '../store/store';
import { createMovieCards } from './moviesCardContainer';

const createLoadMoreMoviesBtn = (): HTMLElement => {
    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'd-flex justify-content-center align-items-center pt-4',
    });
    const button = createHTMLElement({
        tagName: tagName.BUTTON,
        className: 'btn btn-lg btn-outline-success',
        attributes: { type: 'button' },
    });

    button.innerText = 'Load more';

    container.append(button);

    return container;
};

const loadMoreMovies = async (
    cardsContainer: Element,
    loadMoreBtn: Element,
    favoriteMoviesContainer: Element
): Promise<void> => {
    const activeCategory = localStorage.getItem('active_category');
    const search = getObjectFromLocalStorage('search');
    let response: ICard[] = [];
    global.count++;

    if (search && typeof search.searchInputValue === 'string') {
        response = await movies.searchMovie(
            search.searchInputValue,
            global.count
        );
    } else {
        switch (activeCategory) {
            case 'upcoming':
                response = await movies.getUpcomingMovies(global.count);
                break;
            case 'top_rated':
                response = await movies.getTopRatedMovies(global.count);
                break;
            default:
                response = await movies.getPopularMovies(global.count);
                break;
        }
    }

    if (response.length) {
        global.data.push(...response);
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
            const cards = createMovieCards(
                global.data,
                favoriteMoviesContainer
            );
            cardsContainer.append(cards, loadMoreBtn);
        }
    }
};

export { createLoadMoreMoviesBtn, loadMoreMovies };
