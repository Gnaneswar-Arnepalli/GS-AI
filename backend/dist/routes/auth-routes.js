import express from 'express';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();
router.get('/auth-status', verifyToken, (req, res) => {
    return res.status(200).json({
        authenticated: true,
        user: req.user,
    });
});
export default router;
//# sourceMappingURL=auth-routes.js.map