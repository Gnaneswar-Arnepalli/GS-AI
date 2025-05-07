import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ authenticated: false, message: 'No token found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ authenticated: false, message: 'Invalid token' });
    }
};
export default verifyToken;
//# sourceMappingURL=verify-Token.js.map