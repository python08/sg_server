import { AWS_SES } from "../middleware/aws-ses-config";

// Utility function to send email using Amazon SES
export const sendEmail = async (
  toEmail: string,
  subject: string,
  body: any
) => {
  const params = {
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Body: {
        Html: { Data: body },
        Text: { Data: body }, // Fallback to text if some error in HTML
      },
      Subject: { Data: subject },
    },
    Source: process.env.SES_EMAIL_SOURCE,
  };
  return await AWS_SES.sendEmail(params).promise();
};