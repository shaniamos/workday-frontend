import '../src/assets/styles/main.scss';
import { Routes, Route } from 'react-router-dom'
import { Home } from '../src/cmps/home/home'
import { BoardApp } from './pages/board/board-app.jsx'
import { TaskEdit } from './cmps/board/task/task-edit.jsx'
import { LoginSignup } from './pages/user/login-signup.jsx'
import { SubSidebar } from './cmps/side-bar/sub-sidebar.jsx';
import { SidebarNarrow } from './cmps/side-bar/sidebar-narrow';
import { Dashboard } from './cmps/board/dashboard.jsx';
import { KanbanView } from './cmps/kanban/kanban-view.jsx';


function App() {
  return (
    <section className='app main-layout'>
      <Routes>
        <Route path='auth/:status' element={<LoginSignup />} />
        <Route path='board/:id' element={<BoardApp />} >
          <Route path=':groupId/:taskId' element={<TaskEdit />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='kanban' element={<KanbanView />} />
        </Route>
        <Route path='workspace' element={<SubSidebar />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <SidebarNarrow />
    </section>
  );
}

export default App;
