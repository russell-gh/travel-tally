import { useDispatch, useSelector } from "react-redux";
import FormElement from "../../reusable-code/FormElement";
import { toggleHide, selectHidePaidSplitBills } from "../../redux/homeSlice";

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
            toggleHide({
              value: e.target.checked,
              key: "hidePaidSplitBills",
            })
          );
        }}
      />
    </div>
  );
};

export default ShowPaidSplitBills;
