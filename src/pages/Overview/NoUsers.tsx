import noDataSearch from "./../../assets/no-data-icon/no-data-search.svg";
import noData from "./../../assets/no-data-icon/no-data.svg";
interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  type?: "no-data-search" | "no-data";
  searchData?: string;
  style?: object;
}

const NoUsers: React.FC<CardProps> = ({
  children,
  className,
  style,
  title,
  subtitle,
  searchData,
  type,
}) => {
  return (
    <div
      className={`flex w-full flex-col gap-6 justify-center items-center bg-transparent p-6 h-132.5  ${className}`}
    >
      {type === "no-data" ? (
        <>
          <img src={noData} alt="" />
          <div className="text-center text-2xl font-bold   ">
          It seems you don't have any users for coaching yet
          </div>
          <div className="text-center -mt-4 text-base font-medium  ">
          Please wait for them to be assigned to you or contact support

          </div>
        </>
      ) : (
        <>
          <img src={noDataSearch} alt="" />
          <div className="text-center text-2xl font-bold   ">
            Hmmm, we didn’t find anything for {searchData}

          </div>
          <div className="text-center -mt-4 text-base font-medium  ">
            Please check the spelling or try another name

          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default NoUsers;
