import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotifications } from "react-icons/io";

const NotificationHandler = () => {
  const notificationsFetched = useRef(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/data/notifications.json", {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const notifications = await response.json();

        const currentDate = new Date();

        if (Array.isArray(notifications) && notifications.length > 0) {
          notifications
            .filter(
              (notification) =>
                new Date(notification.expirationDate) > currentDate,
            )
            .forEach((notification) => {
              setTimeout(() => {
                const position =
                  window.innerWidth < 768 ? "bottom-center" : "bottom-right";
                toast(
                  <div className="my-2 flex flex-col items-center justify-center">
                    {/*<IoIosNotifications className="mx-auto my-2 text-xl text-main-color" />*/}
                    <div
                      className={`${
                        notification.centerText ? "text-center" : "text-left"
                      } text-xs text-black`}
                      dangerouslySetInnerHTML={{
                        __html: notification.htmlContent,
                      }}
                    />
                    {/*optional logo*/}
                    {notification.logo && (
                      <img
                        src={notification.logo}
                        alt="Logo"
                        className="mx-auto my-2 max-w-[150px] object-contain"
                      />
                    )}
                    {notification.buttonText &&
                    notification.buttonText.trim() !== "" &&
                    notification.buttonUrl &&
                    (notification.buttonUrl.startsWith("http://") ||
                      notification.buttonUrl.startsWith("https://")) ? (
                      <a
                        href={notification.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toast.dismiss()}
                      >
                        <button
                          className={`mt-5 max-w-[400px] rounded-xl border-2 border-transparent bg-main-color px-5 py-2 text-white transition-colors duration-300 ease-linear hover:border-black`}
                        >
                          {notification.buttonText}
                        </button>
                      </a>
                    ) : notification.buttonText &&
                      notification.buttonText.trim() !== "" &&
                      notification.buttonUrl ? (
                      <Link
                        to={notification.buttonUrl}
                        onClick={() => toast.dismiss()}
                      >
                        <button
                          className={`mt-5 max-w-[400px] rounded-xl border-2 border-transparent bg-main-color px-5 py-2 text-sm text-white transition-colors duration-300 ease-linear hover:border-black`}
                        >
                          {notification.buttonText}
                        </button>
                      </Link>
                    ) : null}
                  </div>,
                  {
                    closeButton: true,
                    autoClose: 12000,
                    position: position,
                    className: "custom-toast",
                    bodyClassName: "custom-toast-body",
                  },
                );
              }, notification.delay);
            });
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (!notificationsFetched.current) {
      fetchNotifications();
      notificationsFetched.current = true;
    }
  }, []);

  return <ToastContainer />;
};

export default NotificationHandler;
