import Button from "../reusable-code/Button";
import Budget from "./Budget";
import Expenses from "./Expenses";
import Image from "./Image";
import Title from "./Title";
import Filter from "./filter/Filter";
import FilterDate from "./filter/FilterDate";
import Order from "./filter/order";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <Budget />
        <div className="controlsExpenses">
          <Filter />
          <Order />
          <FilterDate />
          <Button className="addExpense" text="Add an expense" />
        </div>
      </div>
      <Expenses />
    </div>
  );
};

export default Dashboard;
