import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/types/blogs";
import Image from "next/image";
import { FC } from "react";
interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card>
      <CardHeader>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
          <Image
            src={blog.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Badge
          variant="outline"
          className="mt-2 mb-2 rounded-sm bg-green-100 text-green-600 capitalize"
        >
          {blog.category}
        </Badge>

        <p className="mt-1 text-sm font-light">{blog.userId}</p>

        <p className="font line-clamp-1 text-lg font-semibold">{blog.title}</p>
        <p className="line-clamp-4">{blog.description}</p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
