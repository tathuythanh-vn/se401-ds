import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageFilePage from './pages/ManageFilePage';
import CreateFilePage from './pages/CreateFilePage';
import ManageStudentPage from './pages/ManageStudentPage';
import './App.css';
import { LayoutPage } from './pages/LayoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage-file" element={<ManageFilePage />} />
          <Route path="/create-file" element={<CreateFilePage />} />
          <Route path="/manage-student" element={<ManageStudentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
