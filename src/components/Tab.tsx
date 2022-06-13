import React, { PropsWithChildren } from "react";

type TabProps = {
  label: string;
  id: string;
  cbFn?: Function;
};

const Tab = (props: PropsWithChildren<TabProps>) => {
  return <>{ props.children }</>;
};

export default Tab;
