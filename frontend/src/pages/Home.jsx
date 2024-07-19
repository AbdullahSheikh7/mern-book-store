import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const LoadingBar = useContext(AppContext);

  document.title = "Home - MERN Book Store by Abdullah";

  useEffect(() => {
    (async () => {
      setLoading(true);
      LoadingBar.current.continuousStart();
      await axios
        .get(
          `${window.location.protocol}//${window.location.hostname}:5000/books`
        )
        .then((res) => {
          setBooks(res.data.data);
          setLoading(false);
          LoadingBar.current.complete();
        })
        .catch((error) => {
          console.log(error);
          LoadingBar.current.complete();
          setLoading(false);
        });
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => {setShowType("table")}}>Table</button>
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => {setShowType("card")}}>Card</button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox
            className="text-sky-800 text-4xl"
            title="Create book"
          />
        </Link>
      </div>
      { loading ? <Spinner /> : showType === "table" ? <BooksTable books={books} /> : <BooksCard books={books} /> }
    </div>
  );
};

export default Home;
