import Image from "./Image";

const CategoryIcon = ({ category }) => {
  return (
    <div className="containerIcon">
      <Image src={`/${category.toLowerCase()}.svg`} alt={`${category}Icon icon`} />
    </div>
  );
};

export default CategoryIcon;
