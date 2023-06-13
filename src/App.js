import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import RegistrationPage from './components/RegistrationPage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AddStudentPage from './components/AddStudentPage';

import DisplayPage from './components/DisplayPage';
// import ParentComponent from './components/ParentComponent';


function App() {
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      
      <Routes>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addstudent' element={<AddStudentPage />} />
        <Route path='/display' element={<DisplayPage />} />

      </Routes>
    </>
  );
}

export default App;