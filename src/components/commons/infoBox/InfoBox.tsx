import React from "react";

interface Props {
  children: React.ReactNode;
}

const InfoBox = ({ children }: Props) => {
  return (
    <div className="bg-blue-300 rounded text-white text-center p-2 mb-4">
      {children}
    </div>
  );
};

export default InfoBox;
