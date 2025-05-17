import React from "react";
import Jumbotron from "./components/Jumbotron";
import BlogListById from "./components/BlogListById";

const BlogDetailPageByIdPage = () => {
  return (
    <main className="container mx-auto px-4">
      <Jumbotron />
      <BlogListById />
    </main>
  );
};

export default BlogDetailPageByIdPage;
