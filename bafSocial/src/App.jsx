import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./component/auth/AuthLayout";
import AppLayout from "./component/app/AppLayout";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";
import SavedPost from "./pages/SavedPost";
import LikedPost from "./pages/LikedPost";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Home />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="saved-post" element={<SavedPost />} />
          <Route path="liked-post" element={<LikedPost />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
