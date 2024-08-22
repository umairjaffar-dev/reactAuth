import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AuthWrapper from "./components/AuthWrapper";
import NotFound from "./pages/NotFound";
import CanvasApi from "./pages/CanvasApi";
// http://192.168.18.58:7177/login

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<AuthWrapper />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>,
    <Route path="/" element={<About />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="*" element={<NotFound />} />,
  ])
);

const App = () => {
  return (
    <>
      {/* <CanvasApi /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
