import { useState } from "react";
import styles from "../styles/header.module.scss";
import Image from 'next/image'
import { useRouter } from "next/router";
import Link from 'next/link'
import {FaBars, FaTimes} from 'react-icons/fa'

type HeaderListItem = {
  label: string;
  onClick: Function;
  customClass?: string;
};

export default () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const NAVBAR_ITEMS: HeaderListItem[] = [
    {
      label: "MarketPlace",
      onClick: (event: MouseEvent) => {
      },
    },
    {
      label: "Create",
      onClick: (event: MouseEvent) => {
      },
    },
  ];

  const MAINNET_DROPDOWN: HeaderListItem[] = [
    { label: 'Mainnet', onClick: (event: MouseEvent) => { console.log("Testnet clicked.."); setIsDropdownOpen(false) } }
  ]

  return (
    <>
      <div className={`${styles.headerContainer}`}>
        <div style={{ marginLeft: '17px' }}>
          <Link href="/"><img style={{ cursor: "pointer" }} src="/logo1.svg" alt="A" width={'32px'} height={'46px'} /></Link>
        </div>
        <div className={styles.divider}></div>
        {/* Mainnet Dropdown */}
        <div
          className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            className={`${styles.dropdownTrigger}`}
            onClick={() => setIsDropdownOpen(true)}
          >
            <Image src="/logo.svg" alt="A" width={'24px'} height={'24px'} />
            Testnet
            <Image src="/down-arrow.svg" alt="A" width={'16px'} height={'8px'} />
          </div>
          {(isDropdownOpen) &&
            <ul>
              {MAINNET_DROPDOWN.map((item, index) => (
                <li key={index} className={`${styles.dropdownItem}`} onClick={(e) => item.onClick(e)}>
                  {item.label}
                </li>
              ))}
            </ul>}
        </div>
        <div className={styles.divider}></div>
        {/* Navbar Links */}
        <ul>
          <Link href={"/"}>
            <li /* onClick={(event) => item.onClick(event)} */ className={''}>
              Home
            </li>
          </Link>
        </ul>
        <ul>
          <Link href={ "/vault/0x3acdb97d5fc69eeb39ba3517754372c88ccdcc8563d7c49636fde0b0a8f93da"}>
            <li className={''}>
              Staking
            </li>
          </Link>
        </ul>
        <ul>
          {NAVBAR_ITEMS.map((item, index) => (
            <Link href={"/" + item.label.toLowerCase()}>
              <li key={index} className={item.customClass ?? ''}>
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className={`${styles.headerContainerMobile}`}>
          <Link href="/"><img style={{ cursor: "pointer" }} src="/logo1.svg" alt="A" width={'32px'} height={'46px'} /></Link>
          <div onClick={() => setIsSidebarOpen(true)}><FaBars /></div>
      </div>

      <aside className={styles.sidebarcontainer}
          style={{
            opacity: isSidebarOpen ? '100%' : '0',
            top: isSidebarOpen ? '0' : '-100%'
          }}>
        <div className={styles.icon} onClick={() => setIsSidebarOpen(false)}>
            <FaTimes/>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.menu}>
              <Link href={"/"}>
                <div className={styles.link} onClick={() => setIsSidebarOpen(false)}>Home</div>
              </Link>
              <Link href={"/vault/0x3acdb97d5fc69eeb39ba3517754372c88ccdcc8563d7c49636fde0b0a8f93da"}>
                <div className={styles.link} onClick={() => setIsSidebarOpen(false)}>Staking</div>
              </Link>
              <Link href={"/marketplace"}>
                <div className={styles.link} onClick={() => setIsSidebarOpen(false)}>Marketplace</div>
              </Link>
            </div>
        </div>
      </aside>
    </>
  );
};