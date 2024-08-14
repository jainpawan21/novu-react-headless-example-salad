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

  console.log("headlessService?.fetchNotifications ===> ");
  headlessService?.fetchNotifications({
    listener: () => {},
    onSuccess: (response) => {
      console.log("================================================");
      console.log("headlessService?.fetchNotifications -> onSuccess");
      // const { data } = response;
      // onPushNotifications(data);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch notifications:", error);
    },
    query: { read: false },
    page: 0,
  });
};

const listenNotificationReceiveChange = async () => {
  if (!sessionInitialized) {
    throw new Error("Session is not initialized");
  }

  headlessService?.listenNotificationReceive({
    listener: () => {
      console.log("headlessService?.listenNotificationReceive -> listener");
      fetchNotifications(() => {});
    },
  });
};

export {
  fetchNotifications,
  initializeSession,
  listenNotificationReceiveChange,
};
