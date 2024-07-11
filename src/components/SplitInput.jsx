import React from 'react';
import FormElement from '../reusable-code/FormElement';
import { useState } from 'react';

const SplitInput = ({amount, tag, parentCallback}) => {
    const [formData, setFormData] = useState({
      });

    const dataInput = (e) => {
        let target = e.target.name;
        let value;
        
        if (e.target.type === 'checkbox') {
           value = e.target.checked;
        } else {
            value = e.target.value;
        }
    
        setFormData({ ...formData, [target]: value });
        parentCallback(formData, tag);
        console.log(formData, 'Component')
        
      };
    return <>
    <FormElement
        type={"text"}
        label={"Name"}
        name={'name'}
        id={'nameSplit' + tag}
        // error={errors["description"]}
        // list={"descriptionOptions"}
        callback={dataInput}
      />
       <FormElement
          type={"number"}
          label={"Amount"}
          name={`amount`}
          id={`splitAmount` + tag}
          minValue={0}
          maxValue={amount}
        //   error={errors["amount"]}
          callback={dataInput}
        />
        <FormElement
          type={"checkbox"}
          label={"Paid"}
          name={`paid`}
          id={`paidCheck` + tag}
          callback={dataInput}
        />
      
      </>;
}
 
export default SplitInput;