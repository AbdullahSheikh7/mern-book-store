import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack"

const backend = import.meta.env.VITE_Backend

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const LoadingBar = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      LoadingBar.current.continuousStart();
      await axios
        .get(`${backend}/books/${id}`)
        .then((res) => {
          setLoading(false);
          LoadingBar.current.complete();
          setTitle(res.data.title);
          setAuthor(res.data.author);
          setPublishYear(res.data.publishYear);
        })
        .catch((error) => {
          setLoading(false);
          LoadingBar.current.complete();
          console.log(error);
        });
    })();
  }, []);

  document.title = "Edit Book";

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    LoadingBar.current.continuousStart();
    await axios
      .put(`${backend}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        LoadingBar.current.complete();
        navigate("/");
        enqueueSnackbar("Book edited successfully", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        LoadingBar.current.complete();
        // alert("An error occurred. Please check the console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>

        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">
            Author
          </label>
          <input
            name="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>

        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
            Publish Year
          </label>
          <input
            name="publishYear"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
