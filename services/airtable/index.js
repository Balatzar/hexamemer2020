const fs = require("fs");
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export async function createVote(memeId, note) {
  if (process.env.AIRPLANE_MODE == 1) {
    return true;
  }

  const res = await base("Votes").create([
    {
      fields: {
        Meme: [memeId],
        Note: note,
      },
    },
  ]);

  return res;
}

export async function fetchMemes() {
  if (process.env.AIRPLANE_MODE == 1) {
    return JSON.parse(fs.readFileSync("services/airtable/data.json"));
  }
  const memes = [];
  await base("Memes")
    .select({
      maxRecords: 100,
      view: "Data",
      sort: [{ field: "Random", direction: "asc" }],
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        memes.push({ id: record.id, image: record.get("Image") });
      });
      fetchNextPage();
    });
  // fs.writeFileSync(
  //   "services/airtable/data.json",
  //   JSON.stringify(memes),
  //   "utf8"
  // );

  return memes;
}
