import React from "react";
import styles from "../../../styles/DeletedAd.module.css";
import Link from "next/link";

function DeletedAd() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Link className={styles.back} href="/">
            &lt; Nazad na listu
          </Link>

          <section className={styles.ad}>
            <img
              className={styles.image}
              style={{
                width: "96px",
                height: "90px",
                borderRadius: "1px",
                color: "#E0E7EF",
              }}
              src="/placeholder.png"
              alt="logo"
            />
            <div className={styles.details}>
              <div className={styles.AdName}> Oglas je obrisan</div>
            </div>
            <div className={styles.star}>
              {" "}
              <img
                className={styles.star}
                src="../starNonClickable.png"
                alt="star"
              />
            </div>
          </section>
        </main>
      </div>
      <footer className={styles.footer}>
        KupujemProdajem © 2022 All rights reserved
      </footer>
    </>
  );
}

export default DeletedAd;
