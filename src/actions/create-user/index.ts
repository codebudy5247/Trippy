"use server";

import { db } from "@/lib/db";
import { CreateUserInput } from "./schema";
import { handleError } from "@/lib/utils";
import bcrypt from "bcrypt";

export async function createUser(data: CreateUserInput) {
  let newUser;
  try {
    const { name, email, password } = data;
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return {
        error: "User with this email already exists.",
      };
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    handleError(error);
  }
  return { data: newUser };
}
