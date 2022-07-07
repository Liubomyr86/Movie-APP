import {
    tagName,
    selectorsWrraperAtributeProperty,
    selectorsWrraperAtributeValue,
    selectorsInputAtributeProperty,
    selectorsInputAtributeValue,
    selectorsInputIdValue,
    selectorsLabelNameValue,
    selectorsLabelAtributeProperty,
} from '../common/enums/enum';
import { ISelectior } from '../common/models/selector.model';
import { createHTMLElement } from '../helpers/helpers';

export const createMovieSelectors = (): HTMLElement => {
    const selectorWrapper = createHTMLElement({
        tagName: tagName.DIV,
        className: 'btn-group',
        attributes: {
            [selectorsWrraperAtributeProperty.ID]:
                selectorsWrraperAtributeValue.ID,
            [selectorsWrraperAtributeProperty.SROLE]:
                selectorsWrraperAtributeValue.SROLE,
            [selectorsWrraperAtributeProperty.ARIA_LABEL]:
                selectorsWrraperAtributeValue.ARIA_LABEL,
        },
    });

    const popularSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.POPULAR,
        selectorForId: selectorsInputIdValue.POPULAR,
        checked: true,
    });
    const upcomingSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.UPCOMING,
        selectorForId: selectorsInputIdValue.UPCOMING,
    });
    const topRatedSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.TOP_RATED,
        selectorForId: selectorsInputIdValue.TOP_RATED,
    });

    selectorWrapper.append(
        ...popularSelect,
        ...upcomingSelect,
        ...topRatedSelect
    );
    return selectorWrapper;
};

const createMovieSelector = ({
    selectorName,
    selectorForId,
    checked = false,
}: ISelectior): (HTMLInputElement | HTMLLabelElement)[] => {
    const selectorInput = createHTMLElement({
        tagName: tagName.INPUT,
        className: 'btn-check',
        attributes: {
            [selectorsInputAtributeProperty.TYPE]:
                selectorsInputAtributeValue.TYPE,
            [selectorsInputAtributeProperty.NAME]:
                selectorsInputAtributeValue.NAME,
            [selectorsInputAtributeProperty.ID]: `${selectorForId}`,
            [selectorsInputAtributeProperty.AUTOCOMPLETE]:
                selectorsInputAtributeValue.AUTOCOMPLETE,
        },
    }) as HTMLInputElement;
    selectorInput.checked = checked;

    const selectorLabel = createHTMLElement({
        tagName: tagName.LABEL,
        className: 'btn btn-outline-dark',
        attributes: {
            [selectorsLabelAtributeProperty.FOR]: `${selectorForId}`,
        },
    }) as HTMLLabelElement;
    selectorLabel.innerText = selectorName;

    return [selectorInput, selectorLabel];
};
