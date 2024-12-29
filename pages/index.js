import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, setAds } from "../Redux/adsSlice";

export default function Home({ ads }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.ads.favorites);
  const [adsWithImages, setAdsWithImages] = useState([]);

  useEffect(() => {
    const checkImageExists = async (url) => {
      const img = new Image();
      return new Promise((resolve) => {
        img.onload = () => {
          console.log(`Slika je pronadjena: ${url}`);
          resolve(true);
        };
        img.onerror = () => {
          console.log(`Slika nije pronadjena: ${url}`);
          resolve(false);
        };
        img.src = url;
      });
    };

    const fetchAdsImages = async () => {
      const updatedAds = await Promise.all(
        ads.map(async (ad) => {
          const imageUrl = `https://kupujemprodajem.com${ad.photo1_tmb_300x300}`;
          const imageExists = await checkImageExists(imageUrl);

          return {
            ...ad,
            imageUrl: imageExists ? imageUrl : "./placeholder.png",
          };
        })
      );
      setAdsWithImages(updatedAds);
    };

    fetchAdsImages();
  }, [ads]);

  const updateFavoriteStore = (adID) => {
    dispatch(toggleFavorite(adID));
  };

  return (
    <>
      <Head>
        <title>Oglasi</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <img src="/logo.svg" alt="logo" />
      </header>

      <main className={styles.main}>
        {adsWithImages.map((ad, index) => {
          console.log(ad.imageUrl);
          return (
            <Link href={`/oglas/${ad.ad_id}`} key={index} className={styles.ad}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${ad.imageUrl})`,
                }}
              />

              <div className={styles.details}>
                <div className={styles.name}>{ad.name}</div>
                <div className={styles.price}>
                  {ad.price} {ad.currency}
                </div>
              </div>

              <div
                className={styles.star}
                onClick={(event) => {
                  event.preventDefault();
                  updateFavoriteStore(ad.ad_id);
                }}
              >
                {" "}
                <img
                  src={
                    favorites.includes(ad.ad_id)
                      ? "./filledStar.png"
                      : "./star.png"
                  }
                  style={{ width: "22.5px", height: "22.5px" }}
                  alt="star"
                />{" "}
              </div>
            </Link>
          );
        })}
      </main>

      <footer className={styles.footer}>
        KupujemProdajem © 2022 All rights reserved
      </footer>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/ads");
  const ads = await res.json();
  return { ads };
};
