import { ILocalstorage } from '../../common/models/localstorage.model';

export const setLocalStorageItem = <T>(key: string, val: T) => {
    const value = typeof val === 'object' ? JSON.stringify(val) : String(val);
    localStorage.setItem(key, value);
};

export const getObjectFromLocalStorage = (
    key: string
): ILocalstorage | null => {
    const data = localStorage.getItem(key);
    if (data) {
        const item: ILocalstorage = JSON.parse(data);
        return item;
    }
    return null;
};
