"use client";

import { PromptCard } from "@components";

import { useState, useEffect } from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((card) => {
        <PromptCard
          key={card._id}
          post={card}
          handleTagClick={handleTagClick}
        />;
      })}
    </div>
  );
};

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
          className="search_input peer"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={allPrompts} handleTagClick={() => {}} />
      <PromptCard post={allPrompts[0]} />
    </section>
  );
};

export default Feed;
