"use client";

import React, { useEffect, useRef, useState } from "react";
import Login from "./login";
import Register from "./register";
import SideBox from "./sideBox";

type Props = {};

const Tabs = (props: Props) => {
  const [state, setState] = useState({
    isLoginActive: true,
  });

  const sideBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);

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
    } else {
      console.error("sideBoxRef is not assigned to a DOM element");
    }
  };

  useEffect(() => {
    if (sideBoxRef.current) {
      sideBoxRef.current.classList.add("right");
    } else {
      console.error("sideBoxRef is not assigned to a DOM element");
    }
  }, []);

  return (
    <>
      <div
        className="flex bg-white relative z-20 h-full w-full py-4 px-2 shadow-lg rounded"
        ref={containerRef}
      >
        {state.isLoginActive ? (
          <Login containerRef={(ref: any) => (containerRef.current = ref)} />
        ) : (
          <Register containerRef={(ref: any) => (containerRef.current = ref)} />
        )}
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
