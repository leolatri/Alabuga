import React from "react";
import styles from "./title.module.scss";
import cx from 'classnames'; 


interface Props {
  text: string;
  className?: string;
}

const Title = ({ text, className }: Props) => (
  <div className={cx(styles.title, className)}>
    {text}
  </div>
)

export default Title;