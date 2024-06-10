// Function to validate difficulty level
const isValidDifficulty = (difficulty) => {
  return ["easy", "medium", "hard"].includes(difficulty);
};

// Export the validate function for use in other modules
module.exports = {
  isValidDifficulty,
};
