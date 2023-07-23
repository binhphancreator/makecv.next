import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/components/document/menu/edit/input/select-dropdown.module.scss";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import classNames from "classnames";
import FloatPortal from "~/components/float/FloatPortal";

interface InputProps {
  value: string;
  width?: number;
  height?: number;
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

const Input = ({ value: defaultValue, width, height, children }: InputProps) => {
  const [hover, setHover] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState<string | number>(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positionDropdown, setPositionDropdown] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const boundingClientRect = containerRef.current.getBoundingClientRect();
      setPositionDropdown({
        x: boundingClientRect.left,
        y: boundingClientRect.top,
      });
    }
  }, []);

  const inputContainerStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowDropdown(true);
    setHover(false);
  };

  const handleOnBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDropdown(false);
  };

  const dropdownItems = useMemo(() => {
    if (!children) {
      return null;
    }

    if (children instanceof Array && children.length) {
      return children.map((child, index) => (
        <div
          key={child.props.value || index.toString()}
          className={classNames({
            [styles["dropdown-item"]]: true,
            [styles.selected]: value === (child.props.value || child.props.children),
          })}
          onMouseDown={() => {
            setValue(child.props.value ?? child.props.children);
            setShowDropdown(false);
            setHover(false);
          }}
        >
          <div className={styles["icon-check"]}>
            <SvgIcon name="check" width={12} />
          </div>
          {child}
        </div>
      ));
    }

    if ("props" in children) {
      return <div className={styles["dropdown-item"]}>{children}</div>;
    }
  }, [children, value]);

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleOnMouseDown}
      className={styles.container}
    >
      <motion.div
        layout
        style={inputContainerStyle}
        className={classNames({
          [styles["input-container"]]: true,
          [styles.hover]: hover || showDropdown,
        })}
        animate={{ paddingLeft: hover || showDropdown ? "8px" : 0 }}
      >
        <div className={styles.border} />
        <motion.div className={styles.input}>{value}</motion.div>
        <motion.div layout className={styles["icon-wrap"]}>
          <SvgIcon type="regular" name="chevron-down" color={ColorPalettes.gray400} width={10} />
        </motion.div>
      </motion.div>

      <FloatPortal show={showDropdown} x={positionDropdown.x} y={positionDropdown.y} onPressBackdrop={handleOnBackdrop}>
        <div onMouseDown={(e) => e.stopPropagation()} className={styles["dropdown-container"]}>
          <div className={styles["dropdown-list"]}>{dropdownItems}</div>
        </div>
      </FloatPortal>
    </motion.div>
  );
};

export interface OptionProps {
  value?: string | number;
  children: string;
}

const Option = ({ children }: OptionProps) => {
  return <span>{children}</span>;
};

const EditSelect = {
  Input,
  Option,
};

export default EditSelect;
