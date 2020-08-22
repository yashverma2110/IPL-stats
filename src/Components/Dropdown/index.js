import React, { useState, useEffect } from "react";
import "./index.css";

export const Dropdown = (props) => {
  const [value, setValue] = useState(props.curr);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    var list = [];
    for (var i = 0; i < props.data.length; i++) {
      if (!list.includes(props.data[i][props.field].toString()))
        list.push(props.data[i][props.field].toString());
    }
    list.sort();
    setData(["ALL", ...list]);
  }, [props.data, props.field]);

  return (
    <div className="ddown">
      <div className="ddown-sub">
        <span className="ddown-in" onClick={() => setShow(!show)}>
          {value}
          <img
            src="https://res.cloudinary.com/dxu5kynfp/image/upload/v1598084834/rentSwagz/down-arrow_ovfclz.svg"
            alt="ico"
            style={{ transform: `rotate(${show ? "180deg" : "0deg"})` }}
          />
        </span>
        <div
          className="ddown-list"
          style={{ transform: `scaleY(${show ? "1" : "0"})` }}
        >
          {data.map((e, i) => (
            <span
              className="ddown-item"
              key={i}
              onClick={() => {
                setShow(false);
                setValue(e);
                props.setVal(e);
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
