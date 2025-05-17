"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetBlogsById from "@/hooks/api/blog/useGetBlogsById";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import BlogCardById from "./BlogCardById";

const BlogListById = () => {
  const [page, setPage] = useQueryState("int", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: blogs, isPending } = useGetBlogsById({
    search: debounceSearch,
    page,
    take: 3,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto mt-10 max-w-xl"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}

      {!isPending && !blogs?.data.length && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No data</h2>
        </div>
      )}

      {!!blogs && !!blogs.data.length && (
        // diberi ! supaya berubah ke boolean, sama dengan Boolean(blogs),
        // karena in default blogs adalah property
        <div className="space-y-8">
          <section className="mt-10 grid grid-cols-3 gap-4">
            {blogs.data.map((blog) => {
              return <BlogCardById key={blog.id} blog={blog} />;
            })}
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

export default BlogListById;
