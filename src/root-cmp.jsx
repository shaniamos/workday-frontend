import '../src/assets/styles/main.scss';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home.jsx'
import { BoardApp } from './pages/board-app.jsx'
import { BoardDesc } from './cmps/board-desc.jsx'
import { TaskEdit } from './pages/task-edit.jsx'
import { LoginSignup } from './pages/login-signup.jsx'


function App() {
  return (
    <section className='app main-layout'>
      <Routes>
        <Route path='auth/:status' element={<LoginSignup />} />
        {/* <Route path='/board/:id/description' element={<BoardDesc />} /> */}
        <Route path='board/:id' element={<BoardApp />} >
          <Route path='edit/:taskId' element={<TaskEdit />} />
        </Route>
        <Route path='/' element={<Home />} />
      </Routes>
    </section>
  );
}

export default App;
