const Message = ({ className, message, classNameContainer }) => {
  return (
    <div className={classNameContainer}>
      <p className={className}>{message}</p>
    </div>
  );
};

export default Message;
