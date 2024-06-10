// Import helper functions from the "helper" module
const helper = require("./helper");

// Main validation function for the request body
function validate(req) {
  // Extract properties from the request body
  const { question, choices, correctAnswer, difficulty } = req.body;

  // Validate the question field
  const questionValidate = validateQuestion(question);
  if (questionValidate["error"]) return questionValidate;

  // Validate the choices field
  const choiceValidate = validateChoices(choices);
  if (choiceValidate["error"]) return choiceValidate;

  // Validate the correctAnswer field against the choices
  const answerValidate = validateCorrectAnswer(correctAnswer, choices);
  if (answerValidate["error"]) return answerValidate;

  // Validate the difficulty field
  const difficultyValidate = validateDifficulty(difficulty);
  if (difficultyValidate["error"]) return difficultyValidate;

  // Return the validated and normalized fields if no errors
  return {
    error: false,
    question: question.toLowerCase(),  // Convert question to lower case
    choices,
    correctAnswer: correctAnswer.toLowerCase(),  // Convert correctAnswer to lower case
    difficulty: difficulty.toLowerCase(),  // Convert difficulty to lower case
  };
}

// Function to validate the "question" field
function validateQuestion(question) {
  if (!question || typeof question !== "string" || question.trim() === "") {
    // Return error if question is missing, not a string, or empty
    return errorResponse(
      true,
      'Invalid or missing "question". It must be a non-empty string.'
    );
  }
  return errorResponse(false, "");  // No error
}

// Function to validate the "choices" field
function validateChoices(choices) {
  if (!Array.isArray(choices)) {
    // Return error if choices is not an array
    return errorResponse(true, '"choices" must be an array.');
  }
  if (choices.length < 2) {
    // Return error if there are fewer than two choices
    return errorResponse(true, '"choices" must contain at least two items.');
  }
  // Check each choice to ensure it is a non-empty string
  for (let choice of choices) {
    if (typeof choice !== "string" || choice.trim() === "") {
      return errorResponse(true, "Each choice must be a non-empty string");
    }
  }
  return errorResponse(false, "");  // No error
}

// Function to validate the "correctAnswer" field against the choices
function validateCorrectAnswer(correctAnswer, lowerCaseChoices) {
  if (
    !correctAnswer ||
    typeof correctAnswer !== "string" ||
    correctAnswer.trim() === ""
  ) {
    // Return error if correctAnswer is missing, not a string, or empty
    return errorResponse(
      true,
      'Invalid or missing "correctAnswer". It must be a non-empty string.'
    );
  }
  // Ensure correctAnswer is one of the choices
  if (!lowerCaseChoices.includes(correctAnswer.toLowerCase().trim())) {
    return errorResponse(
      true,
      'The "correctAnswer" must be one of the "choices".'
    );
  }
  return errorResponse(false, "");  // No error
}

// Function to validate the "difficulty" field
function validateDifficulty(difficulty) {
  if (
    !difficulty ||
    typeof difficulty !== "string" ||
    !helper.isValidDifficulty(difficulty.toLowerCase())
  ) {
    // Return error if difficulty is missing, not a string, or invalid
    return errorResponse(
      true,
      'Invalid or missing "difficulty". It must be one of "easy", "medium", or "hard".'
    );
  }
  return errorResponse(false, "");  // No error
}

// Helper function to format error responses
function errorResponse(error, message) {
  return {
    error: error,  // Boolean indicating if there was an error
    message: message,  // Error message description
  };
}

// Export the validate function for use in other modules
module.exports = {
    validate
};
