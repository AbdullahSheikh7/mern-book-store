import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import LoadingBar from "react-top-loading-bar";
import { AppContext } from "./contexts/AppContext.js";
import { SnackbarProvider } from "notistack"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books/create",
    element: <CreateBook />,
  },
  {
    path: "/books/details/:id",
    element: <ShowBook />,
  },
  {
    path: "/books/edit/:id",
    element: <EditBook />,
  },
  {
    path: "/books/delete/:id",
    element: <DeleteBook />,
  },
]);

const App = () => {
  const LoadingBarRef = useRef();

  return (
    <>
      {/* <BrowserRouter>
        <AppContext.Provider value={LoadingBarRef}>
          <SnackbarProvider>
          <LoadingBar color="#242424" ref={LoadingBarRef} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
          </Routes>
          </SnackbarProvider>
        </AppContext.Provider>
      </BrowserRouter> */}

      <AppContext.Provider value={LoadingBarRef}>
        <SnackbarProvider>
          <LoadingBar color="#242424" ref={LoadingBarRef} />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
