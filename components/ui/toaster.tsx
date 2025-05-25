import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={variant === "destructive" ? "destructive" : 
            variant === "success" ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800" :
            variant === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800" :
            variant === "info" ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800" :
            "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"}>
            <div className="grid gap-1">
              {title && <ToastTitle className={variant === "destructive" ? "text-white" : 
                variant === "success" ? "text-green-800 dark:text-green-200" :
                variant === "warning" ? "text-yellow-800 dark:text-yellow-200" :
                variant === "info" ? "text-blue-800 dark:text-blue-200" :
                "text-gray-800 dark:text-gray-200"}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={variant === "destructive" ? "text-white" : 
                  variant === "success" ? "text-green-700 dark:text-green-300" :
                  variant === "warning" ? "text-yellow-700 dark:text-yellow-300" :
                  variant === "info" ? "text-blue-700 dark:text-blue-300" :
                  "text-gray-500 dark:text-gray-400"}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
