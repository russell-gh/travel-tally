//dummy examples
import FormElement from "./FormElement";

const Form = () => {
    return ( 
        <form onSubmit={()=>{}}>
            <FormElement type="text" id="name" label="Enter your name here" name="name"/>
            <FormElement type="email" id="email" label="Enter your email here" name="email"/>
            <FormElement type="password" id="password" label="Enter your password here" name="password"/>
            <FormElement type="file" id="profile-pic" label="Choose a picture to upload" name="profile-pic"/>
            <FormElement type="date" id="startDate" label="Choose the start date of your trip" name="startDate" minDate={"2000-01-01"} maxDate={"2030-12-31"}/>
            <FormElement type="checkbox" id="t&cs" label="Check this box to confirm you have read and agree to the T's & C's" name="t&cs"/>
            <FormElement type="select" id="currency" label="Select your home currency from the dropdown below" name="currency" options={[{value:"GBP", name:"Great British Pounds"}, {value: "EUR", name:"Euros"}, {value: "USD", name:"United States Dollars"}]}/>
            <FormElement type="button"/>

        </form>
     );
}
 
export default Form;