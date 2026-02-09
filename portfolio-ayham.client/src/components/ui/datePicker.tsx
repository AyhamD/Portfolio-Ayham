import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  label?: string;
  value?: string;     
  onChange?: (value: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const selected = value ? new Date(value) : undefined;
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const handleSelect = (date?: Date) => {
    if (!date) return;
    const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
    onChange?.(iso);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
        <label className="text-slate-300 text-sm font-medium mb-1 block">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-slate-900 border border-slate-700 text-white rounded-md px-3 py-2 text-left text-sm flex justify-between items-center"
      >
        <span>{value || "Select date"}</span>
        <span className="text-slate-500 text-xs">📅</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white border border-slate-700 rounded-lg shadow-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

