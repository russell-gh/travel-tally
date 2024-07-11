import { Slider, Stack, styled } from "@mui/material";
import { useState } from "react";

const StyledSlider = styled(Slider)(({ theme }) => ({
  width: 250,
  height: 10,
  "& .MuiSlider-rail": {
    backgroundColor:'#d6ee79',
    opacity:1,
    boxShadow: `1px 1px 1px 1px #d6ee79`,
    outline:0
  },
  "& .MuiSlider-track": {
    color: "#235b89",
  },
  "& .MuiSlider-thumb": {
    color: "#235b89",
    height:30,
    width:30
  },
  "& .MuiSlider-valueLabelOpen": {
    fontSize: 16,
    fontWeight: 600,
    color: "#235b89",
    backgroundColor:"#d6ee79",
    height: 40,
    width:30,
    borderRadius: "50%",
    top: -15,
    padding: "5px 10px"
  },
}));

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
        <StyledSlider
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
