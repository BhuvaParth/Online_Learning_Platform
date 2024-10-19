import { Route, Routes } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import Courses from "./components/Courses";
import Navbar from "./components/Navbar";
import UserDashboard from "./components/UserDashboard";
import Home from "./pages/Home";
import LessonPlayer from "./components/LessonPlayer";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courseform" element={<CourseForm />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
    </>
  );
}

export default App;
