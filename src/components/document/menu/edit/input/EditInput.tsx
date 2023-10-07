import React, { Ref, useImperativeHandle, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/components/document/menu/edit/input/input.module.scss";
import classNames from "classnames";

interface EditInputProps {
  label: React.ReactNode;
  defaultValue?: string | number;
  onChange?(value: number): void;
  disabled?: boolean;
  width?: number;
  height?: number;
}

export interface EditInputMethods {
  setValue(value: string | number): void;
}

const EditInputComponent = (
  { defaultValue, label, disabled, width, height }: EditInputProps,
  forwardRef: Ref<EditInputMethods>
) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputContainerStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

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
    <motion.div
      className={classNames({
        [styles.container]: true,
        [styles.hover]: hover,
        [styles.focus]: focus,
        [styles.disable]: disabled,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={inputContainerStyle}
      animate={{ paddingLeft: hover || focus ? "8px" : 0 }}
    >
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
    </motion.div>
  );
};

const EditInput = React.forwardRef<EditInputMethods, EditInputProps>(EditInputComponent);

export default EditInput;
