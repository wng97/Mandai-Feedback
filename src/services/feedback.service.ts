import pool from "../db";
import { CreateFeedbackPayload, UpdateFeedbackPayload } from "../interfaces";

export const createFeedback = async (
  userId: number,
  createFeedbackPayload: CreateFeedbackPayload
) => {
  const { feedback, rating } = createFeedbackPayload;
  try {
    const result = await pool.query(
      `INSERT INTO feedback (user_id, feedback, rating) VALUES (${userId}, '${feedback}', ${rating}) RETURNING *`
    );
    return result.rows[0];
  } catch (err) {
    // console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const getFeedbackListData = async () => {
  try {
    // const result = await pool.query(`SELECT * FROM feedback`);
    const result = await pool.query(
      `SELECT f.*, u.name, u.email FROM feedback f JOIN users u ON f.user_id = u.id`
    );

    return result.rows;
  } catch (err) {
    // console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const getFeedbackDataById = async (id: number) => {
  try {
    const result = await pool.query(
      `SELECT f.*, u.name, u.email FROM feedback f JOIN users u ON f.user_id = u.id WHERE id = ${id}`
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const updateFeedbackData = async (
  id: number,
  updateFeedbackPayload: UpdateFeedbackPayload
) => {
  const { feedback, rating } = updateFeedbackPayload;
  let paramsQueryArr = [];
  if (feedback) {
    paramsQueryArr.push(`feedback = '${feedback}'`);
  }
  if (rating) {
    paramsQueryArr.push(`rating = ${rating}`);
  }
  const paramsQuery = paramsQueryArr.join(", ");
  try {
    const result = await pool.query(
      `UPDATE feedback SET ${paramsQuery} WHERE id = ${id} RETURNING *`
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};

export const deleteFeedbackData = async (id: number) => {
  try {
    await pool.query(`DELETE FROM feedback WHERE id = ${id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Somethings went wrong");
  }
};
