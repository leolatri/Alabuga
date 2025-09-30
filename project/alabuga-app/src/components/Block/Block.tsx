import cx from "classnames";
import React from "react";
import st from "./block.module.scss";


interface BlockProps {
  title?: string;
  className?: string;
  classBox?: string;
  child?: React.JSX.Element;
}

const Block = ({ title, className, classBox, child}: BlockProps) => (
  <div className={cx(st.block, className)}>
    {title}
    <div className={cx(st.block__box, classBox)}>
      {child}
    </div>
  </div>
);

export default React.memo(Block);