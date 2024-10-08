import { asyncHandler } from "../../helpers/response/asynchandler.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../helpers/response/apiresponse.js";
import { getStatusMessage } from "../../helpers/response/statuscode.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("role email rollNumber -_id");

    if (users.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {},
            getStatusMessage(200) + " : Not any registered users found"
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { users },
          getStatusMessage(200) + " All registered users fetched successfully!"
        )
      );
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json(new ApiResponse(500, { err }, getStatusMessage(500)));
  }
});

export const getUser = asyncHandler(async (req, res) => {
  try {
    const { rollNumber } = req.params;
    if (!rollNumber) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            getStatusMessage(400) + ": Roll number is not provided in params"
          )
        );
    }

    let user = await User.findOne({ rollNumber: rollNumber }).select(
      "email rollNumber _id"
    );
    if (!user) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, {}, getStatusMessage(404) + ": User not found")
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user },
          getStatusMessage(200) + ": User fetched successfully!"
        )
      );
  } catch (error) {}
});
