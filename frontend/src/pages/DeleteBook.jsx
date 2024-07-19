import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack"

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const LoadingBar = useContext(AppContext);

  const handleDeleteBook = async () => {
    setLoading(true);
    LoadingBar.current.continuousStart();
    await axios
      .delete(`${window.location.protocol}//${window.location.hostname}:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        LoadingBar.current.complete();
        navigate("/");
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        LoadingBar.current.complete();
        // alert("An error occurred. Please check the console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  document.title = "Delete Book";

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
