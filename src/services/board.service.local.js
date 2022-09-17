import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { board } from '../data/data.js'

export const boardService = {
    query,
    saveBoard,
    removeBoard,
    getByBoardId,
    saveGroup,
    removeGroup,
    getByGroupId,
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

// get board by id
function getByBoardId(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

//remove board
function removeBoard(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

// add + update board
function saveBoard(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        board = _createBoard(board)
        return storageService.post(STORAGE_KEY, board)
    }
}

// CRUDL Groups

// get group by id
async function getByGroupId(boardId, groupId) {
    try {
        const board = await getByBoardId(boardId)
        const group = board.groups.find(group => group.id === groupId)
        return group
    } catch (err) {
        throw err
    }
}

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

// add + update group
async function saveGroup(boardId, group) {
    try {
        const board = await getByBoardId(boardId)
        if (group.id) {
            const updatedGroups = board.groups.map(currGroup => (currGroup.id === group.id) ? group : currGroup)
            board.groups = updatedGroups
        }
        else {
            group.id = utilService.makeId()
            group.style = {}
            group.tasks = []
            board.groups.push(group)
        }
        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

// CRDUL Task

// get task by id
async function getByTaskId(boardId, groupId, taskId) {
    try {
        const group = await getByGroupId(boardId, groupId)
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
        const group = await getByGroupId(boardId, groupId)
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
        const group = await getByGroupId(boardId, groupId)
        if (task.id) {
            task.lastUpdated = Date.now()
            const updatedTasks = group.tasks.map(currTask => (currTask.id === task.id) ? task : currTask)
            board.groups.forEach((group, idx) => {
                if (group.id === groupId)
                    board.groups[idx].tasks = updatedTasks
            })
        } else {
            task = _createTask(task)
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

function _createBoard(board) {
    board._createdAt = Date.now()
    board.groups = [
        {
            id: utilService.makeId(),
            style: {},
            tasks: []
        },
        {
            id: utilService.makeId(),
            style: {},
            tasks: []
        },
    ]
    for (let i = 0; i < 5; i++) {
        if (i < 3)
            board.groups[0].tasks.push(_createTask({ title: `Item ${i + 1}` }))
        else
            board.groups[1].tasks.push(_createTask({ title: `Item ${i + 1}` }))
    }
    return board
}

function _createTask(task) {
    task.id = utilService.makeId()
    task.status = ''
    task.priority = ''
    task.persons = ''
    task.deadLine = ''
    task.lastUpdate = Date.now()
    return task
}