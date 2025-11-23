module.exports = {
  tripTitle: "required|string",
  locationName: "required|string",
  activityName: "required|string",
  date: "required|date",
  time: "required|string",
  cost: "numeric|min:0"
};
