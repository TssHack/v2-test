import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const fancyName = "𝗘𝗵𝘀𝗮𝗻";
const specialName = "Telegram; @abj0o";

async function getMergedProxies() {
  const urls = [
    "https://dev1.irdevs.sbs/",
    "https://nextjs.irdevs.sbs/"
  ];

  // گرفتن داده‌ها
  const results = await Promise.all(urls.map(url => fetch(url).then(r => r.text())));
  let merged = results.join("\n").trim();

  // جدا کردن لینک‌ها در آرایه
  let lines = merged.split("\n").filter(l => l.trim() !== "");

  // انتخاب رندوم یک سرویس برای specialName
  const randomIndex = Math.floor(Math.random() * lines.length);

  // تغییر اسم سرویس‌ها
  lines = lines.map((line, index) => {
    return line.replace(/(#%[0-9A-Fa-f]+%[0-9A-Fa-f]+)([^#\n]*)/, (_, emoji) => {
      if (index === randomIndex) {
        return `${emoji} ${specialName}`;
      }
      return `${emoji} ${fancyName}`;
    });
  });

  return lines.join("\n");
}

app.get("/", async (req, res) => {
  try {
    const output = await getMergedProxies();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(output);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching or processing data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
