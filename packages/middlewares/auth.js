import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    let decodedData;

    if (token) {
      // decode the jwt using our own secret
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    console.error(`Error in auth middleware: ${error}`);
  }
};

export default auth;
