const jwt = require("jsonwebtoken");

exports.authentication = () => {

    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decodedToken.user_id;
            if (!user_id) {
                return res.status(401).json({
                    error: "Not authenticated",
                    status: "error",
                });
            } else {
                next();
            }
        } catch {
            res.status(401).json({
                error: "Not authenticated",
                status: "error",
            });
        }
    };
};