import {
    searchMovieAttributeProperty,
    searchMovieAttributeValue,
    searchMovieBtnValue,
    searchMovieIdValue,
    tagName,
} from '../common/enums/enum';
import { createHTMLElement } from '../helpers/helpers';

export const createMoviesSearch = () => {
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
