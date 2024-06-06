interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: object
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
  return (
    <div style={style} className={`rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${className} p-6`}>
     {children}
    </div>
  );
};

export default Card;