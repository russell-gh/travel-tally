import { Slider, Stack, styled } from "@mui/material";
import { useState } from "react";

const StyledSlider = styled(Slider)(({ slidermax }) => ({
  width: 230,
  height: 8,
  "& .MuiSlider-rail": {
    backgroundColor: "#d6ee79",
    opacity: 1,
    boxShadow: `1px 1px 1px 1px #d6ee79`,
    outline: 0,
  },
  "& .MuiSlider-track": {
    color: "#235b89",
  },
  "& .MuiSlider-thumb": {
    color: slidermax,
    height: 20,
    width: 20,
  },
  "& .MuiSlider-valueLabelOpen": {
    fontSize: 12,
    fontWeight: 600,
    color: "#235b89",
    backgroundColor: "#d6ee79",
    height: 20,
    width: 10,
    borderRadius: "50%",
    top: -15,
    padding: "5px 10px",
  },
}));

export const BudgetSlider = ({ label, id, callback, onboardingDetails }) => {
  const [sliderMax, setSliderMax] = useState(false);
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

      if (e.target.value == onboardingDetails.budgetTotal) {
        setSliderMax(true);
      } else {
        setSliderMax(false);
      }

      callback(e);
    } else {
      setSliderMax(true);
    }
  };

  return (
    <div className="budgetSlider">
      <p className="label">{label}</p>
      <Stack direction="row">
        <StyledSlider
          slidermax={sliderMax ? "#06233b" : "#235b89"}
          value={position}
          id={id}
          name={id}
          min={0}
          max={onboardingDetails.budgetTotal}
          valueLabelDisplay="on"
          onChange={positionUpdate}
        />
        <p className="budgetTotal">{onboardingDetails.budgetTotal}</p>
      </Stack>
    </div>
  );
};

//add aria stuff
