# ภาพหน้าแรก / Hero image

ไฟล์ที่เว็บใช้คือ **`hero.jpg`** เท่านั้น
The site uses **`hero.jpg`** and nothing else in this folder.

| ไฟล์ / File | คืออะไร / What it is |
|---|---|
| `hero.jpg` | ภาพปกแบรนด์ที่ลูกค้าส่งมา (1682×640) — **กำลังใช้อยู่** / the client's brand cover art, **currently live** |
| `hero-render-alt.jpg` | ภาพเรนเดอร์ Chill Dent (2000×1063) — ทางเลือกสำรอง / Chill Dent render, kept as an alternative |

## สลับสองภาพนี้ / Switching between them

```
เปลี่ยนชื่อไฟล์สลับกัน แล้วแก้ .ph-hero ใน style.css:
Rename the two files, then edit .ph-hero in style.css:

  ภาพปกแบรนด์ / brand cover art  →  aspect-ratio: 1682 / 640;  object-fit: contain;
  ภาพถ่าย-เรนเดอร์ / a photograph →  aspect-ratio: 16 / 8.5;    object-fit: cover;
```

## ข้อสังเกตเรื่องภาพปกแบรนด์ / A note on using the cover art

ภาพนี้มีโลโก้และคำว่า MINIMAL / JAPANESE / CLINIC / LUXURY อยู่ในตัวภาพแล้ว
ซึ่งซ้ำกับโลโก้บนแถบเมนู และซ้ำกับแถบ Minimal · Japanese · Clinic · Luxury ที่อยู่ถัดลงไป
ถ้าจะใช้ภาพนี้เป็นหลัก แนะนำให้ลบแถบสไตล์ด้านล่างออก (ส่วน `<section class="styles">`)

This artwork already contains the logo and the words MINIMAL / JAPANESE /
CLINIC / LUXURY. Those repeat the nav logo and the style strip further down the
page. If the cover art stays as the hero, consider deleting the
`<section class="styles">` block so the four words appear once, not twice.

ข้อจำกัดอีกข้อ: ตัวหนังสือถูก "อบ" มาในภาพ จึงแปลเป็นภาษาอังกฤษไม่ได้
และบนจอมือถือจะอ่านยาก — CSS จึงเพิ่มความสูงและครอปเข้าหาฝั่งภาพเมื่อจอแคบกว่า 700px

One other limit: the text is baked into the pixels, so it cannot switch to
English with the rest of the site, and it gets hard to read on a phone. The CSS
compensates below 700px by increasing the height and cropping toward the photo
side of the artwork.

---

## ถ้าจะใช้ภาพถ่ายจริงในอนาคต / If you switch to a real photograph

| | |
|---|---|
| **สัดส่วน / Ratio** | 16 : 8.5 (แนวนอน / landscape) |
| **ขนาด / Recommended** | 2000 × 1063 px |
| **ขนาดไฟล์ / File size** | ไม่เกิน 400 KB / under 400 KB |

เลือกผลงานที่ดีที่สุด ถ่ายตอนกลางวัน เห็นพื้นที่เต็ม ๆ ให้จุดสนใจอยู่กลางภาพ
Use the strongest finished project, daylight, full space in frame, subject centred.
