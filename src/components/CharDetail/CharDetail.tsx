import React from 'react';

interface CharDetailProps {
  list?: boolean;
  data: string | number;
  title: string;
  className?: React.HTMLAttributes<HTMLSpanElement> | string;
}

const CharDetail: React.FC<CharDetailProps> = ({ list = false, data, title, className }) => {
  return (
    <>
      {list ? (
        <li className={`text-xl font-medium ${className}`}>
          {title} {data}
        </li>
      ) : (
        <span className={`text-xl font-medium ${className}`}>
          {title} {data}
        </span>
      )}
    </>
  );
};

export default CharDetail;
