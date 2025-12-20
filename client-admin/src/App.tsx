import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Hi</div>} />
        <Route path='/session/:id' element={<div>session</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
