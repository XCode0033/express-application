const express = require("express");
const router = express.Router();
//Import the controller
const schedulesController = require("../controllers/schedulesController");

//GET /api/schedules
//
// Notice how clear it is. Just points to the function
router.get("/", schedulesController.getSchedules);

// POST /api/schedules
router.post("/", schedulesController.createSchedule);

//NEW: Route with a parameter (:id)
//The colon tells express "this part is a variable"
router.get("/:id", schedulesController.getScheduleById);

router.put("/:id", schedulesController.updateSchedule);
router.delete("/:id", schedulesController.deleteSchedule);
module.exports = router;
