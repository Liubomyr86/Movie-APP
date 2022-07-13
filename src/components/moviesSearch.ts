import {
    ApiQueryValue,
    searchMovieAttributeProperty,
    searchMovieAttributeValue,
    searchMovieBtnValue,
    searchMovieIdValue,
    tagName,
} from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { createHTMLElement, setLocalStorageItem } from '../helpers/helpers';
import { movies } from '../services/services';
import { global } from '../store/store';
import { createMovieCards } from './moviesCardContainer';

const createMoviesSearch = (): HTMLFormElement => {
    const form = createHTMLElement({
        tagName: tagName.FORM,
        className: 'form-inline col-6 px-2 d-flex',
        attributes: {
            [searchMovieAttributeProperty.ONSUBMIT]:
                searchMovieAttributeValue.ONSUBMIT,
        },
    }) as HTMLFormElement;
    const formInput = createHTMLElement({
        tagName: tagName.INPUT,
        className: 'form-control m-2',
        attributes: {
            [searchMovieAttributeProperty.PLACEHOLDER]:
                searchMovieAttributeValue.PLACEHOLDER,
            [searchMovieAttributeProperty.ID]: searchMovieIdValue.SEARCH,
            [searchMovieAttributeProperty.TYPE]: searchMovieAttributeValue.TYPE,
        },
    }) as HTMLInputElement;
    formInput.required = true;
    const formButton = createHTMLElement({
        tagName: tagName.BUTTON,
        className: 'btn btn-dark m-2',
        attributes: {
            [searchMovieAttributeProperty.ID]: searchMovieIdValue.SUBMIT,
        },
    }) as HTMLButtonElement;

    formButton.innerText = searchMovieBtnValue.SEARCH;
    form.append(formInput, formButton);

    return form;
};

const searchMovie = async (
    e: Event,
    search: Element,
    cardsContainer: Element,
    loadMoreBtn: Element,
    favoriteMoviesContainer: Element
): Promise<void> => {
    const target = e.target! as HTMLElement;
    const searchInputValue = (
        search.firstChild as HTMLInputElement
    ).value.trim();
    let response: ICard[] = [];

    global.count = ApiQueryValue.PAGE;

    if (target.id === 'submit' && searchInputValue.length) {
        response = await movies.searchMovie(
            searchInputValue,
            ApiQueryValue.PAGE
        );
        setLocalStorageItem('search', {
            isSearch: 'true',
            searchInputValue,
        });
    }

    if (response.length) {
        global.data = response;
        cardsContainer!.innerHTML = '';
        const cards = createMovieCards(global.data, favoriteMoviesContainer);
        cardsContainer?.append(cards, loadMoreBtn);
    }
};

const clearSearchBar = async (
    cardsContainer: Element,
    loadMoreBtn: Element,
    favoriteMoviesContainer: Element
): Promise<void> => {
    const activeCategory = localStorage.getItem('active_category');
    global.count = ApiQueryValue.PAGE;
    let response: ICard[] = [];
    localStorage.removeItem('search');

    switch (activeCategory) {
        case 'upcoming':
            response = await movies.getUpcomingMovies(ApiQueryValue.PAGE);
            break;
        case 'top_rated':
            response = await movies.getTopRatedMovies(ApiQueryValue.PAGE);
            break;
        default:
            response = await movies.getPopularMovies(ApiQueryValue.PAGE);
            break;
    }

    if (response.length) {
        global.data = response;
        cardsContainer!.innerHTML = '';
        const cards = createMovieCards(global.data, favoriteMoviesContainer);
        cardsContainer?.append(cards, loadMoreBtn);
    }
};

export { createMoviesSearch, searchMovie, clearSearchBar };
