import '../src/assets/styles/main.scss';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home.jsx'
import { BoardApp } from './pages/board/board-app.jsx'
import { TaskEdit } from './cmps/board/task/task-edit.jsx'
import { LoginSignup } from './pages/user/login-signup'


function App() {
  return (
    <section className='app main-layout'>
      <Routes>
        <Route path='auth/:status' element={<LoginSignup />} />
        {/* <Route path='/board/:id/description' element={<BoardDesc />} /> */}
        <Route path='board/:id' element={<BoardApp />} >
          <Route path=':groupId/:taskId' element={<TaskEdit />} />
        </Route>
        <Route path='/' element={<Home />} />
      </Routes>
    </section>
  );
}

export default App;
