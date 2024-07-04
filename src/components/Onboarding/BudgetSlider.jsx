import { Slider, Stack } from "@mui/material";
import { useState } from "react";

export const BudgetSlider = ({
  label,
  id,
  budgetTotal,
  callback,
  onboardingDetails,
}) => {

  //set original remaining to total budget
  const [leeway, setLeeway] = useState(onboardingDetails.budgetTotal)

  const setSliderVal = (e, id) => {
    //check sum of everything except current slider
    const sumOfNonActiveSliders =
      onboardingDetails.budgetHotel +
      onboardingDetails.budgetFood +
      onboardingDetails.budgetOther +
      onboardingDetails.budgetTransport +
      onboardingDetails.budgetActivities -
      onboardingDetails[id];
//set leeway to total - running total
    setLeeway(onboardingDetails.budgetTotal - sumOfNonActiveSliders)

    // if (e.target.value < leeway) {
    //   callback(e, id);
    // } else {
    //   callback(e, id, leeway);
    // }
  };

  return (
    <>
      <p>{label}</p>
      <Stack direction="row">
        <p>0</p>
        <Slider
          // value={}
          min={0}
          //check why conversion is needed here
          max={Number(leeway)}
          valueLabelDisplay="on"
          onChange={(e) => setSliderVal(e, id)}
        />
        <p>{budgetTotal}</p>
      </Stack>
    </>
  );
};

//add aria stuff
