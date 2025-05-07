import jwt from "jsonwebtoken";
// Middleware to check authentication status
export const checkAuthStatus = (req, res) => {
    const token = req.signedCookies['Cookie_name']; // Retrieve token from signed cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        if (typeof decoded === "object" && decoded !== null) {
            return res.status(200).json({ name: decoded.name, email: decoded.email }); // Return user info
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
// Middleware to verify user and attach user data to the request
export const verifyUser = async (req, res, next) => {
    const token = req.signedCookies['Cookie_name']; // Retrieve token from signed cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        if (typeof decoded === "object" && decoded !== null) {
            res.locals.jwtData = decoded; // Attach decoded token data to res.locals
            return next(); // Proceed to the next middleware or route handler
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=auth-status.js.map