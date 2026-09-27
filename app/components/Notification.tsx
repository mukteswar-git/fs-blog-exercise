"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const style =
    type === "success"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white"

  return (
    <div
      data-testid="notification"
      className={`mb-2.5 rounded px-4 py-2.5 ${style}`}
    >
      {message}
    </div>
  )
}
