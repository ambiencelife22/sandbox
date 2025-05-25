import * as React from "react"

import { type ToastActionElement, type ToastProps } from "./toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive" | "success" | "warning" | "info"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToastContextType = {
  toasts: ToasterToast[]
  addToast: (props: Omit<ToasterToast, "id">) => void
  updateToast: (id: string, props: Partial<ToasterToast>) => void
  dismissToast: (id: string) => void
  removeToast: (id: string) => void
  toast: (props: Omit<ToasterToast, "id">) => void
} | null

const ToastContext = React.createContext<ToastContextType>(null)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

export function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  const addToast = React.useCallback(
    function addToast(props: Omit<ToasterToast, "id">) {
      setToasts((currentToasts) => {
        return [
          ...currentToasts,
          { id: genId(), ...props },
        ].slice(-TOAST_LIMIT)
      })
    },
    [],
  )

  const updateToast = React.useCallback(
    function updateToast(id: string, props: Partial<ToasterToast>) {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, ...props } : toast,
        ),
      )
    },
    [],
  )

  const dismissToast = React.useCallback(
    function dismissToast(id: string) {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, open: false } : toast,
        ),
      )
    },
    [],
  )

  const removeToast = React.useCallback(
    function removeToast(id: string) {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      )
    },
    [],
  )

  // Create a toast function that's the same as addToast for convenience
  const toast = React.useCallback(function toast(props: Omit<ToasterToast, "id">) {
    addToast(props);
  }, [addToast]);
  
  // Register the toast callback for the standalone function
  React.useEffect(() => {
    setToastCallback(addToast);
    
    return () => {
      // Clean up on unmount
      setToastCallback(() => {
        console.warn('Toast provider has been unmounted');
      });
    };
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

type ToastOptions = Omit<ToasterToast, "id">

// Create a global state outside of React for the standalone function
let TOAST_CALLBACK: ((props: ToastOptions) => void) | null = null;

// Function to set the callback
export function setToastCallback(callback: (props: ToastOptions) => void) {
  TOAST_CALLBACK = callback;
}

// Standalone toast function - uses the global callback
export function toast(props: ToastOptions) {
  if (TOAST_CALLBACK) {
    TOAST_CALLBACK(props);
  } else {
    console.warn('Toast was called before toast provider was initialized');
  }
}