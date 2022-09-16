import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { board } from '../data/data.js'

export const boardService = {
    query,
    saveBoard,
    removeBoard,
    getByBoardId,
    removeGroup,
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

// remove group
async function removeGroup(boardId, groupId) {
    try {
        const board = await getByBoardId(boardId)
        const newGroups = board.groups.filter(group => group.id !== groupId)
        board.groups = newGroups
        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }

}


// CRDUL Task

// get task by id
async function getByTaskId(boardId, groupId, taskId) {
    try {
        const board = await getByBoardId(boardId)
        const group = board.groups.find(group => group.id === groupId) // getbygroupid
        const task = group.find(task => task.id === taskId)
        return task
    } catch (err) {
        throw err
    }
}

// remove task
async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getByBoardId(boardId)
        const group = board.groups.find(group => group.id === groupId) // getbygroupid
        const newTasks = group.tasks.filter(task => task.id !== taskId)
        board.groups.forEach((group, idx) => {
            if (group.id === groupId)
                board.groups[idx].tasks = newTasks
        })
        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }

}

// add + update task
async function saveTask(boardId, groupId, task) {
    try {
        const board = await getByBoardId(boardId)
        const group = board.groups.find(group => group.id === groupId) // getbygroupid
        if (task.id) {
            const updatedTasks = group.tasks.map(currTask => (currTask.id === task.id) ? task : currTask)
            board.groups.forEach((group, idx) => {
                if (group.id === groupId)
                    board.groups[idx].tasks = updatedTasks
            })
        } else {
            task.id = utilService.makeId()
            task.status = ''
            task.priority = ''
            task.persons = ''
            task.deadLine = ''
            task.lastUpdate = Date.now()
            group.tasks.push(task)
            board.groups.forEach((group, idx) => {
                if (group.id === groupId)
                    board.groups[idx] = group
            })
        }
        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}