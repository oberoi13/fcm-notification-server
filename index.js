const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const serviceAccount = require('C:/Users/Asus/Desktop/driveshare-c4036-firebase-adminsdk-ypjci-068a3340f0.json'); // Replace with the correct path to your service account key file
const cors = require('cors'); // Import the cors package

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://driveshare-c4036-default-rtdb.firebaseio.com', // Replace with your Firebase Realtime Database URL, if you're using it
});
const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 3000;

/**
 * Function to send a notification to a specific user using their FCM token.
 *
 * @param {string} fcmToken - The FCM token of the target user's device.
 * @param {object} message - The notification message containing title, body, and optional data.
 */
// const sendNotificationToUser = async (fcmToken, message) => {
//     try {
//       // Define the message payload
//       const payload = {
//         notification: {
//           title: message.title,
//           body: message.body,
//         },
//         data: message.data || {}, // Optional: Custom data you want to send
//         token: fcmToken,
//       };
  
//       // Send the message using Firebase Admin SDK
//       const response = await admin.messaging().send(payload);
//       console.log('Notification sent successfully:', response);
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }
//   };
// API endpoint to send notification
app.post('/send-notification', async (req, res) => {
  console.log(req.body)
  const { fcmToken, Title, Body ,senderName } = req.body;
  console.log(fcmToken,Title,Body,senderName)

 
  try {
    const payload = {
      notification: {
        title: Title,

        body:Body ,
      },
     // data: data || {},
       // Optional: Custom data
      token: fcmToken,
    };

    // Send the notification
    const response = await admin.messaging().send(payload);
    console.log('Notification sent successfully:', response);
    res.status(200).send({ success: true, messageId: response });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});
  
 // Example usage: Replace with actual FCM token and message
  const exampleFcmToken = 'e18ReP5EQby1bd50iyr2aS:APA91bGdptIoITDsiJJng9WL9QMcT8aW57WsjIfmooqSzQAtsj0cPyWMvLi5Jv8bspCVDaLRqTzg3lsCyA6Hy1cfdSM_dcdsgpdmhP5K-WfkBhGynwHStCgPDoAnlIOTqFbq7018MqeN'; // Replace with the user's FCM token
  const exampleMessage = {
    title: 'Hello from Firebase!',
    body: 'This is a test notification.',
    data: { customDataKey: 'customDataValue' }, // Optional
  };
  
 // Send a test notification
   //sendn(exampleFcmToken, exampleMessage);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
