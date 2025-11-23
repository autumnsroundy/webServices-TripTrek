module.exports = {
  userName: "required|string",
  tripTitle: "required|string",
  startDate: "required|date",
  endDate: "required|date",
  description: "string",
  totalCost: "numeric|min:0",
  notes: "array"
};
