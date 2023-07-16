import React, { Ref, useImperativeHandle, useRef, useState } from "react";
import styles from "@/components/document/menu/edit/input.module.scss";
import classNames from "classnames";

interface EditInputProps {
  label: React.ReactNode;
  defaultValue?: string | number;
  onChange?(value: number): void;
  disabled?: boolean;
}

export interface EditInputMethods {
  setValue(value: string | number): void;
}

const EditInputComponent = ({ defaultValue, label, disabled }: EditInputProps, forwardRef: Ref<EditInputMethods>) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (focus) {
      return;
    }
    event.stopPropagation();
    setHover(true);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setHover(false);
  };

  const setValue = (value: string | number) => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = value.toString();
  };

  useImperativeHandle(forwardRef, () => ({
    setValue,
  }));

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.hover]: hover,
        [styles.focus]: focus,
        [styles.disable]: disabled,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.border} />
      <div className={styles.label}>{label}</div>
      <div className={styles["input-wrap"]}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          defaultValue={defaultValue}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

const EditInput = React.forwardRef<EditInputMethods, EditInputProps>(EditInputComponent);

export default EditInput;
