import { Slider, Stack, styled } from "@mui/material";
import { useState } from "react";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)(() => ({
  width: "50px",
  top: "-13px",
  marginLeft: "3px",
  textAlign: "center",
  height: "50px",
  "& .MuiInput-underline": {
    display:"none"
  },
  "& .MuiInputBase-input": {
    textAlign: "center",
    height: "20px",
    padding: "2px 0 0 15px",
  },
}));

const StyledSlider = styled(Slider)(({ slidermax }) => ({
  width: "55vw",
  height: 8,
  marginBottom: "3em",
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
    top: -8,
    padding: "5px 10px",
  },
}));

export const BudgetSlider = ({
  label,
  id,
  callback,
  onboardingDetails,
  sliderError,
  setSliderError,
}) => {
  const [sliderMax, setSliderMax] = useState(false);
  const [position, setPosition] = useState(0);

  const sumOfNonActiveSliders =
    onboardingDetails.budgetHotel +
    onboardingDetails.budgetFood +
    onboardingDetails.budgetOther +
    onboardingDetails.budgetTransport +
    onboardingDetails.budgetActivities -
    onboardingDetails[id];

  const remaining = onboardingDetails.budgetTotal - sumOfNonActiveSliders;

  const positionUpdate = (e) => {
    if (sliderError && e.target.value == remaining) {
      setSliderError(false);
    }

    //if selected value is less than or equal to remaining to allocate, update slider with value. else change thumb col
    if (remaining >= e.target.value) {
      setPosition(Number(e.target.value));
      //if selected value is equal to remaining to allocate, set thumb col to max
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
    <>
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
          <p className="budgetTotal">
            {onboardingDetails.budgetTotal}
            {onboardingDetails.homeCurrencySymbol}
          </p>
        </Stack>
        <Input
          value={position}
          size="small"
          onChange={positionUpdate}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
    </>
  );
};

//add aria stuff
