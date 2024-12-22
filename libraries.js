const { execSync } = require("child_process");
const path = require("path");

const Library = async (answers, projectName) => {
  const projectPath = path.resolve(projectName);
  console.log(`Creating a new Next.js project named ${projectName}...`);

  // Create the Next.js project with the correct turbopack flag and without `src` directory
  // execSync(
  //   `npx create-next-app@latest ${projectName} --typescript --eslint --tailwind --app --import-alias "@/*" --turbopack -y`,
  //   {
  //     stdio: "inherit",
  //   }
  // );

  // Now set the correct cwd for project-specific commands
  // if (answers.database === "prisma") {
  //   console.log("Initializing Prisma...");
  //   execSync("npx prisma init", { cwd: projectPath, stdio: "inherit" });
  //   // execSync("npx prisma generate", { cwd: projectPath, stdio: "inherit" });
  // }

  // Install email provider package (Resend)
  // if (answers.emailProvider === "resend") {
  //   console.log("Installing Resend...");
  //   execSync("npm install resend", { cwd: projectPath, stdio: "inherit" });
  // }

  // Initialize Shadcn UI library
  // if (answers.uiLibrary === "shadcn") {
  //   console.log("Initializing shadcn...");
  //   execSync("npx shadcn@latest init -d", { cwd: projectPath, stdio: "inherit" });
  // }
};

module.exports = { Library };
