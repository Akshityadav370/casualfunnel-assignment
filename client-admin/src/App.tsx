import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SessionView from './pages/SessionView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/session/:sessionId' element={<SessionView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
