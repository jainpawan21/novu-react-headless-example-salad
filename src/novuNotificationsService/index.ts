import {
  fetchNotifications,
  initializeSession,
  listenNotificationReceiveChange,
} from "./novuNotificationsService";

const YOUR_SUBSCRIBER_ID = "YOUR_SUBSCRIBER_ID";
const YOUR_APPLICATION_IDENTIFIER = "YOUR_APPLICATION_IDENTIFIER";
const YOUR_SUBSCRIBER_HASH = "YOUR_SUBSCRIBER_HASH";

const onPushNotifications = (appNovuNotifications: (any | null)[]) => {
  console.log("notifications: ", appNovuNotifications);
};

initializeSession(
  YOUR_SUBSCRIBER_ID,
  YOUR_APPLICATION_IDENTIFIER,
  YOUR_SUBSCRIBER_HASH
)
  .then(() => {
    fetchNotifications(onPushNotifications);
    listenNotificationReceiveChange(() => {});
    return null;
  })
  .catch((error: Error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to initialize session:", error);
  });
