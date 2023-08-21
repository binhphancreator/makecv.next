import React, { useMemo, useState } from "react";
import ColorPalettes from "~/constants/colors";
import SvgIcon from "~/components/icon/SvgIcon";
import { Position, Size } from "~/types/document";
import styles from "@/components/document/modal/modal.module.scss";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  size: Size;
}

const Modal = ({ title, children, size }: ModalProps) => {
  const [position, setPosition] = useState<Position>({
    x: 200,
    y: 200,
  });

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};

    if (typeof size.width === "number") {
      style.width = `${size.width}px`;
    }

    if (typeof size.height === "number") {
      style.height = `${size.height}px`;
    }

    style.left = `${position.x}px`;
    style.top = `${position.y}px`;

    return style;
  }, [size, position]);

  const handleHeaderOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startPosition: Position = {
      x: event.pageX - position.x,
      y: event.pageY - position.y,
    };

    const onMouseMove = (eventMove: MouseEvent) => {
      eventMove.preventDefault();
      setPosition({
        x: eventMove.pageX - startPosition.x,
        y: eventMove.pageY - startPosition.y,
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <Header title={title} onMouseDown={handleHeaderOnMouseDown} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

interface HeaderProps {
  title: string;
  onMouseDown?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const Header = ({ title, onMouseDown }: HeaderProps) => {
  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onMouseDown && onMouseDown(event);
  };

  return (
    <div className={styles.header} onMouseDown={handleOnMouseDown}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles["btn-close"]}>
        <SvgIcon name="xmark" height={16} color={ColorPalettes.gray600} />
      </button>
    </div>
  );
};

export default Modal;
