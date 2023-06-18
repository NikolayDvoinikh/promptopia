"use client";

import { PromptCardList } from "@components";

import { useState, useEffect } from "react";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();
      setAllPrompts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = ({ target }) => {};
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
      <PromptCardList data={allPrompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
