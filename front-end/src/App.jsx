import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ArticlesList from "./pages/ArticlesList.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticlesList />,
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
