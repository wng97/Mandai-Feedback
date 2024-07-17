import pool from "../db";
import { Users } from "../entities";
import {
  CreateUserData,
  LoginUserData,
  UpdateUserPayload,
} from "../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (data: CreateUserData) => {
  const { name, password, email } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      `INSERT INTO users (name, password, email) VALUES ('${name}', '${hashedPassword}', '${email}') RETURNING *`
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const loginUser = async (data: LoginUserData) => {
  const { email, password } = data;
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    const user: Users = result.rows[0];

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!);
    return { token };
  } catch (err: unknown) {
    // console.log(err);
    throw new Error((err as Error).message);
  }
};

export const retrieveUserData = async (id: number) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const updateUserData = async (
  id: number,
  userPayload: UpdateUserPayload
) => {
  const { name, email, password } = userPayload;

  let paramsQueryArr = [];
  if (name) {
    paramsQueryArr.push(`name = '${name}'`);
  }
  if (email) {
    paramsQueryArr.push(`email = '${email}'`);
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    paramsQueryArr.push(`password = '${hashedPassword}'`);
  }
  const paramsQuery = paramsQueryArr.join(", ");
  try {
    const result = await pool.query(
      `UPDATE users SET ${paramsQuery} WHERE id = ${id} RETURNING *`
    );
    return result.rows[0];
  } catch (err) {
    // console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const deleteUserData = async (id: number) => {
  try {
    await pool.query(`DELETE FROM users WHERE id = ${id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};
