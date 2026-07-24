type StatusMessageProps = {
  type: 'loading' | 'error';
  message?: string;
};

export const StatusMessage = ({ type, message }: StatusMessageProps) => {
  if (type === 'loading') {
    return (
      <div className="flex min-h-[700px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
      <h2 className="text-xl font-bold text-[#12213A]">Something went wrong</h2>

      <p className="text-gray-600">{message || 'Failed to load data'}</p>
    </div>
  );
};
