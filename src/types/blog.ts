import { User } from "./user";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user?: User; // optional karena belum tentu pasti ada properti user (saat tidak join table)
}
