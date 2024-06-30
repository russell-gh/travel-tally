import { useState } from "react";
import FormElement from "../FormElement";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions";
import { useDispatch, useSelector } from "react-redux";
import { selectTrip } from "../../redux/onboardingSlice";
import { addTrip } from "../../redux/onboardingSlice";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({});

  const trip = useSelector(selectTrip);
  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    setOnboardingDetails({ ...onboardingDetails, [id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let _onboardingDetails = onboardingDetails;
    let startDate = _onboardingDetails.startDate;
    let endDate = _onboardingDetails.endDate;
    // const dates = [startDate, endDate].map((date) => {
    //   date = date.split("-");
    //   date = new Date(date[0], date[1]-1, date[2])
    //   return date;
    // });
    // _onboardingDetails = {..._onboardingDetails, startDate: dates[0], endDate:dates[1]}

    dispatch(addTrip(_onboardingDetails)); //send through original or timestamp as string as Date objs can't be sent to store?
  };

  return (
    <div>
      <form className="onboardingForm">
        {onboardingQuestions.map((question) => {
          return (
            <FormElement
              key={question.id}
              type={question.type}
              id={question.id}
              label={question.label}
              name={question.name}
              options={question.options}
              callback={
                question.type === "button" ? handleSubmit : handleChange
              }
            />
          );
        })}
      </form>
    </div>
  );
};

export default Onboarding;
