import { useEffect, useState } from "react";
import FormElement from "../FormElement";
import "./Onboarding.css";
import { onboardingQuestions } from "./onboardingQuestions";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "../../redux/onboardingSlice";
import Joi from "joi";
import BudgetBreakdown from "./BudgetBreakdown";
import { selectTrip } from "../../redux/onboardingSlice";

const Onboarding = () => {
  const [onboardingDetails, setOnboardingDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const trip = useSelector(selectTrip); 


  useEffect(() => {
    validate();
  }, [onboardingDetails]);

  const schema = {
    destination: Joi.string().min(1).max(58).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
    budgetTotal: Joi.number().min(1).required(), //include max budget?
    homeCurrency: Joi.string().required(),
  };
  const validate = async () => {
    const _joi = Joi.object(schema);

    try {
      const result = await _joi.validateAsync(onboardingDetails);
      console.log(result);
      setValidated(true);
    } catch (e) {
      setValidated(false);
      console.log(e);
    }
  };

  const handleChange = (e, id) => {
    setOnboardingDetails({ ...onboardingDetails, [id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let _onboardingDetails = onboardingDetails;
    // let startDate = _onboardingDetails.startDate;
    // let endDate = _onboardingDetails.endDate;
    // const dates = [startDate, endDate].map((date) => {
    //   date = date.split("-");
    //   date = new Date(date[0], date[1]-1, date[2])
    //   return date;
    // });
    // _onboardingDetails = {..._onboardingDetails, startDate: dates[0], endDate:dates[1]}

    if (validated) {
      dispatch(addTrip(_onboardingDetails)); //send through original or timestamp as string as Date objs can't be sent to store?
      console.log("added to store");
      setVisible(true);
    } else {
      console.log("Check all fields have been inputted correctly");
    }
  };
console.log(trip)
  return (
    <div>
      <form>
        {onboardingQuestions.map((question) => {
          return (
            <FormElement
              key={question.id}
              type={question.type}
              id={question.id}
              label={question.label}
              name={question.name}
              options={question.options}
              defaultValue={question.defaultValue}
              callback={
                question.type === "button" ? handleSubmit : handleChange
              }
            />
          );
        })}
      </form>
      <BudgetBreakdown trip={trip}/>
      {/* {trip ? <BudgetBreakdown trip={trip} /> : ""}  */}
    </div>
  );
};

export default Onboarding;
