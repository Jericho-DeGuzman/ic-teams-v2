// TODO: create a function that undo the movement if failed to update in microservice

export const moveCardTask = ({ cards, cardId, board, index }) => {
    const cardData = Object.entries(cards).map(([prevBoard, tasks]) => {
        const card = tasks.find((task) => task.uuid === cardId);
        if (!card) return null;
        return { previousBoard: prevBoard, card };
    }).filter(Boolean)[0];

    if (!cardData) {
        return cards;
    }

    const { previousBoard, card } = cardData;

    // If the board remains the same, but the index is different
    if (previousBoard === board) {
        const updatedTasks = [...cards[board]];
        const currentIndex = updatedTasks.findIndex(task => task.uuid === cardId);
        if (currentIndex !== -1) {
            // Remove the card from its current position
            updatedTasks.splice(currentIndex, 1);
            // Insert the card into the new position
            updatedTasks.splice(index, 0, card);
        }
        return {
            ...cards,
            [board]: updatedTasks
        };
    }

    // If moving the card to a different board
    const newCards = {
        ...cards,
        [previousBoard]: cards[previousBoard].filter(
            (c) => c.uuid !== cardId,
        ),
        [board]: [
            ...cards[board].slice(0, index),
            { ...card, status: board },
            ...cards[board].slice(index)
        ]
    };

    return newCards; 
};
