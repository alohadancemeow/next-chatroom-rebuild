"use client";

import React, { useEffect, useRef, useState } from "react";
import Login from "./login";
import Register from "./register";
import SideBox from "./sideBox";

const Tabs = () => {
  const [state, setState] = useState({
    isLoginActive: true,
  });

  const sideBoxRef = useRef<HTMLDivElement>(null);
  const current = state.isLoginActive ? "Register" : "Login";

  /**
   * The handleChange function toggles the position of a side box element and updates the state to
   * switch between login and registration views.
   */
  const handleChange = () => {
    if (sideBoxRef.current) {
      if (state.isLoginActive) {
        sideBoxRef.current.classList.remove("right");
        sideBoxRef.current.classList.add("left");
      } else {
        sideBoxRef.current.classList.remove("left");
        sideBoxRef.current.classList.add("right");
      }

      setState({
        ...state,
        isLoginActive: !state.isLoginActive,
      });
    }
  };

  useEffect(() => {
    if (sideBoxRef.current) {
      sideBoxRef.current.classList.add("right");
    }
  }, []);

  return (
    <>
      <div className="flex bg-white relative z-20 h-full w-full py-4 px-2 shadow-lg rounded">
        {state.isLoginActive ? <Login /> : <Register />}
      </div>

      <SideBox
        current={current}
        containerRef={sideBoxRef}
        onClick={handleChange}
      />
    </>
  );
};

export default Tabs;
