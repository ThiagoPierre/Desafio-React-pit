const {Router} = require("express");
const BookingController = require("../controllers/booking.controler");

const router = Router();

router.get("/booking", BookingController.index);
router.post("/booking", BookingController.store);
router.delete("/booking/:id", BookingController.remove);

module.exports = router;