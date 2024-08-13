/* eslint-disable @typescript-eslint/no-empty-function */

import { HeadlessService } from "@novu/headless";
import type {
  // IMessage,
  ISession,
} from "@novu/notification-center";
// import type { IPaginatedResponse } from "@novu/shared";

type OnPushNotificationsHandler = (notifications: any[]) => void;

let headlessService: HeadlessService | null = null;
let sessionInitialized = false;
let session: ISession | undefined;

const initializeSession = async (
  subscriberId: string,
  applicationIdentifier: string,
  subscriberHash: string
): Promise<ISession> => {
  if (sessionInitialized) {
    if (session) {
      return session;
    }
    throw new Error("Session is not initialized");
  }

  headlessService = new HeadlessService({
    applicationIdentifier,
    subscriberId,
    subscriberHash,
  });

  const result = await new Promise<ISession>((resolve, reject) => {
    headlessService?.initializeSession({
      listener: () => {},
      onSuccess: (response) => {
        sessionInitialized = true;
        session = response;
        resolve(response);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });

  return result;
};

const fetchNotifications = async (
  onPushNotifications: OnPushNotificationsHandler
) => {
  if (!sessionInitialized) {
    throw new Error("Session is not initialized");
  }

  headlessService?.fetchNotifications({
    listener: () => {},
    onSuccess: (response) => {
      const { data } = response;
      onPushNotifications(data);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch notifications:", error);
    },
    query: { read: false },
    page: 0,
  });
};

const listenNotificationReceiveChange = async (
  onPushNotification: (notification: any | null) => void
) => {
  if (!sessionInitialized) {
    throw new Error("Session is not initialized");
  }

  headlessService?.listenNotificationReceive({
    listener: (response) => {
      onPushNotification(response);
      fetchNotifications(onPushNotification);
    },
  });
};

export {
  fetchNotifications,
  initializeSession,
  listenNotificationReceiveChange,
};
