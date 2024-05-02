import {User} from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  console.log('process.env.MONGO_URL', process.env.MONGO_URL)
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  const createdProfile = await UserInfo.create({email: createdUser.email});
  return Response.json(createdUser);
}