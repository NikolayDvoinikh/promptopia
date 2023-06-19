"use client";

import { PromptCardList } from "@components";

import { useState, useEffect } from "react";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();
      setAllPrompts(data);
    };

    fetchPosts();
  }, []);

  const searchNormalized = (text) => text.toLowerCase();

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filteredPrompts = allPrompts.filter((post) => post.tag === tag);
    setSearchResult(filteredPrompts);
  };

  const handleSearchChange = ({ target }) => {
    clearTimeout(timerId);

    setSearchText(target.value);
    setTimerId(
      setTimeout(() => {
        const filteredSearch = allPrompts.filter(({ prompt, tag, creator }) => {
          const value = searchNormalized(target.value).trim();
          return (
            searchNormalized(prompt).includes(value) ||
            searchNormalized(tag).includes(value) ||
            searchNormalized(creator.username).includes(value)
          );
        });
        setSearchResult(filteredSearch);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPrompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
