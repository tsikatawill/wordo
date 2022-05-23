import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SearchResults = () => {
  const searchTerm = useParams().query;
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_APIHOST,
        "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
      },
    };
    // fetch(`${process.env.REACT_APP_APIURL}/define?term=${searchTerm}`, options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response.list))
    //   .catch((err) => console.error(err));
    const getData = async () => {
      setError("");
      setDefinitions([]);
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_APIURL}/define?term=${searchTerm}`,
          options
        );
        const data = await response.json();

        if (response.ok) {
          console.log(data.list);
          if (data.list.length > 0) {
            setDefinitions(
              data.list.sort((a, b) => {
                if (a.thumbs_up > b.thumbs_up) {
                  return -1;
                } else {
                  return 1;
                }
              })
            );
          } else {
            throw new Error(`Your search returned no results`);
          }
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      }

      setLoading(false);
    };

    getData();
  }, [searchTerm]);
  return (
    <section className="search-results mt-10">
      <div className="container flex flex-col">
        <header className="">
          <h2>
            Search results for{" "}
            <span className="font-semibold">"{searchTerm}"</span>
          </h2>
        </header>
        {loading && (
          <div className="loadingSpinner text-center my-10">
            <ClipLoader size={50} color="white" />
          </div>
        )}

        <section className="results flex flex-col gap-5 py-10">
          {error ? (
            <p className="p-2 bg-slate-700 border-2 flex items-center gap-3 border-slate-500 rounded-md">
              <span className="rounded-full">
                <FaExclamationCircle />
              </span>{" "}
              {error}
            </p>
          ) : (
            definitions &&
            definitions.map((def, index) => (
              <div
                key={index}
                className="definition-card overflow-hidden flex flex-col gap-2 p-2 bg-slate-700 border-2 border-slate-500 rounded-md"
              >
                <div>
                  <h4 className=" italic text-slate-400">Definition:</h4>
                  <p> {def.definition && def.definition}</p>
                </div>
                <div>
                  <h4 className=" italic text-slate-400">Example:</h4>
                  <p> {def.example && def.example}</p>
                  <p> {def.thumbs_up && def.thumbs_up}</p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </section>
  );
};

export default SearchResults;
