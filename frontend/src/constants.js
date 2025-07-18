import EditPost from "./pages/EditPost";

export const serverPath =
  process.env.REACT_APP_API_URL || "http://localhost:4000/";
export const serverLinks = {
  login: serverPath + "login",
  register: serverPath + "register",
  profile: serverPath + "profile",
  logout: serverPath + "logout",
  createPost: serverPath + "post",
  getPosts: serverPath + "post",
  postDetail: serverPath + "post/",
  editPost: serverPath + "post/",
};
