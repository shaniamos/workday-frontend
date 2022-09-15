import { Home } from './pages/home.jsx'
import { BoardApp } from './pages/board-app.jsx'
import { BoardDesc } from './cmps/board-desc.jsx'
import { ItemEdit } from './pages/item-edit.jsx'
import { LoginSignup } from './pages/login-signup.jsx'


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <Home/>,
        label: 'Home', //LOGO 
    },
    {
        path: 'board/:id',
        component: <BoardApp/>,
    },
    // {
    //     path: 'board/:id/description',
    //     component: <BoardDesc/>,
    // },
    {
        path: 'board/:id/edit/:id',
        component: <ItemEdit/>,
    },
    {
        path: 'auth/:status',
        component: <LoginSignup/>,
    }
]

export default routes