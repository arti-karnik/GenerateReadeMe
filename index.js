// Declaring the dependencies and variables
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const file = util.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the project title?",
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief description of your project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process if any: ",
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for?"
        },
        {
            type: "list",
            name: "license",
            message: "Chose the license for this project: ",
            choices: [
                "Apache",
                "Mozilla",
                "Open"
            ]
        },
        {
            type: "input",
            name: "testing",
            message: "Is this application unit-tested "
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username: "
        },
        {
            type: "input",
            name: "githuburl",
            message: "Please enter your Github url: "
        },
        {
            type: "input",
            name: "codeurl",
            message: "Please enter your code base url: "
        }
    ]);
}  
async function init() {
    try {
        const answers = await promptUser();
        const generateContent = generateReadme(answers);

        await file('./README.md', generateContent);
        console.log('Successfully wrote to README.md');
    }   catch(err) {
        console.log(err);
    }
  }
  
  init();  

  function generateReadme(response) {  
    return `
    ${response.title}
Table of Contents:
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Description
${response.description}
## Installation
${response.installation}
## Usage
${response.usage}
## License
${response.license}
## Tests
${response.testing}
## Questions
Github Profile: ${response.githuburl}
Code base Profile: ${response.codeurl}
`
}
