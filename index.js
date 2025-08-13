// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// نام پیش‌فرض همه سرویس‌ها
const fancyName = "𝙀𝙃𝙎𝘼𝙉 🇩🇪";
// نام ویژه برای یک سرویس
const specialName = "Telegram; @abj0o";

async function getMergedProxies() {
  const urls = [
    "https://dev1.irdevs.sbs/",
    "https://nextjs.irdevs.sbs/"
  ];

  // گرفتن داده‌ها از هر دو URL
  const results = await Promise.all(urls.map(url => fetch(url).then(r => r.text())));
  let merged = results.join("\n").trim();

  // تقسیم به خطوط
  let lines = merged.split("\n").filter(l => l.trim() !== "");

  // انتخاب یک سرویس رندوم
  const randomIndex = Math.floor(Math.random() * lines.length);

  // تغییر نام سرویس‌ها
  lines = lines.map((line, index) => {
    // حذف هر چیزی بعد از # و جایگزینی با نام جدید
    if (index === randomIndex) {
      return line.replace(/#.*/, `#${specialName}`);
    } else {
      return line.replace(/#.*/, `#${fancyName}`);
    }
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
