import UserModel from "../../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sleep } from "../../../utils/sleep.js";

export default async function SlowHttpController(request, response) {

    await sleep(5);

    return response.status(200).json({
        response: "ok"
    });

}
