import jwt from "jsonwebtoken";
export const checkAuthStatus = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        if (typeof decoded === "object" && decoded !== null) {
            res.status(200).json({ name: decoded.name, email: decoded.email }); // Return user info
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=auth-user.js.map