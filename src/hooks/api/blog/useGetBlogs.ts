import { axiosInstance } from "@/lib/axios";
import { Blog } from "@/types/blogs";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetBlogsQuery extends PaginationQueries {
  search?: string;
  // bisa tambahin fitur search disini
}
const useGetBlogs = (queries?: GetBlogsQuery) => {
  return useQuery({
    queryKey: ["blogs", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Blog>>(
        "/blogs",
        { params: queries },
      );

      data.data[0];
      return data;
    },
  });
};

export default useGetBlogs;
