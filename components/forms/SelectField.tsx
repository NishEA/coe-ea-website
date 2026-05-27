type Option = { value: string; label: string };

type Props = {
  label: string;
  id: string;
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
};

export function SelectField({
  label,
  id,
  name,
  options,
  placeholder,
  required,
  error,
  defaultValue = "",
}: Props) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy">
        {label}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-describedby={errorId}
        aria-invalid={!!error || undefined}
        className="mt-2 w-full appearance-none border-b border-brand-navy/30 bg-transparent py-2 font-body text-brand-navy outline-none focus:border-brand-cerulean"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} role="alert" className="mt-1 block font-body text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
