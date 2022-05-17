import React, { PropsWithChildren, ReactChild, ReactNode } from "react";
import styles from "~/styles/tabs.module.scss";

type TabsProps = {
  activeTab: string;
  children: Array<JSX.Element>;
  customClass?: string;
};

const Tabs = (props: PropsWithChildren<TabsProps>) => {
  const [activeTab, setActiveTab] = React.useState<string>(props.activeTab);

  const changeTab = (id: string, cb?: Function) => {
    setActiveTab(id);
    if (cb) cb();
  };
  return (
    <>
      <div className={`${styles.tabContainer} ${props.customClass ?? ""}`}>
        <div className={`${styles.tabHeader}`}>
          {props.children.map((child, index) => (
            <button
              key={index}
              data-color={
                child.props.id === activeTab ? "secondary" : "primary"
              }
              onClick={() =>
                child.props.cbFn === undefined
                  ? changeTab(child.props.id)
                  : changeTab(child.props.id, child.props.cbFn)
              }
            >
              {child.props.label}
            </button>
          ))}
        </div>
        <div className={`${styles.tabContent}`}>
          {props.children.map((child) =>
            child.props.id === activeTab ? child : undefined
          )}
        </div>
      </div>
    </>
  );
};

export default Tabs;
