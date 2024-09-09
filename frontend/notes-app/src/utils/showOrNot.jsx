function ShowOrNot({ children, data }) {
  return <div>{data?.length > 0 ? children : null}</div>;
}

export default ShowOrNot;
