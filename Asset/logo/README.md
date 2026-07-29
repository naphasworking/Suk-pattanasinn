# โลโก้ / Logo

โลโก้ถูกไดคัทออกจากพื้นหลังสีเขียวเรียบร้อยแล้ว
The logo has already been die-cut off its green backdrop.

| ไฟล์ / File | ใช้ที่ / Used where | ขนาด / Size |
|---|---|---|
| `logo.png` | ต้นฉบับไดคัท สีทอง โปร่งใส / master cut, gold, transparent | 1028×1013 |
| `logo@700.png` | สำรองขนาดกลาง / mid-size spare | 700×690 |
| `logo-nav.png` | **สีทอง** — ใช้บนพื้นเข้ม (ส่วนติดต่อเรา) / **gold**, for dark sections | 162×160 |
| `logo-dark-nav.png` | **สีเขียว** — ใช้บนพื้นครีม (แถบเมนู) / **emerald**, for the cream nav | 162×160 |
| `337278615_...jpg` | ไฟล์ต้นฉบับที่ลูกค้าส่งมา / the client's original | 1741×1742 |

## ทำไมต้องมีสองสี / Why two colours

โลโก้สีทองบนพื้นครีมมีค่าคอนทราสต์เพียง **1.66 : 1** — มองแทบไม่เห็น
จึงทำเวอร์ชันสีเขียวแบรนด์สำหรับพื้นสว่าง ได้ **8.80 : 1** อ่านชัด
ส่วนสีทองใช้บนพื้นเขียวเข้ม ได้ **6.96 : 1**

The gold mark on cream measures only **1.66 : 1** contrast — effectively
invisible. An emerald version was derived for light backgrounds at **8.80 : 1**,
and the gold is used on the dark emerald block where it reaches **6.96 : 1**.

เวอร์ชันสีเขียวสร้างจากการแมปค่าความสว่างของเส้นทองไปบนช่วงสีเขียวแบรนด์
รายละเอียดรอยแปรงและขอบ anti-alias ยังอยู่ครบ

The emerald version maps the gold strokes' luminance onto the brand green ramp,
so all the brush texture and anti-aliased edges survive intact.

## คุณภาพการไดคัท / Cut quality

- พื้นหลังต้นฉบับเรียบมาก (`#2b5a5c`, ผันแปรเพียง 0–4 ต่อช่องสี)
  The source backdrop was very flat (`#2b5a5c`, varying only 0–4 per channel).
- ขอบ anti-alias ถูกคำนวณย้อนกลับด้วยสมการ matte (`F = B + (P−B)/α`)
  จึงไม่มีขอบเขียวติดมาเมื่อวางบนพื้นสีอื่น
  Edges were un-premultiplied with the matte equation so no green fringe
  survives when the mark sits on a different background.
- เหลือพิกเซลที่ปนสีเขียวเพียง **0.68%** ของขอบทั้งหมด
  Only **0.68%** of edge pixels retain any green contamination.

---

## ถ้ามีไฟล์ AI / SVG ต้นฉบับ / If a vector original exists

ขอไฟล์ `.ai`, `.eps` หรือ `.svg` จากลูกค้าจะดีที่สุด แล้ววางเป็น `logo.svg`
เพราะจะคมทุกขนาดและไฟล์เล็กกว่ามาก — PNG ที่ไดคัทมาเป็นทางแก้เมื่อไม่มีเวกเตอร์

Ask the client for the `.ai`, `.eps` or `.svg` master and save it as `logo.svg` —
it will be sharp at any size and far smaller. The die-cut PNG is the fallback
for when no vector is available.
