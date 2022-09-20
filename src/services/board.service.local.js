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
    addTask,
    updateTask,
    removeTask,
    getTaskById,
    filterGroupAndTasks
}

const STORAGE_KEY = 'board'
const defultBoards = [board]

// CRUDL Board

// get boards
async function queryBoards(filterBy) {

    try {
        let boards = await storageService.query(STORAGE_KEY)
        if (!boards || !boards.length) {
            storageService.postMany(STORAGE_KEY, defultBoards)
            boards = defultBoards
        }
        if (filterBy) {
            const { txt } = filterBy
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


// remove board
function removeBoard(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

// add + update board
function saveBoard(board) {
    // update board
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
        // add board
    } else {
        board = _createBoard(board)
        return storageService.post(STORAGE_KEY, board)
    }
}

// CRUDL Groups

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
        // update group
        if (group.id) {
            const updatedGroups = board.groups.map(currGroup => (currGroup.id === group.id) ? group : currGroup)
            board.groups = updatedGroups
        }
        // add group
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

// get tasks
async function queryTasks(boardId, groupId, filterBy) {
    try {
        const group = await getGroupById(boardId, groupId)
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
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const newTasks = board.groups[groupIdx].tasks.filter(task => task.id !== taskId)

        board.groups[groupIdx].tasks = newTasks

        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

async function addTask(boardId, groupId, task) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)

        // if task empty, create new one
        if (!task.persons)
            task = _createTask(task)
        // else - duplicate the task - adding the same full task,
        // just with another id 
        else {
            task.id = utilService.makeId()
            task.lastUpdate = Date.now()
        }
        // if the user clicked on 'New Item' button, 
        // the task should appear at the top of the group
        if (task.title === 'New Item')
            board.groups[groupIdx].tasks.unshift(task)
        // if the user clicked on 'Add Item' button,
        // the task should appear at the bottom of the group
        else board.groups[groupIdx].tasks.push(task)

        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

// update task
async function updateTask(boardId, groupId, task) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)

        task.lastUpdated = Date.now()
        const updatedTasks = board.groups[groupIdx].tasks.map(currTask => (currTask.id === task.id) ? task : currTask)

        board.groups[groupIdx].tasks = updatedTasks

        return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

// filter groups and tasks title
async function filterGroupAndTasks(boardId, filterBy = { txt: '' }, sortBy) {
    try {
        const board = await getBoardById(boardId)
        let groups = [...board.groups]
        let filteredGroups = groups

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            filteredGroups = groups.filter((group) => {
                if (regex.test(group.title)) {
                    return group
                }
                else {
                    const filteredTasks = group.tasks.filter((task) => {
                        if (regex.test(task.title))
                            return task
                    })
                    group.tasks = filteredTasks
                    if (group.tasks.length) return group
                }
            })
        }
        if (sortBy) {
            switch (sortBy) {
                case 'itemTitle':
                    console.log('sortBy 1', sortBy);
                    filteredGroups.forEach(group => {
                        group.tasks.sort((a, b) => a.title.localeCompare(b.title))
                    })
                    break
                    // case 'personName':
                    //     console.log('sortBy 2', sortBy);
                    //     filteredGroups.forEach(group => {
                    //         group.tasks.forEach(task => {
                    //             task.persons.sort((a ,b) => a.fullname.localeCompare(b.fullname))
                    //         })
                    //     })
                    break
                case 'lastUpdate':
                    console.log('sortBy 3', sortBy);
                    filteredGroups.forEach(group => {
                        group.tasks.sort((a, b) => b.lastUpdated - a.lastUpdated)
                    })
                    break
                case 'deadline':
                    console.log('sortBy 4', sortBy);
                    filteredGroups.forEach(group => {
                        group.tasks.sort((a, b) => b.deadline - a.deadline)
                    })
                    break
            }
        }
        return filteredGroups
    }
    catch (err) {
        console.error(err);
        throw err
    }
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