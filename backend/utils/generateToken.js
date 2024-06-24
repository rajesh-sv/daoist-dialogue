import jwt from "jsonwebtoken";

const THIRTY_DAYS_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    maxAge: THIRTY_DAYS_IN_MILLISECONDS,
    httpOnly: true, // prevents XSS (Cross-Site Scripting) attacks
    sameSite: true, // prevents CSRF (Cross-Site Request Forgery) attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
