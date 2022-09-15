import { storageService } from './async-storage.service.js'
import { board } from '../data/data.js'

export const boardService = {
    query,
    save,
    remove,
    getById,
}

const STORAGE_KEY = 'board'
const defultBoards = [board]

function query(filterBy) {
    return storageService.query(STORAGE_KEY).then(boards => {

        if (!boards || !boards.length) {
            storageService.postMany(STORAGE_KEY, defultBoards)
            boards = defultBoards
        }
        if (filterBy) {
            const { name, minPrice } = filterBy
            if (name) {
                const regex = new RegExp(name, 'i')
                boards = boards.filter(board => regex.test(board.name))
            }

            if (minPrice) {
                boards = boards.filter(board => board.price >= minPrice)
            }
        }

        return boards
    })
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        board.createdAt = Date.now()
        board.inStock = true
        board.labels = ["Doll", "Battery Powered", "Baby"]
        return storageService.post(STORAGE_KEY, board)
    }
}