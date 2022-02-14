import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './page/HomePage';
import NotFound from './page/NotFound';
import LoginPage from './page/LoginPage';
import Settings from './page/Settings';
import RegisterPage from "./page/RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
