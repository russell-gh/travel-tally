import { Gauge } from "@mui/x-charts/Gauge";

const CategoryGauge = ({ budget, spend }) => {
  return (
    <Gauge
      width={150}
      height={150}
      value={Number(spend)}
      valueMax={Number(budget)}
      text={`${spend} / ${budget}`}
    />
  );
};

export default CategoryGauge;
