"use client";

import { useState, useEffect } from "react";
import { Profile } from "@components";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const AuthorProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`/api/users/${params.id}/posts`);
        const data = await resp.json();
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <div className="w-full flex-center">
          <Image
            src="/assets/icons/loader.svg"
            width={50}
            height={50}
            alt="loader"
            className="object-contain"
          />
          <div>Loading...</div>
        </div>
      ) : (
        <Profile name={userName} desc="Author Page" data={posts} />
      )}
    </>
  );
};

export default AuthorProfile;
