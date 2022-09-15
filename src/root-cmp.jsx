import '../src/assets/styles/main.scss';

import { Routes, Route } from 'react-router-dom'
import routes from './routes'


function App() {
  return (
    <section className='app main-layout'>
      <Routes>
        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
      </Routes>
    </section>
  );
}

export default App;
