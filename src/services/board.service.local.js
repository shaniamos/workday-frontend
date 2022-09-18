import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { board } from '../data/data.js'

export const boardService = {
    queryBoards,
    saveBoard,
    removeBoard,
    getBoardById,
    queryGroups,
    saveGroup,
    removeGroup,
    getGroupById,
    queryTasks,
    saveTask,
    removeTask,
    getTaskById,
    filterGroupAndTasks
}

const STORAGE_KEY = 'board'
const defultBoards = [board]

// CRUDL Board

async function queryBoards(filterBy) {

    try {
        let boards = await storageService.query(STORAGE_KEY)
        if (!boards || !boards.length) {
            storageService.postMany(STORAGE_KEY, defultBoards)
            boards = defultBoards
        }
        if (filterBy) {
            // console.log('filterBy', filterBy);
            const { txt } = filterBy
            // console.log('txt', txt);
            if (txt) {
                const regex = new RegExp(txt, 'i')
                boards = boards.filter(board => regex.test(board.title))
            }
        }
        return boards
    } catch (err) {
        console.error(err)
    }
}

// get board by id
function getBoardById(boardId) {
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

// filter
async function filterGroupAndTasks(boardId, filterBy = {}) {
    try {
        const regex = new RegExp(filterBy.txt, 'i')
        const board = await getBoardById(boardId)
        let groups = [...board.groups]

         board.groups = await groups.filter(async (group) => {

            if (regex.test(group.title)) {
                return group
            }
            else {

                const tasks = await queryTasks(boardId, group.id, filterBy)
                console.log('tasks from service', tasks);
                if (tasks.length) {
                    group.tasks = tasks
                    return group
                }
            }
        })
        return board
    }

    catch (err) {
        console.error(err);
        throw err
    }
}


// get groups
async function queryGroups(boardId, filterBy = {}) {
    try {
        const board = await getBoardById(boardId)
        var groups = [...board.groups]

        if (filterBy) {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                groups = groups.filter(group => regex.test(group.title))
            }
        }
        return groups
    } catch (err) {
        throw err
    }
}

// get group by id
async function getGroupById(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        return group
    } catch (err) {
        throw err
    }
}

// remove group
async function removeGroup(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
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
        const board = await getBoardById(boardId)
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

// CRUDL Task

//get tasks
async function queryTasks(boardId, groupId, filterBy) {
    try {
        const group = await getGroupById(boardId, groupId)
        // console.log('group from service', group);
        let tasks = [...group.tasks]

        if (filterBy) {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                tasks = tasks.filter(task => regex.test(task.title))
            }
        }
        return tasks
    } catch (err) {
        throw err
    }
}

// get task by id
async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const task = group.find(task => task.id === taskId)
        return task
    } catch (err) {
        throw err
    }
}

// remove task
async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getBoardById(boardId)
        const group = await getGroupById(boardId, groupId)
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
        if (!boardId || !groupId || !task) {
            const boards = await queryBoards()
            boardId = boards[0]._id
            groupId = boards[0].groups[0].id
            task = { title: 'New Item' }
        }

        const board = await getBoardById(boardId)
        const group = await getGroupById(boardId, groupId)
        if (task.id) {
            task.lastUpdated = Date.now()
            const updatedTasks = group.tasks.map(currTask => (currTask.id === task.id) ? task : currTask)
            board.groups.forEach((group, idx) => {
                if (group.id === groupId)
                    board.groups[idx].tasks = updatedTasks
            })
        } else {
            if (!task.persons)
                task = _createTask(task)
            else {
                task.id = utilService.makeId()
                task.lastUpdate = Date.now()
            }
            board.groups.forEach((group, idx) => {
                if (group.id === groupId) {
                    if (task.title === 'New Item')
                        board.groups[idx].tasks.unshift(task)
                    else board.groups[idx].tasks.push(task)
                }
            })
        }
        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

async function updateTask(boardId, groupId, taskId, taskToUpdate) {
    // const board = await getBoardById(boardId)
    // board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
    // saveBoard(board)
}


function _createBoard(board) {
    board._createdAt = Date.now()
    board.groups = [
        {
            id: utilService.makeId(),
            title: "Group 1",
            style: {},
            tasks: [],
            colorId: '--color-default_group_color',

        },
        {
            id: utilService.makeId(),
            title: "Group 2",
            style: {},
            tasks: [],
            colorId: '--shareable-color',
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