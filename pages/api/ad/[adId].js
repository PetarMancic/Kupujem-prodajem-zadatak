import { ads } from "../../../ads";

export default function handler(req, res) {
  const {
    query: { adId = "" },
  } = req;
  if (
    [
      "145679023",
      "145679022",
      "145679014",
      "145679004",
      "145679002",
      "145679001",
    ].includes(adId)
  ) {
    res.status(404).json({ error_code: "ad_deleted" });
  }
  const ad = ads.find((ad) => ad.ad_id === Number(adId));
  return ad
    ? res.status(200).json(ad)
    : res.status(404).json({ error_code: "not_found" });
}
