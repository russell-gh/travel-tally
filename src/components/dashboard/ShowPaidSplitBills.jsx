import { useDispatch, useSelector } from "react-redux";
import FormElement from "../../reusable-code/FormElement";
import { toggleDisplay, selectHidePaidSplitBills } from "../../redux/homeSlice";

const ShowPaidSplitBills = () => {
  const dispatch = useDispatch();
  const hidePaidSplitBills = useSelector(selectHidePaidSplitBills);

  return (
    <div className="hidePaidSplitBills">
      <FormElement
        type="checkbox"
        id="hidePaidSplits"
        label="hide paid splits"
        checked={hidePaidSplitBills}
        callback={(e) => {
          dispatch(
            toggleDisplay({
              value: e.target.checked,
              key: "hidePaidSplitBills",
            })
          );
        }}
        typed={true}
      />
    </div>
  );
};

export default ShowPaidSplitBills;
