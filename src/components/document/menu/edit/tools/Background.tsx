import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { color2css, color2hex } from "~/utils/color";
import emitter from "~/components/document/event";
import styles from "@/components/document/menu/edit/tools/background.module.scss";
import { updateViewportFill } from "~/redux/documentSlice";

const Background = () => {
  const dispatch = useAppDispatch();
  const viewportFill = useAppSelector((state) => state.documentState.viewport.fill);

  const previewStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: color2css(viewportFill),
    };
  }, [viewportFill]);

  const handleOnPressPreview = () => {
    emitter.dispatch("modal.color.show", {
      onChange(hsb) {
        dispatch(updateViewportFill({ fill: hsb }));
      },
      color: viewportFill,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Background Color</div>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles["color-panel"]}>
            <div onClick={handleOnPressPreview} className={styles["preview"]} style={previewStyle} />
            <div className={styles.input}>{color2hex(viewportFill)}</div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Background;
