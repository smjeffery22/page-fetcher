// Take two command line arguments
//  1. a URL
//  2. a local file path
// Download the resource at URL to the local path
// Upon completion print "Downloaded and saved 1235 bytes to ./index.html"

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const input = process.argv.slice(2);
const filePath = input[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const requestedData = request(input[0], (error, response, body) => {
  if(error) {
    console.log("Provided URL is invalid. Please provide a valid URL.")
    process.exit();
  }

  if(fs.existsSync(`${filePath}`)) {
    rl.question(`${filePath} already exists. Do you want to overwrite the file? (y/n)`, (answer) => {
      if (answer === "y") {
        fs.writeFile(filePath, body, err => {   
          if (err) {
            console.log("Provided file path is invalid. Please provide a valid file path.");
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
          }
        });
        rl.close();
      } else if (answer === "n") {
        console.log("no");
        rl.close();
      }
    });
  } else {
    fs.writeFile(filePath, body, err => {   
      if (err) {
        console.log("Provided file path is invalid. Please provide a valid file path.");
        process.exit();
              } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        process.exit();
      }
    });
  }
});






// if(fs.existsSync(`${input[1]}`)) {
//   console.log("Exists");
// } else {
//   console.log("False");
// }


// const content = "Testing writeFile";

// fs.writeFile(input[1], content, err => {
//   if (err) {
//     console.log(err);
//     process.exit();
//   } else {
//     console.log("writeFile success!");
//     process.exit();
//   }
// })