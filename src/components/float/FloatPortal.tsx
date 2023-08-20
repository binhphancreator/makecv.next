import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "@/components/float/float-portal.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface FloatPortalProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  children: React.ReactNode;
  wrapper?: Element | DocumentFragment;
  show?: boolean;
  onPressBackdrop?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const FloatPortal = ({ children, width, height, x, y, wrapper, show, onPressBackdrop }: FloatPortalProps) => {
  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (width) {
      style.width = `${width}px`;
    }
    if (height) {
      style.height = `${height}px`;
    }
    if (x) {
      style.left = `${x}px`;
    }
    if (y) {
      style.top = `${y}px`;
    }
    return style;
  }, [width, height, x, y]);

  const handleOnPressBackdrop = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onPressBackdrop && onPressBackdrop(event);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div>
          {createPortal(
            <>
              <div className={styles.backdrop} onMouseDown={handleOnPressBackdrop} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.container}
                style={containerStyle}
              >
                {children}
              </motion.div>
            </>,
            wrapper || document.body
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatPortal;
