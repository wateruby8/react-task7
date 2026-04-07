import axios from "axios";
import { RouterProvider } from "react-router";
import { router } from "./router";

// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  return <RouterProvider router={router} />;
}

export default App;
