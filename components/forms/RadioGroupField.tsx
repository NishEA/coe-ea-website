type Option = { value: string; label: string };

type Props = {
  legend: string;
  name: string;
  options: Option[];
  required?: boolean;
  error?: string;
  defaultValue?: string;
};

export function RadioGroupField({
  legend,
  name,
  options,
  required,
  error,
  defaultValue,
}: Props) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset aria-describedby={errorId}>
      <legend className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy">
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              defaultChecked={o.value === defaultValue}
              className="accent-brand-cerulean"
            />
            <span className="font-body text-[15px] text-brand-navy">{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <span id={errorId} role="alert" className="mt-1 block font-body text-xs text-red-600">
          {error}
        </span>
      )}
    </fieldset>
  );
}
