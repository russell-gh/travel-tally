import Image from "./Image";

const CategoryIcon = ({ category }) => {
  return (
    <div className="containerIcon">
      <Image src={`../src/img/${category}.svg`} alt={`${category}Icon icon`} />
    </div>
  );
};

export default CategoryIcon;
