import React from "react";
import { useSelector } from "react-redux";
import Request from "./Request";

const Requests = () => {
  const { requests } = useSelector((store) => store.connectionRequest);

  return (
    <div className="w-full md:w-3/4 xl:w-full mx-auto px-3 py-3 md:px-5">
      {requests && requests.length === 0 && <div>No request</div>}
      {requests &&
        requests.map((request, idx) => (
          <Request request={request} key={request._id} idx={idx} />
        ))}
    </div>
  );
};

export default Requests;
