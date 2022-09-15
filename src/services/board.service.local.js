import { storageService } from './async-storage.service.js'
import { board } from '../data/data.js'

export const boardService = {
    query,
    saveBoard,
    removeBoard,
    getByBoardId,
    saveTask,
    removeTask,
    getByTaskId,
}

const STORAGE_KEY = 'board'
const defultBoards = [board]

// CRUDL Board

async function query(filterBy) {

    try {
        let boards = await storageService.query(STORAGE_KEY)

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
    } catch (err) {
        console.error(err)
    }
}

function getByBoardId(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function removeBoard(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function saveBoard(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        board.groups = []
        return storageService.post(STORAGE_KEY, board)
    }
}


// CRUDL Groups




// CRDUL Task

function getByTaskId(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
}

async function removeTask(boardId, groupId, taskId) {
    console.log(boardId)
    const board = await getByBoardId(boardId)
    const group = board.groups.find(group => group.id === groupId) // getbygroupid
    const newTasks = group.tasks.filter(task => task.id !== taskId)
    board.groups.forEach((group, idx) => {
        if (group.id === groupId)
            board.groups[idx].tasks = newTasks
    })
    return storageService.put(STORAGE_KEY, board)
}

function saveTask(task) {
    if (task._id) {
        return storageService.put(STORAGE_KEY, task)
    } else {
        return storageService.post(STORAGE_KEY, task)
    }
}