const fs = require('fs-extra');
const path = require('path');
const { emailTemplate, sendMailTemplate } = require('./templates');

// Function to create project structure based on provided routes
const createProjectStructure = async (routes, projectName) => {
  const folderPaths = routes.split(' '); // Split the routes into individual parts
  console.log("Folder Path ",folderPaths)
  const appDir = path.resolve(process.cwd(), projectName, 'app'); // Resolve the path to the app folder

  // Ensure the `app` folder exists
  if (!fs.existsSync(appDir)) {
    fs.mkdirsSync(appDir);
    console.log(`Created folder: ${appDir}`);
  }

  folderPaths.forEach(folderPath => {
    const fullPath = path.resolve("/", folderPath);
    console.log("fullpath : ",fullPath);

    // Split the folderPath into parts and create them step-by-step inside the `app` directory
    src = path.join(__dirname, 'Routes')
    fullPath.split(path.sep).reduce((prevPath, folder) => {
      const currentPath = path.resolve(prevPath, folder);

      // If folder doesn't exist, create it
      if (!fs.existsSync(currentPath)) {
        fs.mkdirsSync(currentPath);
        fs.copySync(src,currentPath)
        // console.log(`Created folder: ${currentPath}`);
      }

      return currentPath; // Return the current path for further processing
    }, appDir);
  });
};

// Function to copy template files
const copyTemplateFiles = async (answers, projectName) => {
  const templatePaths = {
    authjs: path.join(__dirname, 'Auth', 'authjs'),
    firebase: path.join(__dirname, 'Auth', 'firebase'),
    clerk: path.join(__dirname, 'Auth', 'clerk'),
    resend: path.join(__dirname, 'Email', 'resend'),
    sendgrid: path.join(__dirname, 'Email', 'sendgrid'),
    prisma: path.join(__dirname, 'Database', 'prisma'),
    drizzle: path.join(__dirname, 'Database', 'drizzle'),
    shadcn: path.join(__dirname, 'UI', 'shadcn'),
    chakra: path.join(__dirname, 'UI', 'chakra'),
    razorpay: path.join(__dirname, 'Payments', 'razorpay'),
    stripe: path.join(__dirname, 'Payments', 'stripe'),
    cashfree: path.join(__dirname, 'Payments', 'cashfree'),
  };

  const choices = [
    templatePaths[answers.database],
    templatePaths[answers.authProvider],
    templatePaths[answers.emailProvider],
    templatePaths[answers.uiLibrary],
    templatePaths[answers.payment],
  ].filter(Boolean); // Filter out any undefined paths

  const targetPath = path.resolve(process.cwd(), projectName);

  choices.forEach(templatePath => {
    if (fs.existsSync(templatePath)) {
      copyDirectoryContents(templatePath, targetPath);
    } else {
      // console.error(`Template path ${templatePath} does not exist.`);
    }
  });
};

// Function to recursively copy directory contents
const copyDirectoryContents = (srcDir, destDir) => {
  fs.readdirSync(srcDir).forEach(item => {
    const srcItem = path.join(srcDir, item);
    const destItem = path.join(destDir, item);

    if (fs.lstatSync(srcItem).isDirectory()) {
      // Recursively create directories and copy their contents
      if (!fs.existsSync(destItem)) {
        fs.mkdirsSync(destItem);
        // console.log(`Created folder: ${destItem}`);
      }
      copyDirectoryContents(srcItem, destItem);
    } else {
      // Create file if it doesn't exist
      if (!fs.existsSync(destItem)) {
        fs.copySync(srcItem, destItem);
        // console.log(`Copied ${srcItem} to ${destItem}`);
      } else {
        console.log(`File ${destItem} already exists, skipping.`);
      }
    }
  });
};

// Function to create email templates
const createEmailTemplates = async (projectName) => {
  const appDir = path.resolve(process.cwd(), projectName);
  const emailComponentsFilePath = path.resolve(appDir, 'components/email-template.tsx');
  const sendComponentsFilePath = path.resolve(appDir, 'app/api/send/route.ts');

  checkAndCreateFile(emailComponentsFilePath, emailTemplate);
  checkAndCreateFile(sendComponentsFilePath, sendMailTemplate);
};

// Function to check and create a file if it doesn't exist
const checkAndCreateFile = (filePath, content = '') => {
  if (!fs.existsSync(filePath)) {
    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, content);
    // console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
};

module.exports = { createProjectStructure, copyTemplateFiles, createEmailTemplates };
