import useAxios from "@/hooks/useAxios";
import { Blog } from "@/types/blog";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetBlogsQuery extends PaginationQueries {
  search?: string;
}
const useGetBlogsById = (queries?: GetBlogsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["blogs","user", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Blog>>(
        "/blogs/user",
        {
          params: queries,
        },
      );

      data.data[0];
      return data;
    },
  });
};

export default useGetBlogsById;
