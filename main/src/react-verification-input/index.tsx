import React, {useEffect, useRef, useState} from "react";

const styleTypes = {
  circled: "code-input-circled",
  squared: "code-input-squared",
  outlined: "code-input-outlined",
  underlined: "code-input-underlined",
};

type StyleTypes = keyof typeof styleTypes;

interface Props {
  fields?: number;
  password?: boolean;
  customClass?: string;
  initialValue?: string;
  styleType?: StyleTypes;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const index = ({
  style,
  onChange,
  password,
  fields = 4,
  customClass,
  initialValue,
  styleType = "outlined",
}: Props) => {
  const refs = useRef<HTMLInputElement[]>([]);
  const [values, setValues] = useState<(string | null)[]>([
    ...Array(fields).fill(null),
  ]);

  useEffect(() => {
    refs.current.forEach((ref: any) => {
      ref.value = "";
    });

    if (initialValue?.length === fields) {
      setValue(initialValue, 0);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      values?.splice(i, 1, null);
      setValues([...values]);
      const r = refs.current[Math.max(0, i - 1)] as any;
      r.focus();
    }
  };

  function setValue(value: string, i: number) {
    if (value) {
      const [first, ...rest] = value;
      const lastInputBox = i === refs.current.length;
      const insertedContent = first !== undefined;

      if (insertedContent && !lastInputBox) {
        values.splice(i, 1, first);
        refs.current[i + 1]?.focus();
        setValues([...values]);
        setValue(rest.join(""), i + 1);
      }
    }
  }

  function setSingleValue(value: string, i: number) {
    if (!values[i]) {
      values.splice(i, 1, value);
      setValues([...values]);
      refs.current[i + 1]?.focus();
    } else {
      refs.current[i + 1]?.focus();
      values.splice(i + 1, 1, value[1]);
      setValues([...values]);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.value) {
      if (e.target.value.length > 2) {
        setValue(e.target.value, i);
      } else if (values[i] !== e.target.value && i !== fields - 1) {
        setSingleValue(e.target.value, i);
      } else if (i == values.length - 1 && values[values.length - 1] === null) {
        setSingleValue(e.target.value, i);
      }
    }

    if (onChange) {
      onChange(refs.current.map((a: any) => a.value).join(""));
    }
  };

  return (
    <div>
      {Array(fields)
        .fill(0)
        .map((_, i) => (
          <input
            key={i}
            required
            style={style}
            autoComplete="off"
            value={values[i] ?? ""}
            type={password ? "password" : "text"}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`code-input ${styleTypes[styleType]} ${customClass}`}
            ref={(element) => {
              if (refs?.current[i] && element) refs.current[i] = element;
            }}
          />
        ))}
    </div>
  );
};

export default index;
