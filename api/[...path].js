export default function handler(req, res) {
  const requested = req.url || "";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(404).send(
    JSON.stringify(
      {
        error: "not_found",
        message: `No API endpoint exists at ${requested}.`,
        hint: "Flare Vault has no public API. See https://flarevaultapp.xyz/openapi.json for what is available and https://flarevaultapp.xyz/llms.txt for a guide.",
        docs: "https://flarevaultapp.xyz/openapi.json",
      },
      null,
      2
    )
  );
}
