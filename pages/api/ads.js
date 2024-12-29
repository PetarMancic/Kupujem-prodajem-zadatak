import { ads } from "../../ads";

export default function handler(req, res) {
  res.status(200).json(ads);
}
