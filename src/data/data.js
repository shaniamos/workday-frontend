//  Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level,
//    (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning
// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task
// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route
// (later on we can place it in a modal and nested route)
// Component

// const activity = {
//     // "id": makeId(),
//     "entity": "", // Columns: Status/Priority/Person, Board: Created/Delete
//     "txt": "Changed Color",
//     "createdAt": Date.now(),
//     // "byMember": userService.getLoggedinUser(),
//     // "item": item
// }
// const activity3 = {
//     // "id": makeId(),
//     "txt": "Changed Color",
//     "createdAt": Date.now(),
//     // "byMember": userService.getLoggedinUser(),
//     // "task": task
// }
// Store - saveTask
// function storeSaveTask(task, activity) {
//     board = boardService.saveTask(boardId, groupId, task, activity)
//     commit(board)
// }
// // boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678
//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }

// export const colors = [
//     { name: 'Grass Green', var: '--color-grass-green' , color: '#037f4c' },
//     { name: 'Bright Green', var: '--color-bright-green' , color: '#9cd326' },
//     { name: 'Saladish', var: '--color-saladish' , color: '#cab641' },
//     { name: 'Egg Yolk', var: '--color-egg_yolk' , color: '#037f4c' },
//     { name: 'Peach', var: '--color-peach' , color: '#ffadad' },
//     { name: 'Sunset', var: '--color-sunset' , color: '#ff7575' },
//     { name: 'Dark Red', var: '--color-dark-red' , color: '#bb3354' },
//     { name: 'Sofia Pink', var: '--color-sofia_pink' , color: '#ff158a' },
// ]

export const colors = {
    'Grass Green': { var: '--color-grass-green', color: '#037f4c' },
    'Bright Green': { var: '--color-bright-green', color: '#9cd326' },
    'Saladish': { var: '--color-saladish', color: '#cab641' },
    'Egg Yolk': { var: '--color-egg_yolk', color: '#037f4c' },
    'Peach': { var: '--color-peach', color: '#ffadad' },
    'Sunset': { var: '--color-sunset', color: '#ff7575' },
    'Dark Red': { var: '--color-dark-red', color: '#bb3354' },
    'Sofia Pink': { var: '--color-sofia_pink', color: '#ff158a' },
}

export const board = {
    "_id": "b101",
    "title": "Management Team",
    "archivedAt": 1589983468418,
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Jonathan Zuckerberg",
        "imgUrl": "http://some-img"
    },
    "style": {
        "bgColor": "#00C875"
    },
    "cmpsOrder": ["member-picker", "status-picker", "priority-picker", "date-picker", "last-updated"],
    "labels": [
        {
            "name": "status",
            "options": [
                {
                    "id": "--color-done-green",
                    "title": "Done",
                    "color": "#00c875"
                },
                {
                    "id": "--color-orange",
                    "title": "Working on it",
                    "color": "#fdab3d"
                },
                {
                    "id": "--color-lipstick",
                    "title": "On Hold",
                    "color": "#ff5ac4"
                },
                {
                    "id": "--color-stuck-red",
                    "title": "Stuck",
                    "color": "#e2445c"
                },
            ],
        }, 
        {
            "name": "priority",
            "options": [
                {
                    "id": "--color-error",
                    "title": "Critical",
                    "color": "#d83a52"
                },
                {
                    "id": "--color-orange",
                    "title": "High",
                    "color": "#fdab3d"
                },
                {
                    "id": "--color-bright-blue",
                    "title": "Medium",
                    "color": "#579bfc"
                },
                {
                    "id": "--color-done-green",
                    "title": "Low",
                    "color": "#00c875"
                },
            ]
        }
    ],
    "members": [
        {
            "_id": "m101",
            "fullname": "Tal Elmaliach",
            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
            'title': 'Fullstack Developer',
        },
        {
            "_id": "m102",
            "fullname": "Bar Mendel",
            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
            'title': 'Fullstack Developer',

        },
        {
            "_id": "m103",
            "fullname": "Shani Amos",
            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
            'title': 'Fullstack Developer',
        },
        {
            "_id": "m104",
            "fullname": "Ori Ben Amram",
            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
            'title': 'Team Leader',
        },
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Frontend Design",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "i101",
                    "title": "Media queries",
                    "persons": [
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                        {
                            "_id": "m104",
                            "fullname": "Ori Ben Amram",
                            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
                            'title': 'Team Leader',
                        },
                    ],
                    "status": "Working on it",
                    "priority": "Medium",
                    "deadline": Date.now(),
                    "lastUpdated": 1663091776159,
                    "comments": [
                        {
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Shani Amos",
                                "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932"
                            },
                            "createdAt": 1663091776159,
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                        {
                            "byMember": {
                                "_id": "u102",
                                "fullname": "Bar mendel",
                                "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394"
                            },
                            "createdAt": 1589983468418,
                            "content": {
                                "txt": "hey you",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                    ],
                },
                {
                    "id": "i102",
                    "title": "Create React app + PWA",
                    "persons": [
                        {
                            "_id": "m104",
                            "fullname": "Ori Ben Amram",
                            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
                            'title': 'Team Leader',
                        },
                    ],
                    "status": "On Hold",
                    "priority": "Medium",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663091776159,
                    "comments": [],
                },
                {
                    "id": "i103",
                    "title": "Open Repo + Set team collaboration",
                    "persons": [
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                    ],
                    "status": "Done",
                    "priority": "Critical",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663091776159,
                    "comments": [],
                },
                {
                    "id": "i104",
                    "title": "Fonts",
                    "persons": [
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                    ],
                    "status": "Working on it",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                    "comments": [
                        {
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                        {
                            "memberId": "m102",
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                    ],
                },
                {
                    "id": "i105",
                    "title": "Images do not show up",
                    "persons": [
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "Done",
                    "priority": "High",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663091776159,
                    "comments": [],
                },
                {
                    "id": "i106",
                    "title": "UI Components Buggy",
                    "persons": [
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "Done",
                    "priority": "High",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663091776159,
                    "comments": [],
                },
            ],
            "colorId": '--positive-color',
            "style": {},
        },
        {
            "id": "g102",
            "title": "Backend",
            "tasks": [
                {
                    "id": "c103",
                    "title": "REST API",
                    "archivedAt": 1589983468418,
                    "persons": [
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "On Hold",
                    "priority": "Critical",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663365269898,
                },
                {
                    "id": "c104",
                    "title": "Socket Service",
                    "description": "description",
                    "persons": [
                        {
                            "_id": "m104",
                            "fullname": "Ori Ben Amram",
                            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
                            'title': 'Team Leader',
                        },
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "Done",
                    "priority": "High",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663371422099,
                    "comments": [
                        {
                            "byMember": {
                                "_id": "u102",
                                "fullname": "Tal Elmaliach",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                        {
                            "memberId": "m102",
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of comments
                            }
                        },
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "createdAt": 1590999730348,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                },
                {
                    "id": "c105",
                    "title": "Postman tests",
                    "archivedAt": 1589983468418,
                    "persons": [],
                    "status": "Stuck",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                },
            ],
            "colorId": '--color-peach',
            "style": {},
        },
        {
            "id": "g103",
            "title": "Buglist",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Text does not align in text box",
                    "archivedAt": 1589983468418,
                    "persons": [
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "Done",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663365269898,
                },
                {
                    "id": "c104",
                    "title": "Can't sync with email",
                    "description": "description",
                    "persons": [
                        {
                            "_id": "m104",
                            "fullname": "Ori Ben Amram",
                            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
                            'title': 'Team Leader',
                        },
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "On Hold",
                    "priority": "Medium",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663371422099,
                    "comments": [],
                    "createdAt": 1590999730348,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },

                },
                {
                    "id": "c105",
                    "title": "Pictures do not show up",
                    "archivedAt": 1589983468418,
                    "persons": [],
                    "status": "",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                },
                {
                    "id": "c106",
                    "title": "Facebook log in fails",
                    "archivedAt": 1589983468418,
                    "persons": [],
                    "status": "Stuck",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                },
            ],
            "colorId": '--color-purple',
            "style": {},
        },
        {
            "id": "g104",
            "title": "General",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Text does not align in text box",
                    "archivedAt": 1589983468418,
                    "persons": [
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "Done",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663365269898,
                },
                {
                    "id": "c104",
                    "title": "Can't sync with email",
                    "description": "description",
                    "persons": [
                        {
                            "_id": "m104",
                            "fullname": "Ori Ben Amram",
                            "imgUrl": "https://files.monday.com/use1/photos/34311143/thumb_small/34311143-user_photo_2022_09_14_13_55_42.png?1663163742",
                            'title': 'Team Leader',
                        },
                        {
                            "_id": "m102",
                            "fullname": "Bar Mendel",
                            "imgUrl": "https://files.monday.com/use1/photos/34311145/thumb_small/34311145-user_photo_2022_09_14_12_43_14.png?1663159394",
                            'title': 'Fullstack Developer',

                        },
                        {
                            "_id": "m101",
                            "fullname": "Tal Elmaliach",
                            "imgUrl": "https://files.monday.com/use1/photos/34311144/thumb_small/34311144-user_photo_2022_09_14_12_46_08.png?1663159568",
                            'title': 'Fullstack Developer',
                        },
                        {
                            "_id": "m103",
                            "fullname": "Shani Amos",
                            "imgUrl": "https://files.monday.com/use1/photos/34310999/thumb_small/34310999-user_photo_2022_09_14_12_35_32.png?1663158932",
                            'title': 'Fullstack Developer',
                        },
                    ],
                    "status": "On Hold",
                    "priority": "Medium",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663371422099,
                    "comments": [],
                    "createdAt": 1590999730348,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },

                },
                {
                    "id": "c105",
                    "title": "Pictures do not show up",
                    "archivedAt": 1589983468418,
                    "persons": [],
                    "status": "",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                },
                {
                    "id": "c106",
                    "title": "Facebook log in fails",
                    "archivedAt": 1589983468418,
                    "persons": [],
                    "status": "Stuck",
                    "priority": "Low",
                    "deadline": 1589983468418,
                    "lastUpdated": 1663199753073,
                },
            ],
            "colorId": '--color-chili-blue',
            "style": {},
        },
    ],
    "activities": [],
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [
        {
            "id": "m101",
            "boardId": "m101",
            "taskId": "t101"
        },
    ]
}
// For Monday Mostly:
// Dynamic Components:
// <ItemPreview> => <tr>
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>
function updateTask(cmpType, data) {
    // Switch
    // task.members = data;
    // task.status = data;
    // dispatch to store: updateTask(task, activity)
}
const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'pending',
        statuses: [{}, {}]
    }
}
const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}
const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}
const cmp4 = {
    type: 'file-picker',
    info: {
        files: [],
    },
}
const cmp5 = {
    type: 'time',
    timestamp: '154514'
}
// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }
// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }