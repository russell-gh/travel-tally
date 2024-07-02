import Image from "./Image";

const CategoryIcon = ({ category }) => {
  return (
    <Image src={`../src/img/${category}.svg`} alt={`${category}Icon icon`} />
  );
};

export default CategoryIcon;
