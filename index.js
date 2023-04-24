const fs = require('fs');

// Function to convert a TXT file to a CSV file
const convertTxtToCsv = (txtFile, csvFile) => {
    // Read the TXT file
    const data = fs.readFileSync(txtFile, 'utf-8');

    // Split the data into lines and filter lines that meet the criteria
    const filteredLines = data.split('\n')
        .filter(line => {
            const values = line.trim().split(/\s+/);
            return /^\d/.test(line) && values.length <= 9;
        });

    // Convert filtered lines to CSV format
    const csvData = filteredLines.map(line => line.split(/\s+/).join(',')).join('\n');

    // Write CSV data to file
    fs.writeFileSync(csvFile, csvData);
    console.log(`Converted ${txtFile} to ${csvFile}`);
};

// Function to calculate the sum of values in a specific column based on a criteria from another column
const sumColumnByCriteria = (csvFile, column, criteriaColumn, criteria) => {
    // Read the CSV file
    const data = fs.readFileSync(csvFile, 'utf-8');

    // Split the data into lines and extract the values from the specified columns
    const rows = data.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.split(','));

    // Calculate the sum of values based on the criteria
    const sum = rows.filter(row => row[criteriaColumn] === criteria)
        .reduce((acc, row) => acc + parseFloat(row[column]), 0);

    return sum;
};

// TESTING
// ===============================
const txtFile = '0912.txt';     // Input .txt file
const csvFile = 'output.csv';   // Name of output .csv file
convertTxtToCsv(txtFile, csvFile);

// Using the sumColumnCriteria()
const column = 6;
const criteriaColumn = 1;
const criteria = '303';
const sum = sumColumnByCriteria(csvFile, column, criteriaColumn, criteria);
console.log(`Sum of values in column ${column} where column ${criteriaColumn} equals "${criteria}": ${sum}`);
