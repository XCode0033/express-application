// Mock Data (Moved here from routes because the controller owns the data logic now)
const schedules = [];

// Logic for Getting all schedules
const getSchedules = (req, res) => {
  res.json({ count: schedules.length, data: schedules });
};

// Logic for Creating a schedule
const createSchedule = (req, res, next) => {
  const { name, type } = req.body;

  // Validation Logic
  if (!name) {
    const error = new Error("Schedule name is required");
    error.status = 400;
    return next(error);
  }

  const newSchedule = {
    id: schedules.length + 1,
    name,
    type: type || "General",
    createdAt: new Date(),
  };

  schedules.push(newSchedule);

  res.status(201).json({
    message: "Schedule created",
    schedule: newSchedule,
  });
};

const getScheduleById = (req, res, next) => {
  const id = Number(req.params.id);
  const schedule = schedules.find((s) => s.id == id);
  if (!schedule) {
    const error = new Error(`Schedule with ID ${id} not found`);
    error.status = 404; // Not found
    return next(error);
  }
  res.json(schedule);
};

//Logic: update a schedule (PUT)
const updateSchedule = (req, res, next) => {
  const id = Number(req.params.id);
  const schedule = schedules.find((s) => s.id === id);

  if (!schedule) {
    const error = new Error(`Schedule with ID ${id} not found`);
    error.status = 404;
    return next(error);
  }

  //Update fields if provided

  const { name, type } = req.body;
  if (name) schedule.name = name;
  if (type) schedule.type = type;

  res.json({ message: "Schedule updated", schedule });
};

//Logic: Delete a schedule (DELETE)
const deleteSchedule = (req, res, next) => {
  const id = Number(req.params.id);
  const index = schedules.findIndex((s) => s.id === id);

  if (index === -1) {
    const error = new Error(`Schedule with ID ${id} not found`);
    error.status = 404;
    return next(error);
  }

  //Remove from array
  schedules.splice(index, 1);

  res.json({ message: `Schedule with ID ${id} deleted` });
};

// Export the functions so the router can use them
module.exports = {
  getSchedules,
  createSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
