# ภาพผลงาน / Project images

**หนึ่งโปรเจกต์ = หนึ่งโฟลเดอร์** ภาพหน้าปกคือ `cover.jpg` ในแต่ละโฟลเดอร์
**One project = one folder.** The cover image is `cover.jpg` inside each.

```
projects/
├── chilldent-clinic/cover.jpg      ← Chill Dent Clinic
├── comkrit-eye-clinic/cover.jpg    ← Comkrit Eye Clinic
├── forfun-dental/cover.jpg         ← คลินิกทันตกรรมฟอฟัน
├── monday-dental/cover.jpg         ← Monday Dental Clinic
├── nana-dental/cover.jpg           ← คลินิกทันตกรรมนานา
└── work-sip-purr/cover.jpg         ← Work, Sip & Purr (คาเฟ่แมว)
```

แต่ละโฟลเดอร์มี 2 อย่าง / Each folder holds two things:

```
nana-dental/
├── cover.jpg     ← ภาพในตารางผลงาน / the card in the Work grid (1600×1200)
├── 01.jpg        ← แกลเลอรี ภาพที่ 1 (= ภาพเดียวกับ cover) / gallery shot 1
├── 02.jpg        ← ภาพที่ 2 …
└── 12.jpg
```

`cover.jpg` คือภาพที่โชว์ในตาราง — `01.jpg` ถึง `NN.jpg` คือแกลเลอรีที่เปิดขึ้นมา
เมื่อคลิกการ์ด เลื่อนดูทางขวาได้ พร้อมจุดบอกตำแหน่งใต้ขอบภาพ

`cover.jpg` is the grid thumbnail. `01.jpg`…`NN.jpg` are the gallery that opens
when the card is clicked — scrolled horizontally, with dot markers on the
image's lower edge. `01.jpg` is the same shot as the cover so the gallery opens
on the image the visitor just clicked.

## ⚠ เพิ่มภาพในแกลเลอรี / Adding a gallery image

วางไฟล์เลขถัดไป (เช่น `13.jpg`) **แล้วต้องแก้ `shots` ใน `script.js` ด้วย**
เว็บแบบ static อ่านรายชื่อไฟล์ในโฟลเดอร์เองไม่ได้ จึงต้องบอกจำนวนไว้ในโค้ด

Drop in the next number (e.g. `13.jpg`) **and bump `shots` in `script.js`.**
A static site cannot list a directory, so the count has to be declared. It is
the only number in the codebase that must be kept in sync by hand.

| โฟลเดอร์ / Folder | shots |
|---|---|
| `chilldent-clinic` | 7 |
| `comkrit-eye-clinic` | 10 |
| `forfun-dental` | 8 |
| `monday-dental` | 4 |
| `nana-dental` | 12 |
| `work-sip-purr` | 8 |

ภาพแกลเลอรีย่อเป็นกว้างไม่เกิน 1400px คุณภาพ 82% mozjpeg รวมทุกโฟลเดอร์ 3.78 MB
แต่โหลดทีละโครงการและโหลดแบบ lazy จึงไม่หนักตอนเปิดหน้าแรก

Gallery images are capped at 1400px wide, mozjpeg quality 82 — 3.78 MB across
all six, but only one project loads at a time and everything past the second
shot is lazy-loaded, so the landing page is unaffected.

## เปลี่ยนภาพหน้าปก / Changing a cover

วางไฟล์ `cover.jpg` ใหม่ทับของเดิม **ไม่ต้องแก้โค้ด**
ขนาดที่ดีที่สุดคือ 1600×1200 px ไม่เกิน 300 KB

Drop a new `cover.jpg` over the old one — **no code change needed.**
Best size is 1600×1200 px, under 300 KB.

โฟลเดอร์ต้นฉบับที่ลูกค้าส่งมา (ชื่อเดิม เช่น `NANA DENTAL CLINIC/`) ยังอยู่ครบ
ใช้เลือกภาพอื่นมาทำหน้าปกได้

The client's original folders (e.g. `NANA DENTAL CLINIC/`) are still here with
every photo, so another shot can be promoted to cover at any time.

---

## ชื่อและคำบรรยาย / Titles and captions

อยู่ในตัวแปร `PROJECTS` ที่ด้านบนของไฟล์ `script.js`
In the `PROJECTS` array at the top of `script.js`.

```js
{
    img: 'Asset/projects/nana-dental/cover.jpg',
    cat: 'dental',                 // dental | specialty | commercial
    th: { title: 'คลินิกทันตกรรมนานา', sub: 'คลินิกทันตกรรม · โทนขาวและฟ้าพาสเทล' },
    en: { title: 'Nana Dental Clinic', sub: 'Dental clinic · white and pastel blue' }
}
```

**⚠ คำบรรยายเขียนจากสิ่งที่เห็นในภาพเรนเดอร์เท่านั้น**
ยังไม่ได้ยืนยันทำเล ขนาดพื้นที่ จำนวนยูนิต หรือปีที่ทำ — ต้องถามลูกค้าก่อนเปิดเว็บ

**⚠ Captions were written from what is visible in the renders.**
Locations, floor areas, chair counts and dates are NOT confirmed — check with
the client before launch.

## เพิ่มหรือลบโปรเจกต์ / Adding or removing projects

- **เพิ่ม** — สร้างโฟลเดอร์ใหม่ วาง `cover.jpg` แล้วเพิ่ม object ในตัวแปร `PROJECTS`
  **Add** — new folder + `cover.jpg`, then one more object in `PROJECTS`.
- **ลบ** — ลบ object ออก ปุ่มกรองจะหายเองถ้าไม่เหลือผลงานในหมวดนั้น
  **Remove** — delete the object. Filter buttons vanish when a category empties.
