import { Gauge } from "@mui/x-charts/Gauge";

const CategoryGauge = ({ budget, spend }) => {
  return (
    <Gauge
      width={150}
      height={150}
      value={spend}
      valueMax={budget}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
};

export default CategoryGauge;
