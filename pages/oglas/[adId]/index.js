import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/AdView.module.css";
import DeletedAd from "./deletedAd";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../Redux/adsSlice";

export default function AdView({ ad, isDeleted }) {
  const favorites = useSelector((state) => state.ads.favorites);
  const dispatch = useDispatch();

  const addOrRemoveFromFavorites = () => {
    dispatch(toggleFavorite(ad.ad_id));
  };

  if (isDeleted) {
    return (
      <>
        <Head>
          <title>Oglas je obrisan</title>
        </Head>

        <header>
          <img src="/logo.svg" alt="logo" />
        </header>
        <DeletedAd> </DeletedAd>
      </>
    );
  }

  return (
    <>
      <div className="wrapper">
        <Head>
          <title>Otvoren oglas</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <img src="/logo.svg" alt="logo" />
        </header>

        <main className={styles.main}>
          <Link className={styles.back} href="/">
            &lt; Nazad na listu
          </Link>
          <section className={styles.ad}>
            <div className={styles.image}>
              <img
                className={styles.image}
                src={`https://kupujemprodajem.com${ad.photo1_tmb_300x300}`}
                alt="thumbnail"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../placeholder.png";
                }}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.AdName}> {ad.name}</div>
              <div className={styles.price}>
                {" "}
                {ad.price} {ad.currency}
              </div>
            </div>
            <div className={styles.star} onClick={addOrRemoveFromFavorites}>
              <img
                style={{ width: "22.5px", height: "22.5px" }}
                src={
                  favorites.includes(ad.ad_id)
                    ? "../filledStar.png"
                    : "../star.png"
                }
              />{" "}
            </div>
          </section>

          <section className={styles.description}>
            <div>
              <span
                style={{
                  color: "#A2A2A2",
                  width: "80px",
                  display: "inline-block",
                  fontSize: "14px",
                }}
              >
                Kategorija:
              </span>
              <span style={{ color: "#003268", fontSize: "14px" }}>
                {" "}
                {ad.category_name} &gt; {ad.group_name}{" "}
              </span>
            </div>
            <div>
              {" "}
              <span
                style={{
                  color: "#A2A2A2",
                  width: "80px",
                  display: "inline-block",
                  fontSize: "14px",
                }}
              >
                Lokacija:{" "}
              </span>
              <span style={{ color: "black", fontSize: "14px" }}>
                {" "}
                {ad.location_name}{" "}
              </span>{" "}
            </div>
          </section>

          <div className={styles.moreInformations}>{ad.description}</div>
          <section className={styles.gallery}>
            <img
              className={styles.gallery}
              src={`https://kupujemprodajem.com${ad.photo_path1}`}
              alt="gallery"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "../placeholder.png";
              }}
            />
          </section>
        </main>

        <footer className={styles.footer}>
          KupujemProdajem © 2022 All rights reserved
        </footer>
      </div>
    </>
  );
}

AdView.getInitialProps = async ({ query }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/ad/${query.adId}`);

    if (!res.ok) {
      if (res.status === 404) {
        return { ad: null, isDeleted: true };
      }
      throw new Error(`Failed to fetch ad. Status: ${res.status}`);
    }

    const ad = await res.json();
    return { ad, isDeleted: false };
  } catch (error) {
    console.error("Error fetching ad:", error);
    return { ad: null, isDeleted: false };
  }
};
