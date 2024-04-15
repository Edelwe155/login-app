const fs = require("fs");

// Function to read data from the JSON file
const readDataFromJsonFile = (filePath) => {
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
};

// Function to write data to the JSON file
const writeDataToJsonFile = (data, filePath) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log("Data written to JSON file successfully.");
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
};

module.exports = { readDataFromJsonFile, writeDataToJsonFile };
