import axios from "axios";
import Link from "next/link";
import React from "react";

const WhatsTrending = async () => {
  const { data: trendingPosts } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  );

  return (
    <div className="mt-16 w-[20vw]">
      <h1 className="ml-5 font-medium text-lg">{`What's Trending`}</h1>
      <div className="mt-5 grid grid-cols-1 gap-5">
        {trendingPosts?.articles?.slice(0, 3).map((post: any) => {
          return (
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 dark:bg-[#191d20] rounded-3xl flex items-start gap-5"
              key={post.author}
            >
              {post.urlToImage ? (
                <img
                  src={post.urlToImage}
                  alt=""
                  className="h-20 w-20 rounded-xl object-cover"
                />
              ) : (
                <div className="h-20 w-20 p-10 rounded-xl animate-pulse bg-gray-400"></div>
              )}
              <div>
                <h3 className="text-white/60 text-xs">{post.author}</h3>
                <h3 className=" text-sm">{post.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsTrending;
