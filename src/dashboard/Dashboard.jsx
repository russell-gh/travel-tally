import Button from "../reusable-code/Button";
import Budget from "./Budget";
import Expenses from "./Expenses";
import Image from "./Image";
import Title from "./Title";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <Budget />
        <Button className="addExpense" text="Add an expense" />
      </div>
      <Expenses />
    </div>
  );
};

export default Dashboard;
