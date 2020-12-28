import { createVote } from "../../../services/airtable";

const handler = async (req, res) => {
  try {
    const { id, vote } = JSON.parse(req.body);

    const resp = await createVote(id, vote);
    console.log(resp);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.warn(error);
    res.status(400).json(error);
  }
};

export default handler;
