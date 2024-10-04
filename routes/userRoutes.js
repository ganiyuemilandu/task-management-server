const { getCurrentUser, loginUser, registerUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/current", protect, getCurrentUser);

module.exports = router;