import { Slider, Stack } from "@mui/material";
import { useState } from "react";

export const BudgetSlider = ({ label, id, callback, onboardingDetails }) => {
  const [position, setPosition] = useState(0);

  const positionUpdate = (e) => {
    const sumOfNonActiveSliders =
      onboardingDetails.budgetHotel +
      onboardingDetails.budgetFood +
      onboardingDetails.budgetOther +
      onboardingDetails.budgetTransport +
      onboardingDetails.budgetActivities -
      onboardingDetails[id];

    const remaining = onboardingDetails.budgetTotal - sumOfNonActiveSliders;
    if (remaining >= e.target.value) {
      setPosition(Number(e.target.value));
      callback(e);
    }
  };

  return (
    <>
      <p>{label}</p>
      <Stack direction="row">
        <p>0</p>
        <Slider
          value={position}
          id={id}
          name={id}
          min={0}
          max={onboardingDetails.budgetTotal}
          valueLabelDisplay="on"
          onChange={positionUpdate}
        />

        <p>{onboardingDetails.budgetTotal}</p>
      </Stack>
    </>
  );
};

//add aria stuff
