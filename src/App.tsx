import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuthStateChange } from "./_Hooks/useAuthStateChange";
import { allPageRoutes } from "./pages";

const App = () => {
  useAuthStateChange();
  return <RouterProvider router={createBrowserRouter(allPageRoutes)} />;
};

export default App;
