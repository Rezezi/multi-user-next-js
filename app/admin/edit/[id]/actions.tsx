"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBook(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;

  if (!title || !author) {
    throw new Error("Title dan Author harus diisi.");
  }

  await prisma.book.update({
    where: { id },
    data: { title, author },
  });

  // Revalidate halaman setelah update
  revalidatePath(`/admin`);
}
