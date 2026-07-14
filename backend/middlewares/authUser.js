// import jwt from "jsonwebtoken";

// // User authentication middleware
// const authUser = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized. Login Again.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {  id: decoded.id, };

//     next();
//   } catch (error) {
//     console.error(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default authUser;

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log("TOKEN:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODE:", token_decode);

    req.body.userId = token_decode.id;

    console.log("USER ID:", req.body.userId);

    next();
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;