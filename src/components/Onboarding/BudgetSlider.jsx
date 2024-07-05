import { Slider, Stack } from "@mui/material";

export const BudgetSlider = ({label, id, budgetTotal, callback, onboardingDetails}) => {
  return (
    <>
      <p>{label}</p>
      <Stack direction="row">
        <p>0</p>
        <Slider
          min={0}
          max={Number(budgetTotal)}
          valueLabelDisplay="on"
          onChange={(e)=>callback(e,id)}
        />
        <p>{budgetTotal}</p>
      </Stack>
    </>
  );
};

//add aria stuff
// max={Number(budgetTotal)-onboardingDetails.budgetHotel-onboardingDetails.budgetFood-onboardingDetails.budgetOther-onboardingDetails.budgetTransport-onboardingDetails.budgetActivities}
