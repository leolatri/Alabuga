import React from "react";
import cx from 'classnames';
import st from './button.module.scss';
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  to: string;
  label: string;
  className?: string;
  replace?: boolean;
}

const NavigationButton = ({ 
  to, 
  label, 
  className = "",
  replace = false 
}: NavigationButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace });
  };

  return (
    <button onClick={handleClick} className={cx(st.navigateButton, className)}>
      {label}
    </button>
  );
};

export default NavigationButton;