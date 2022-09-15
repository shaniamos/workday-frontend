// Guidelines
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
const activity = {
    "id": makeId(),
    "entity": "", // Columns: Status/Priority/Person, Board: Created/Delete
    "txt": "Changed Color",
    "createdAt": Date.now(),
    "byMember": userService.getLoggedinUser(),
    "item": item
}
const activity3 = {
    "id": makeId(),
    "txt": "Changed Color",
    "createdAt": Date.now(),
    "byMember": userService.getLoggedinUser(),
    "task": task
}


// Store - saveTask
function storeSaveTask(task, activity) {

    board = boardService.saveTask(boardId, groupId, task, activity)
    commit(board)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}

const task = {

}


const board = {
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
            "status-picker": [
                {
                    "id": "ls101",
                    "title": "Done",
                    "color": "#00C875"
                },
                {
                    "id": "ls102",
                    "title": "Working on it",
                    "color": "#61bd33"
                    //rgb(241 163 59)
                }]
        },
        {
            "priority-picker": [
                {
                    "id": "lp101",
                    "title": "Critical",
                    "color": "#00C875"
                },
                {
                    "id": "lp102",
                    "title": "High",
                    "color": "#61bd33"
                    //rgb(241 163 59)
                }]
        },

    ],
    "members": [
        {
            "_id": "m101",
            "fullname": "Tal Elmaliach",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "m102",
            "fullname": "Bar Mendel",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "m103",
            "fullname": "Shani Amos",
            "imgUrl": "https://www.google.com"
        },
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Design",
            // "archivedAt": 1589983468418,
            "items": [
                {
                    "id": "i101",
                    "title": "Media queries",
                    "persons": [],
                    "status": "Done",
                    "Priority": "Low",
                    "Deadline": "1589983468418",
                    "LastUpdated": "1589983468418",
                    "updates": [
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
                                "replys": [] //arr of updates    
                            }
                        },
                        {
                            "memberId": "m102",
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of updates    
                            }
                        },
                    ],

                },
                // {
                //     "id": "i102",
                //     "title": "Nav Modal"
                // },  
            ],
            // "style": {},
            "color": rgb(156, 211, 38),
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    "archivedAt": 1589983468418,
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    // "comments": [
                    //     {
                    //         "id": "ZdPnm",
                    //         "txt": "also @yaronb please CR this",
                    //         "createdAt": 1590999817436.0,
                    //         "byMember": {
                    //             "_id": "u101",
                    //             "fullname": "Tal Tarablus",
                    //             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    //         }
                    //     }
                    // ],
                    "updates": [
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
                                "replys": [] //arr of updates    
                            }
                        },
                        {
                            "memberId": "m102",
                            "createdAt": "1589983468418",
                            "content": {
                                "txt": "What's going on",
                                "likes": [],
                                "replys": [] //arr of updates    
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
                    // "memberIds": ["u101"],
                    "persons": ["u101"],
                    "status": "in-progress",
                    // "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    color: "#26de81"
                    // "style": {
                    //     "bgColor": "#26de81"
                    // }
                }
            ],
            "style": {}
        }
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
    // for monday
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
