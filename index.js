#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const { Library } = require("./libraries");
const {
  createProjectStructure,
  copyTemplateFiles,
  createEmailTemplates,
} = require("./fileOperations");
const { questions } = require("./prompts");

program.version("1.0.0");

program
  .command("install")
  .description("Setup project structure and copy template files")
  .action(async () => {
    const question = inquirer.createPromptModule();
    question(questions).then(async (answers) => {
      const projectName = "my-app";

      // Installing Package
      await Library(answers, projectName);

      // Create the project structure
      await createProjectStructure(answers.routes, projectName);

      // Copy template files based on user selections
      await copyTemplateFiles(answers, projectName);

      // Create email templates
      await createEmailTemplates(projectName);
    });
  });

program.parse(process.argv);
