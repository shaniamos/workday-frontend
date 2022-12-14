import { httpService } from "./http.service.js"
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { socketService, SOCKET_EMIT_BOARDS_CHANGE, SOCKET_EMIT_BOARD_CHANGED, SOCKET_EMIT_SET_BOARD_ID } from "./socket.service";

export const boardService = {
    queryBoards,
    getBoardById,
    removeBoard,
    saveBoard,

    queryGroups,
    getGroupById,
    removeGroup,
    addGroup,
    updateGroup,

    queryTasks,
    getTaskById,
    removeTask,
    addTask,
    updateTask,

    removeComment,
    addComment,
}

const BASE_URL = `board/`

//BoardService
async function queryBoards() {
    try {
        return await httpService.get(BASE_URL)
    } catch (err) {
        throw err
    }
}

async function getBoardById(boardId) {
    return await httpService.get(BASE_URL + boardId)
}

async function removeBoard(boardId) {
    return await httpService.delete(BASE_URL + boardId)
}

async function saveBoard(board) {
    if (board._id) {
        const res = await httpService.put(BASE_URL + board._id, board)
        socketService.emit(SOCKET_EMIT_BOARD_CHANGED, res)
        return res
    } else {
        if (!board.groups) board = _createBoard(board)
        const res = await httpService.post(BASE_URL, board)
        socketService.emit(SOCKET_EMIT_BOARDS_CHANGE, res)
        return res
    }
}

//GroupService
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

async function getGroupById(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        return group
    } catch (err) {
        throw err
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const newGroups = board.groups.filter(group => group.id !== groupId)
        board.groups = newGroups
        return saveBoard(board)
    } catch (err) {
        throw err
    }
}

async function addGroup(boardId, group, place = '') {
    try {
        const board = await getBoardById(boardId)
        group.id = utilService.makeId()
        if (!group.tasks) {
            group.colorId = "--color-working_orange"
            group.style = {}
            group.tasks = []
        }
        if (place === 'first') board.groups.unshift(group)
        if (place === 'last') board.groups.push(group)
        return saveBoard(board)
    } catch (err) {
        throw err
    }
}

async function updateGroup(boardId, group) {
    try {
        const board = await getBoardById(boardId)
        const updatedGroups = board.groups.map(currGroup => (currGroup.id === group.id) ? group : currGroup)
        board.groups = updatedGroups
        return saveBoard(board)
    } catch (err) {
        throw err
    }
}

//TaskService
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

async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        throw err
    }
}

async function removeComment(boardId, groupId, taskId, commentIdx) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        board.groups[groupIdx].tasks[taskIdx].comments.splice(commentIdx, 1)
        return saveBoard(board)
    }
    catch (err) {
        console.error(err, 'Cannot delete comment')
        throw err
    }
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const newTasks = board.groups[groupIdx].tasks.filter(task => task.id !== taskId)
        board.groups[groupIdx].tasks = newTasks
        return saveBoard(board)
    } catch (err) {
        throw err
    }
}

async function addTask(boardId, groupId, task) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        // if the user clicked on 'New Item' button, 
        // the task should appear at the top of the group
        if (task.title === 'New Item')
            board.groups[groupIdx].tasks.unshift(task)
        // if the user clicked on 'Add Item' button,
        // the task should appear at the bottom of the group
        else board.groups[groupIdx].tasks.push(task)
        return saveBoard(board)
        // return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

async function updateTask(boardId, groupId, task) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = await board.groups.findIndex(group => group.id === groupId)
        const updatedTasks = await board.groups[groupIdx].tasks.map(currTask => (currTask.id === task.id) ? task : currTask)
        board.groups[groupIdx].tasks = updatedTasks
        return saveBoard(board)
    } catch (err) {
        throw err
    }
}

async function addComment(boardId, groupId, taskId, newCommentTxt) {
    try {
        const newComment = createComment(newCommentTxt)
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        board.groups[groupIdx].tasks[taskIdx].comments.unshift(newComment)
        return saveBoard(board)
    }
    catch (err) {
        console.error(err, 'Add comment failed');
        throw err
    }
}

function createComment(txt) {
    const currUser = userService.getLoggedinUser()
    console.log('currUser', currUser);
    if (currUser) {
        return {
            byMember: {
                id: utilService.makeId(4),
                fullname: currUser.fullname,
                imgUrl: currUser.imgUrl,
            },
            createdAt: Date.now(),
            content: {
                txt: txt,
                likes: [],
                replys: []
            }
        }
    } else
        return {
            byMember: {
                id: utilService.makeId(4),
                fullname: 'Guest',
                imgUrl: "https://cdn.monday.com/icons/dapulse-person-column.svg",
            },
            createdAt: Date.now(),
            content: {
                txt: txt,
                likes: [],
                replys: []
            }
        }
}

function _createBoard(board) {
    board.members = [
        {
            id: 'm101',
            fullname: 'Tal Elmaliach',
            imgUrl: 'https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568',
            title: 'Fullstack Developer',
        },
        {
            id: 'm102',
            fullname: 'Bar Mendel',
            imgUrl: 'https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394',
            title: 'Fullstack Developer',

        },
        {
            id: 'm103',
            fullname: 'Shani Amos',
            imgUrl: 'https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932',
            title: 'Fullstack Developer',
        },
        {
            id: 'm104',
            fullname: 'Ori Ben Amram',
            imgUrl: 'https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742',
            title: 'Team Leader',
        }
    ]
    board.labels = [
        {
            name: "status",
            options: [
                {
                    id: "--color-done-green",
                    title: "Done",
                    color: "#00c875"
                },
                {
                    id: "--color-orange",
                    title: "Working on it",
                    color: "#fdab3d"
                },
                {
                    id: "--color-lipstick",
                    title: "On Hold",
                    color: "#ff5ac4"
                },
                {
                    id: "--color-stuck-red",
                    title: "Stuck",
                    color: "#e2445c"
                },
            ],
        },
        {
            name: "priority",
            options: [
                {
                    id: "--color-error",
                    title: "Critical",
                    color: "#d83a52"
                },
                {
                    id: "--color-orange",
                    title: "High",
                    color: "#fdab3d"
                },
                {
                    id: "--color-bright-blue",
                    title: "Medium",
                    color: "#579bfc"
                },
                {
                    id: "--color-done-green",
                    title: "Low",
                    color: "#00c875"
                },
            ]
        }
    ]
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
    task.persons = []
    task.deadLine = ''
    task.comments = []
    task.lastUpdate = Date.now()
    task.timeline = [Date.now(), Date.now()]
    return task
}