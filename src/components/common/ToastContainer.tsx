import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 bg-[#191919] text-[#FAF9F6] text-sm rounded shadow-lg border border-[#333333] transition-all transform translate-y-0`}
          >
            {isError ? (
              <AlertCircle size={18} className="text-[#C44949] shrink-0" />
            ) : isInfo ? (
              <Info size={18} className="text-[#999999] shrink-0" />
            ) : (
              <CheckCircle2 size={18} className="text-[#3B82F6] shrink-0" />
            )}
            <p className="flex-1 font-normal text-xs sm:text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#77736E] hover:text-[#FAF9F6] transition-colors p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
