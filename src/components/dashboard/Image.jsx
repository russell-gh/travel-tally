const Image = ({ src, alt, onClick }) => {
  return <img src={src} alt={alt} className={alt} onClick={onClick} />;
};

export default Image;
