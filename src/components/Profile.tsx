import React from "react";
import Image from "next/image";
import styles from "../styles/profile.module.scss";
import FakeImage from "./FakeImage";

function Profile() {
  const VAULT_UNDER_MANAGEMENT = [
    {
      name: "A vault name",
      percentage: "+1.34%",
    },
    {
      name: "A vault name",
      percentage: "+1.34%",
    },
  ];
  const VAULT_EXPOSED = [
    {
      name: "A vault name",
      percentage: "+1.34%",
    },
  ];

  return (
    <>
      <div className={styles.profileBackground}>
        <div>
          <Image width={"30px"} height={"30px"} src="/edit.svg" />
        </div>
      </div>
      <div style={{ margin: "180px 45px 0px", zIndex: "2" }}>
        <div className={styles.profileContainer}>
          <div className={styles.profilePicture}>
            <FakeImage
              height="220px"
              width="220px"
              fillColor="var(--color-secondary)"
              borderRadius="50%"
            ></FakeImage>
          </div>
          <div className={styles.profileInfo}>
            <div className="fw-500">
              <div className="fs-40 fw-600">
                Jake 21{" "}
                <Image src={"/verified.svg"} width="21px" height="22px" />
              </div>
              <div style={{ marginLeft: "50px" }}>
                105{" "}
                <span style={{ color: "var(--color-secondary)" }}>views</span>
              </div>
              <div style={{ marginLeft: "18px" }}>
                25{" "}
                <span style={{ color: "var(--color-secondary)" }}>
                  followers
                </span>
              </div>
            </div>
            <div>
              <div className="fs-24">0x231456u32</div>
              <div style={{ marginLeft: "65px", display: "flex", gap: "20px" }}>
                <div>
                  <Image
                    src={"/twitter.svg"}
                    width="21px"
                    height="21px"
                  ></Image>
                </div>
                <div>
                  <Image
                    src={"/linkedin.svg"}
                    width="21px"
                    height="21px"
                  ></Image>
                </div>
                <div>
                  <Image
                    src={"/telegram.svg"}
                    width="17px"
                    height="21px"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fs-20" style={{ lineHeight: "21px" }}>
          Born during the crypto boom, I am now a professional trader. Day
          trader / Scalper, I work full time to offer you the best returns.
        </div>
        <div style={{ marginTop: "15px" }}>
          <div className="fs-35 fw-600">Statistics</div>
          <div
            className="d-flex justify-content-center"
            style={{ gap: "36px" }}
          >
            <div className={`${styles.statisticsCard}`}>
              <div className={`${styles.iconContainer}`}>
                <Image src="/Vector.svg" width={"100%"} height={"100%"}></Image>
              </div>
              <div className="d-flex-column justify-content-space-between">
                <div
                  className="fs-20 fw-600"
                  style={{ color: "#C0C0C0", lineHeight: "24px" }}
                >
                  Personal Vault
                </div>
                <div className="fs-40 fw-600" style={{ lineHeight: "48px" }}>
                  3
                </div>
              </div>
            </div>
            <div className={`${styles.statisticsCard}`}>
              <div className={`${styles.iconContainer}`}>
                <Image
                  src="/Vector2.svg"
                  width={"100%"}
                  height={"100%"}
                ></Image>
              </div>
              <div className="d-flex-column justify-content-space-between">
                <div
                  className="fs-20 fw-600"
                  style={{ color: "#C0C0C0", lineHeight: "24px" }}
                >
                  PNL
                </div>
                <div className="fs-40 fw-600" style={{ lineHeight: "48px" }}>
                  $354
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.vaultContainer}`}>
          <div className={`${styles.vaultCard}`}>
            <div>
              <div className="fs-32 fw-600">Vault Under Management</div>
              {VAULT_UNDER_MANAGEMENT.slice(0, 2).map((vault, index) => (
                <div className={`${styles.vaultCardDetail}`}>
                  <FakeImage
                    width="60px"
                    height="60px"
                    fillColor="#0D0C1D"
                    borderRadius="50%"
                  ></FakeImage>
                  <div>{vault.name}</div>
                  <div style={{ marginLeft: "auto" }}>{vault.percentage}</div>
                </div>
              ))}
            </div>
            <button
              data-color="secondary"
              style={{ width: "130px", alignSelf: "flex-end" }}
            >
              See All
            </button>
          </div>
          <div className={`${styles.vaultCard}`}>
            <div>
              <div className="fs-32 fw-600">Vault Exposed</div>
              {VAULT_EXPOSED.slice(0, 2).map((vault, index) => (
                <div className={`${styles.vaultCardDetail}`}>
                  <FakeImage
                    width="60px"
                    height="60px"
                    fillColor="#0D0C1D"
                    borderRadius="50%"
                  ></FakeImage>
                  <div>{vault.name}</div>
                  <div style={{ marginLeft: "auto" }}>{vault.percentage}</div>
                </div>
              ))}
            </div>
            <button
              data-color="secondary"
              style={{ width: "130px", alignSelf: "flex-end" }}
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
