import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import LoginPage from "./app/home/pages/LoginPage";
import PasswordRecoveryPage from "./app/home/pages/PasswordRecoveryPage";
import ContentDetailsPage from "./app/home/pages/ContentDetailsPage";
import ListTests from "./app/home/pages/ListTests";
import ContentsPage from "./app/home/pages/ContentsPage";
import Layout from "./app/home/components/Layout/Layout"; 
import CreateReviewPage from "./app/home/pages/CreateReviewPage";
import CreateContentPage from "./app/home/pages/CreateContentPage";
import RegistrationPage from "./app/home/pages/RegistrationPage";
import UserPage from "./app/home/pages/UserPage";
import ResetPasswordPage from "./app/home/pages/ResetPasswordPage";
import EditUserInfoPage from "./app/home/pages/EditUserPage";
import DeleteAccountPage from "./app/home/pages/DeleteAccountPage"
import UpdateContentPage from "./app/home/pages/UpdateContentPage";
import UserProfilePage from "./app/home/pages/ProfilePage";
import UpdateReviewPage from "./app/home/pages/UpdateReviewPage";
import FeedPage from "./app/home/pages/FeedPage";
import CreatePostPage from "./app/home/pages/CreatePostPage";
import PostPage from "./app/home/pages/PostPage";
import LikesPage from "./app/home/pages/LikesPage";
import { UserContext } from "./app/home/context/UserContext";
import { useState } from "react";
import { UserContextProps } from "./app/home/context/UserContext/userTypes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Layout><ContentsPage content_type = {"movies"} /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><LoginPage /></Layout>,
  },  
  {
    path: "/recover-account",
    element: <Layout><PasswordRecoveryPage /></Layout>,
  },  
  {
    path: "/contents/movies",
    element: <Layout><ContentsPage content_type = {"movies"} /></Layout>,
  },
  {
    path: "/contents/tv_shows",
    element: <Layout><ContentsPage content_type = {"tv_shows"} /></Layout>,
  },
  {
    path: "/contents/:content_type/:title",  
    element: <Layout><ContentDetailsPage /></Layout>,
  },
  {
    path: "/tests",
    element: <Layout><ListTests /></Layout>,
  },
  {
    path: "/contents/:content_type/:title/create_review",
    element: <Layout><CreateReviewPage /></Layout>,
  },
  {
    path: "/contents/:content_type/create_content",
    element: <Layout><CreateContentPage /></Layout>,
  },
  {
    path: "/register",
    element: <Layout><RegistrationPage /></Layout>,
  },
  {
    path: "/user/get_user/:userId",
    element: <Layout><UserPage /></Layout>,
  },
  {
    path: "/user/reset_password/:userId",
    element: <Layout><ResetPasswordPage /></Layout>,
  },
  {
    path: "/user/edit_user_info/:userId",
    element: <Layout><EditUserInfoPage /></Layout>,
  },
  {
    path: "/user/delete_account/:userId",
    element: <Layout><DeleteAccountPage /></Layout>,
  },
  {
    path: "/profile/:username/:content_type/:content_title/update_review",
    element: <Layout><UpdateReviewPage /></Layout>,
  },
  {    
    path: "/contents/:content_type/:title/update_content",
    element: <Layout><UpdateContentPage /></Layout>,
  },
  {
    path: "/profile/:username",
    element: <Layout><UserProfilePage /></Layout>,
  },
  {
    path: "/forum/feed",
    element: <Layout><FeedPage /></Layout>,
  },
  {
    path: "/forum/newpost",
    element: <Layout><CreatePostPage /></Layout>,
  },
  {
    path: "/forum/post/:postID",
    element: <Layout><PostPage /></Layout>,
  },
  {
    path: "/forum/post/:postID/likes",
    element: <Layout><LikesPage userList={[]}/></Layout>,
  } 
]);

export default function App() {
  const [user, setUser] = useState<UserContextProps>({} as UserContextProps)

  return (
    <UserContext.Provider value={
      {user, saveUser: setUser}
    }>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </UserContext.Provider>
  );
}