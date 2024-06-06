import { useState, FC } from "react";

interface CheckboxOneProps {
  title?: string;
}

const CheckboxOne: FC<CheckboxOneProps> = ({ title }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          {!isChecked ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="15"
                height="15"
                rx="1.5"
                stroke="#A09FA7"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 0H2.66667C2 0 1.22583 0.107504 0.666667 0.666667C0.107504 1.22583 0 2 0 2.5472V13.3333C0 14 0 14.6667 0.666667 15.3333C1.33333 16 2 16 2.66667 16H13.3333C14.3333 16 15 15.6667 15.3333 15.3333C15.8355 14.8312 16 14 16 13.3333V2.66667C16 2 15.8382 1.17157 15.3333 0.666667C14.8284 0.161758 14 0 13.3333 0ZM11.805 6.47167L7.13833 11.1383C7.07642 11.2003 7.00289 11.2495 6.92196 11.283C6.84103 11.3166 6.75428 11.3339 6.66667 11.3339C6.57906 11.3339 6.49231 11.3166 6.41137 11.283C6.33044 11.2495 6.25692 11.2003 6.195 11.1383L4.195 9.13833C4.06991 9.01324 3.99963 8.84358 3.99963 8.66667C3.99963 8.48976 4.06991 8.32009 4.195 8.195C4.32009 8.06991 4.48976 7.99963 4.66667 7.99963C4.84358 7.99963 5.01324 8.06991 5.13833 8.195L6.66667 9.72417L10.8617 5.52833C10.9236 5.46639 10.9971 5.41726 11.0781 5.38374C11.159 5.35022 11.2457 5.33296 11.3333 5.33296C11.4209 5.33296 11.5077 5.35022 11.5886 5.38374C11.6695 5.41726 11.7431 5.46639 11.805 5.52833C11.8669 5.59027 11.9161 5.66381 11.9496 5.74474C11.9831 5.82566 12.0004 5.9124 12.0004 6C12.0004 6.0876 11.9831 6.17434 11.9496 6.25526C11.9161 6.33619 11.8669 6.40973 11.805 6.47167Z"
                fill="#8460B3"
              />
            </svg>
          )}
        </div>
        <p className="title-xs ml-2">{title ? title : "no title"}</p>
      </label>
    </div>
  );
};

export default CheckboxOne;
