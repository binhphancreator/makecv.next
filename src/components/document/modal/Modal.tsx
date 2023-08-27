import React, { ForwardedRef, useMemo, useState } from "react";
import ColorPalettes from "~/constants/colors";
import SvgIcon from "~/components/icon/SvgIcon";
import { Position, Size } from "~/types/document";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/components/document/modal/modal.module.scss";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  size: Size;
}

export interface ModalMethods {
  show(): any;
  hide(): any;
}

const ModalComponent = ({ title, children, size }: ModalProps, forwardRef: ForwardedRef<ModalMethods>) => {
  const [position, setPosition] = useState<Position>({
    x: 200,
    y: 200,
  });
  const [visible, setVisible] = useState<boolean>(false);

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

  const hide = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

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

  React.useImperativeHandle(forwardRef, () => ({
    show,
    hide,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.container}
          style={containerStyle}
        >
          <Header title={title} onMouseDown={handleHeaderOnMouseDown} onClose={hide} />
          <div className={styles.body}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface HeaderProps {
  title: string;
  onMouseDown?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onClose?(): void;
}

const Header = ({ title, onMouseDown, onClose }: HeaderProps) => {
  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onMouseDown && onMouseDown(event);
  };

  return (
    <div className={styles.header} onMouseDown={handleOnMouseDown}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles["btn-close"]} onClick={() => onClose && onClose()}>
        <SvgIcon name="xmark" height={16} color={ColorPalettes.gray600} />
      </button>
    </div>
  );
};

const Modal = React.forwardRef<ModalMethods, ModalProps>(ModalComponent);

export default Modal;
