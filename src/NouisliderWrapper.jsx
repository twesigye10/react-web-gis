import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const NouisliderWrapper = ({
  range = { min: 0, max: 100 },
  start = [20, 80],
  //   onChange,
  step = 1,
}) => {
  return (
    <Nouislider
      range={range}
      start={start}
      step={step}
      connect={true}
      tooltips={true}
      //   onChange={onChange}
    />
  );
};

export default NouisliderWrapper;
