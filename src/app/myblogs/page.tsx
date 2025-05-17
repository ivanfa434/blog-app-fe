import BlogDetailPageByIdPage from "@/features/myblog/BlogDetailPageById";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const MyBlogs = async () => {
  const session = await auth();

  if (!session) return redirect("/login");
  return <BlogDetailPageByIdPage />;
};

export default MyBlogs;
