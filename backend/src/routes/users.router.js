const { Router } = require("express");
const UsersController = require("../controllers/users.controller");

const router = Router();

router.get("/booking", UsersController.index);
router.post("/booking", UsersController.store);
router.delete("/booking/:id", UsersController.remove); 
router.put("/booking/:id", UsersController.update); 

module.exports = router;