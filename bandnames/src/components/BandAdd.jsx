import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      socket.emit("create-band", { name: value });
      setValue("");
    }
  };

  return (
    <>
      <h3>Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre banda"
          type="text"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
        />
      </form>
    </>
  );
};

export default BandAdd;
