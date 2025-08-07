import { toast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const showToast = {
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, {
        description: options?.description,
        action: options?.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    },
    
    error: (message: string, options?: ToastOptions) => {
      toast.error(message, {
        description: options?.description,
        action: options?.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    },
    
    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, {
        description: options?.description,
        action: options?.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    },
    
    info: (message: string, options?: ToastOptions) => {
      toast.info(message, {
        description: options?.description,
        action: options?.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    },
    
    loading: (message: string) => {
      return toast.loading(message);
    },
    
    dismiss: (toastId?: string | number) => {
      toast.dismiss(toastId);
    }
  };

  return { toast: showToast };
};