import React, { useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/components/document/menu/edit/input/segment.module.scss";

interface LineProps {
  children?: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
  defaultValue?: string | number;
}

const Line = ({ children, defaultValue }: LineProps) => {
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const items = useMemo(() => {
    if (!children) {
      return null;
    }

    if (children instanceof Array && children.length) {
      return children.map((child, index) => (
        <div
          key={index}
          onMouseDown={() => setValue(child.props.value)}
          className={classNames({
            [styles.item]: true,
            [styles.active]: value === child.props.value,
          })}
        >
          {child}
        </div>
      ));
    }

    if ("props" in children) {
      return (
        <div
          onMouseDown={() => setValue(children.props.value)}
          className={classNames({
            [styles.item]: true,
            [styles.active]: value === children.props.value,
          })}
        >
          {children}
        </div>
      );
    }

    return null;
  }, [children, value]);

  if (!items) {
    return null;
  }

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.hover]: hover,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {items}
    </div>
  );
};

interface ItemProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
  value: string | number;
}

const Item = ({ children, width, height }: ItemProps) => {
  const style = useMemo<React.CSSProperties>(() => {
    return {
      width: typeof width === "number" ? `${width}px` : "20px",
      height: typeof height === "number" ? `${height}px` : "20px",
    };
  }, [width, height]);

  return (
    <div style={style} className={styles["item-inner"]}>
      {children}
    </div>
  );
};

const EditSegment = {
  Line,
  Item,
};

export default EditSegment;
