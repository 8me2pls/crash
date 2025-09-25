export default function handler(req, res) {
  if (req.method === "POST") {
    const { embeds } = req.body;

    if (!embeds || !Array.isArray(embeds)) {
      return res.status(400).json({ error: "Embeds must be an array" });
    }

    const formatted = {
      embeds: embeds.map(embed => ({
        title: embed.title || null,
        description: embed.description || null,
        color: embed.color ? parseInt(embed.color.replace("#", ""), 16) : null,
        url: embed.url || null,
        footer: embed.footer ? { text: embed.footer } : null,
        image: embed.image ? { url: embed.image } : null,
      })),
    };

    return res.status(200).json(formatted);
  } else if (req.method === "GET") {
    try {
      const { data } = req.query;
      const parsed = JSON.parse(decodeURIComponent(data));
      return res.status(200).json(parsed);
    } catch {
      return res.status(400).json({ error: "Invalid embed data" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}