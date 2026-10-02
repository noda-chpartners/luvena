export const site = {
  name: "Luvena～luna Venus～",
  nameEn: "Luvena",
  nameSub: "luna Venus",
  description:
    "大阪・天満橋駅徒歩4分。完全予約制・1席のプライベートヘッドスパ Luvena～luna Venus～。平日・土日祝ともに24時間。女性限定の温活リセットもご用意しています。",
  phoneDisplay: "070-9443-5678",
  phoneTel: "07094435678",
  postal: "540-0033",
  region: "大阪府",
  locality: "大阪市中央区",
  street: "石町2-3-13",
  building: "THE CLASSIC TEMMABASHI 202",
  station: "天満橋駅",
  walk: "徒歩4分",
  hoursWeekday: "24時間",
  hoursHoliday: "24時間",
  closed: "不定休",
  seats: "1席",
  instagram: "https://www.instagram.com/luvena_headspa/",
  instagramHandle: "@luvena_headspa",
  line: "https://lin.ee/XR2nTuh",
} as const;

export const mapQuery = `${site.locality}${site.street} ${site.building}`;

export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`;

export function yen(price: number) {
  return `¥${price.toLocaleString("ja-JP")}`;
}

export const courses = [
  {
    minutes: 60,
    name: "スタンダード",
    price: 6000,
    text: "初めての方に。頭をゆるめ、ひと息つくための基本のコースです。",
  },
  {
    minutes: 75,
    name: "オーダーメイド",
    price: 10000,
    text: "その日の調子に合わせて組み立てる、75分のヘッドスパです。",
  },
  {
    minutes: 90,
    name: "プレミアム",
    price: 13000,
    text: "時間の余白をたっぷり取った、90分のコースです。",
  },
  {
    minutes: 120,
    name: "ラグジュアリー",
    price: 25000,
    text: "いちばん長く、深く沈むための120分です。",
  },
] as const;

export const special = {
  minutes: 135,
  name: "温活リセット",
  price: 15000,
  badge: "女性限定",
  text: "よもぎ蒸し60分とドライヘッドスパ75分。身体を温め、心と身体を深く休める女性専用のセットコースです。",
} as const;
