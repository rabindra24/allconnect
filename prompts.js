const questions = [
    {
      type: 'list',
      name: 'authProvider',
      message: 'Please Choose Auth Provider 🔐',
      choices: ['authjs', 'firebase', 'clerk'],
    },
    {
      type: 'list',
      name: 'emailProvider',
      message: 'Please Choose Email Provider 📧',
      choices: ['resend', 'sendgrid'],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Please Database ORM Tool 🧺',
      choices: ['prisma', 'drizzle'],
    },
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'Please Select UI library 🌸',
      choices: ['shadcn', 'chakra'],
    },
    {
      type: 'list',
      name: 'payment',
      message: 'Please Select Payment Gateway 💰',
      choices: ['razorpay', 'stripe', 'cashfree'],
    },
    {
      type: 'input',
      name: 'routes',
      message: 'Define Your routes:',
      validate: function (input) {
        // if (input.length === 0) {
        //   return 'Text input cannot be empty!';
        // }
        return true;
      },
    },
  ];
  
  module.exports = { questions };
  