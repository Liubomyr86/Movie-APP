import { createCards } from './components/cardsView';

export async function render(): Promise<void> {
    // TODO render your app here
    const cardsContainer = document.body.querySelector(
        'div.album.py-5.bg-light div.container'
    );

    const cards = await createCards();
    cardsContainer?.append(cards);
}
