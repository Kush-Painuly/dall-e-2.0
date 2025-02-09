import React, { useState, useEffect } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((post) => {
      <Card key={data._id} {...post} />;
    });
  }

  return (
    <h2 className="font-bold text-xl uppercase text-[#6696ff] mt-5">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchedTimeout, setSearchedTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const response = await response.json();
          setAllPosts(response.data.reverse());
        }
      } catch (error) {
        alert(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchedTimeout);
    setsearchText(e.target.value);

    setSearchedTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase() === searchText.toLowerCase() ||
            item.prompt.toLowerCase() === searchText.toLowerCase()
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through the collection of imaginative and visually stunning
          images generated by DALL-E 2.0
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          value={searchText}
          placeholder="Search Posts"
          name="search"
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h1 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for
                <span className="text-[#222328]">{searchText}</span>
              </h1>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
