import { httpService } from "./http.service.js"

export const boardService = {
    query,
    getById,
    remove,
    save,
}

const BASE_URL = `board/`


async function query(filterBy = {}) {
    const boards = await httpService.get(BASE_URL, { params: filterBy })
    return boards
}
async function getById(boardId) {
    const board = await httpService.get(BASE_URL + boardId)
    return board
}
async function remove(boardId) {
    const board = await httpService.delete(BASE_URL + boardId)
    return board
}

async function save(board) {
    if (board._id) {
        const res = await httpService.put(BASE_URL + board._id, board)
        return res
    } else {
        const res = await httpService.post(BASE_URL, board)
        return res
    }
}


