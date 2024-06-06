import React from "react";

interface ButtonProps {
  onClick?: () => void;
  variant: "primary" | "secondary";
  size: "big" | "small";
  children?: React.ReactNode;
  disabled?: boolean; 
  title?: string;
  icon?: any;
  className?: any;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  size,
  icon,
  className,
  title,
  children,
  disabled = false, 
}) => {
  const baseClasses =
    "inline-flex items-center justify-center text-center font-medium focus:outline-none";
  const variantClasses = {
    primary:
      "text-white bg-purple hover:bg-purpleHover active:bg-purplePressed disabled:bg-lightGrey disabled:text-darkGrey disabled:cursor-not-allowed",
    secondary:
      "text-black bg-lightGrey hover:bg-lightPurple active:bg-secondPurple disabled:bg-lightGrey disabled:text-darkGrey disabled:cursor-not-allowed",
  };
  const sizeClasses = {
    big: `py-4 px-4 title-xsm w-min-35 h-10 rounded-3xl ${children || icon && "w-min-36 gap-1"}`,
    small: `py-2 px-4 text-sm w-24 h-8 rounded-3xl ${children && "w-30 gap-1"}`,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled} 
    >
     {icon &&  <img src={icon} />}
    {children} {title}
    </button>
  );
};

export default Button;
