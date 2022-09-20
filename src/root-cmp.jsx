import '../src/assets/styles/main.scss';
import { Routes, Route } from 'react-router-dom'
import { Home } from '../src/cmps/home/home'
import { BoardApp } from './pages/board/board-app.jsx'
import { TaskEdit } from './cmps/board/task/task-edit.jsx'
import { LoginSignup } from './pages/user/login-signup'
import { SubSidebar } from './cmps/side-bar/sub-sidebar';
import { SidebarNarrow } from './cmps/side-bar/sidebar-narrow';


function App() {
  return (
    <section className='app main-layout'>
      <Routes>
        <Route path='auth/:status' element={<LoginSignup />} />
        {/* <Route path='/board/:id/description' element={<BoardDesc />} /> */}
        <Route path='board/:id' element={<BoardApp />} >
          <Route path=':groupId/:taskId' element={<TaskEdit />} />
        </Route>
        <Route path='workspace' element={<SubSidebar />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <SidebarNarrow />
    </section>
  );
}

export default App;
