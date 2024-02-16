export const moveCardTask = ({ cards, cardId, board, index }) => {
    const card = Object.entries(cards).map(([board, tasks]) => {
        const card = tasks.find((task) => task.uuid === cardId);
        if (!card) return null;
        return { previousBoard: board, card }
    }).filter(Boolean)[0];

    if (!card) {
        return cards;
    }

    const newCards = {
        ...cards,
        [card.previousBoard]: cards[card.previousBoard].filter(
            (card) => card.uuid !== cardId,
        ),
        [board]: [
            ...cards[board].slice(0, index),
            card.card,
            ...cards[board].slice(index)
        ]
    }
    return newCards;
}