import BlogEditPage from "@/features/blog/BlogEditPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const BlogEdit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const session = await auth();

  if (!session) return redirect("/login");
  return <BlogEditPage slug={slug} />;
};

export default BlogEdit;
