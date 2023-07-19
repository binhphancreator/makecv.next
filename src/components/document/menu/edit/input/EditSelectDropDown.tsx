import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/components/document/menu/edit/input/select-dropdown.module.scss";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import classNames from "classnames";

interface EditSelectDropDownProps {
  value: string;
  width?: number | string;
  height?: number | string;
}

const EditSelectDropDown = ({ value, width }: EditSelectDropDownProps) => {
  const [hover, setHover] = useState(false);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
    };
  }, [width]);

  return (
    <motion.div
      layout
      style={containerStyle}
      className={classNames({
        [styles.container]: true,
        [styles.hover]: hover,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.border} />
      <motion.div layout className={styles.input}>
        {value}
      </motion.div>
      <motion.div layout className={styles["icon-wrap"]}>
        <SvgIcon type="regular" name="chevron-down" color={ColorPalettes.gray400} width={10} />
      </motion.div>
    </motion.div>
  );
};

export default EditSelectDropDown;
