const uuidv4 = require('uuid/v4')

const createPlayer = ({ nickname = '', socketId = null } = {}) => ({
    id: uuidv4(),
    nickname,
    socketId,
    gameId: null,
    isInGame: false
})

const createGame = ({
    playerSockets,
    word,
    displayWord,
    nextPlayerIndex,
    guessed = []
}) => ({
    id: uuidv4(),
    word,
    displayWord,
    guessed,
    playerSockets,
    nextPlayerIndex,
    score: {},
    cards: {},
    dateTime: new Date().toJSON
})

module.exports = {
    createPlayer,
    createGame
}
