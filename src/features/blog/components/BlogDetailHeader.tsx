import { Badge } from "@/components/ui/badge";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import ModalDeleteBlog from "./ModalDeleteBlog";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";

interface BlogDetailHeaderProps {
  blog: Blog;
}
const BlogDetailHeader: FC<BlogDetailHeaderProps> = ({ blog }) => {
  // const { user } = useAuthStore();
  const session = useSession();
  const { mutateAsync: deleteBlog, isPending } = useDeleteBlog();

  const handleDeleteBlog = async () => {
    await deleteBlog(blog.id);
  };

  return (
    <section className="mt-10 space-y-2">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {blog.category}
      </Badge>

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <div className="flex items-center justify-between">
        <p className="font-extralight">
          {format(new Date(blog.createdAt), "dd MM yyy")} -{" "}
          <span className="capitalize">{blog.user?.name}</span>
        </p>

        {Number(session.data?.user?.id) === blog.userId && (
          <div className="space-x-1">
            <Link href={`/blogs/${blog.slug}/edit`}>
              <Button variant="outline" size="icon">
                <Edit2 />
              </Button>
            </Link>
            <ModalDeleteBlog isPending={isPending} onClick={handleDeleteBlog} />
          </div>
        )}
      </div>

      <div className="relative h-[400px]">
        <Image
          src={blog.thumbnail}
          alt="blog thumbnail"
          className="rounded-sm object-cover"
          fill
        />
      </div>
    </section>
  );
};

export default BlogDetailHeader;
