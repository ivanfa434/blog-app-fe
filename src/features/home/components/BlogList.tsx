"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/blogs";
import { FC, useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const { data: blogs, isPending } = useGetBlogs({
    search: debounceSearch,
    page,
    take: 3,
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto mt-10 max-w-xl"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      {isPending && (
        <div className="h=[30vh] flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}

      {!isPending && !blogs?.data && (
        <div className="flex h-[30vh] items-center justify-center">
          <h3>No Data</h3>
        </div>
      )}
      {!!blogs && !!blogs.data.length && (
        <div className="space-y-8">
          <section className="mt-10 grid grid-cols-3 gap-12">
            {blogs.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
          <PaginationSection
            page={blogs.meta.page}
            take={blogs.meta.take}
            total={blogs.meta.total}
            onChangePage={onChangePage}
          />
        </div>
      )}
    </>
  );
};

export default BlogList;
