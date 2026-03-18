interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

export const useToasts = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
