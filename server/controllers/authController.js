const {
  readDataFromJsonFile,
  writeDataToJsonFile,
} = require("../utils/jsonReadWrite");
const userSchema = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { email, reEmail, password } = req.body;

    // Check if emails are same
    if (email !== reEmail) {
      return res.status(400).json({
        errorCode: "EMAIL_MISMATCH",
        error: "You entered different emails",
      });
    } else {
      try {
        await userSchema.validate({ email, password });

        // Check if the domain is forbidden
        const forbiddenDomains = readDataFromJsonFile(
          "./mocupDB/forbiddenDomains.json"
        );
        const domain = email.split("@")[1];
        const isDomainForbidden = forbiddenDomains.some(
          (forbiddenDomain) => forbiddenDomain.domain === domain
        );

        if (isDomainForbidden) {
          return res.status(403).json({
            errorCode: "FORBIDDEN_DOMAIN",
            error: "Email domain is not allowed",
          });
        }

        // Check if user exists
        let users = readDataFromJsonFile("./mocupDB/users.json");
        const userExists = users.some((user) => user.email === email);

        if (userExists) {
          return res
            .status(409)
            .json({ errorCode: "USER_EXISTS", error: "User already exists" });
        }

        users.push({ email, password });

        writeDataToJsonFile(users, "./mocupDB/users.json");

        return res
          .status(201)
          .json({ message: `User ${email} created`, email });
      } catch (error) {
        return res
          .status(400)
          .json({ errorCode: "VALIDATION_ERROR", error: error.message });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: "INTERNAL_SERVER_ERROR",
      error: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readDataFromJsonFile("./mocupDB/users.json");

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return res
        .status(200)
        .json({ message: "Login successful", user: { email } });
    } else {
      return res.status(401).json({
        errorCode: "INVALID_CREDENTIALS",
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: "INTERNAL_SERVER_ERROR",
      error: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
