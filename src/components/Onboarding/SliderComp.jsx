import { Slider, Stack, Typography } from "@mui/material";

export const SliderComp = ({label, id, budgetTotal, callback}) => {
  return (
    <>
      <p>{label}</p>
      <Stack direction="row">
        <p>0</p>
        <Slider
          min={0}
          max={Number(budgetTotal)}
          valueLabelDisplay="on"
          // onChange={(e,newValue)=>console.log(e.target.value, newValue)}
          onChange={(e)=>callback(e,id)}
        />
        <p>{budgetTotal}</p>
      </Stack>
    </>
  );
};

//add aria stuff