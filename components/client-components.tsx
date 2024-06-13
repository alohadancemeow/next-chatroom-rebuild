"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ClientComponents = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientComponents;
