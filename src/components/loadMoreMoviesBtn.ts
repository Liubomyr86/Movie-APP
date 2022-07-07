import { tagName } from '../common/enums/enum';
import { createHTMLElement } from '../helpers/helpers';

export const createLoadMoreMoviesBtn = (): HTMLElement => {
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
