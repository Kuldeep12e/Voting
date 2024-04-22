// emailTemplate.js

const generateEmailTemplate = (name, description) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Blockchain Voting Process</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #999;
            font-size: 14px;
        }
        </style>
    </head>
    <body>
        <div>
            <h1>Welcome to Blockchain Voting Process</h1>
            <p>Dear ${name},</p>
            <p>
               ${description}
            </p>
            <p>
                Please stay tuned for further instructions and updates regarding the election process.
            </p>
            <div class="footer">
                <p>This email was sent to you by lazylearner41@gmail.com. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = generateEmailTemplate;
