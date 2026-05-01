export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  images: string[];
  provenance: string;
  isBestSeller: boolean;
}

export interface BrandCategory {
  name: string;
  products: Product[];
}

export interface Brand {
  name: string;
  subtitle: string;
  categories: BrandCategory[];
}

function generateId(brand: string, name: string) {
  return `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getProvenance(brand: string, name: string): string {
  if (brand === "Balenciaga") {
    return `Una pieza icónica del archivo de Demna Gvasalia. Su proporción y deconstrucción alteran la silueta clásica, creando una presencia post-apocalíptica.`;
  }
  if (brand === "Rick Owens") {
    return `Parte fundamental del ethos brutalista del "Lord of Darkness". Diseño arquitectónico que fusiona decadencia gótica y elegancia etérea.`;
  }
  if (brand === "Maison Margiela") {
    return `El legado de la invisibilidad y la deconstrucción. Cada costura revela la belleza de lo incompleto, reinterpretando la sastrería clásica.`;
  }
  return `Un artefacto cultural de archivo. Subvierte las expectativas del streetwear tradicional con su rareza y corte distintivo.`;
}

// Generate placeholder images that fit the heavenly streetwear aesthetic
const placeholderImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542841791-1925b02a2bf8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579310962131-aa21f240d986?auto=format&fit=crop&q=80&w=800",
];

const getPlaceholder = (index: number) =>
  placeholderImages[index % placeholderImages.length];

const getProductImages = (
  brand: string,
  category: string,
  product: string,
  extension: string = "jpg",
) => {
  const brandFolder = brand === "Balenciaga" ? "Balenciaga y2k" : brand;
  // Handle some specific extensions or folder naming differences if needed
  const images = [];
  for (let i = 1; i <= 5; i++) {
    images.push(`/${brandFolder}/${category}/${product}/${i}.${extension}`);
  }
  return images;
};

const imageMap: Record<string, string[]> = {
  "Balenciaga x Adidas Backpack": getProductImages(
    "Balenciaga",
    "Backpack",
    "Balenciaga x Adidas Backpack",
  ),
  "Adidas Sleeves Zip Up": getProductImages(
    "Balenciaga",
    "Hoodies",
    "Adidas Sleeves Zip Up",
  ),
  "Logo Recto Grande": getProductImages(
    "Balenciaga",
    "Hoodies",
    "Logo recto grande",
  ),
  "Cammo Cut": getProductImages("Balenciaga", "Pants", "Cammo Cut"),
  "Cut Up": [
    "/Balenciaga y2k/Pants/Cut Up/2.avif",
    "/Balenciaga y2k/Pants/Cut Up/1.avif",
    "/Balenciaga y2k/Pants/Cut Up/3.avif",
  ],
  Darkwave: getProductImages("Balenciaga", "Shirts", "Darkwave"),
  Tribal: getProductImages("Balenciaga", "Shirts", "Tribal"),
  "3XL": getProductImages("Balenciaga", "Shoes", "3XL", "webp"),
  Alaska: getProductImages("Balenciaga", "Shoes", "Alaska", "png"),
  "Chrome 1": [
    "/Converse/Shoes/Chrome 1/1.jpg",
    "/Converse/Shoes/Chrome 1/2.jpg",
    "/Converse/Shoes/Chrome 1/3.jpg",
    "/Converse/Shoes/Chrome 1/4.webp",
    "/Converse/Shoes/Chrome 1/5.jpg",
  ],
  "Chrome Leather Black": getProductImages(
    "Converse",
    "Shoes",
    "Chrome Leather Black",
  ),
  Futures: [
    "/Maison Margiela/Shoes/Futures/White/1hbR2r.jpg",
    "/Maison Margiela/Shoes/Futures/White/2Pkwxk.jpg",
    "/Maison Margiela/Shoes/Futures/White/3jrNIu.jpg",
  ],
  Gats: [
    "/Maison Margiela/Shoes/Gats/O1CN01BbRJ6m20gdcEL4URp_!!3010396879.jpg_.jpg",
    "/Maison Margiela/Shoes/Gats/O1CN01gSrrhD20gdcErXeh4_!!3010396879.jpg_.jpg",
    "/Maison Margiela/Shoes/Gats/open1780109907-1780109907-0bbc00000199ec8597660a231226_959_1280.jpg.jpg",
  ],
  "Gimp Zip Up Normal": [
    "/Rick Owens/Hoodies/Gimp Zip Up Normal/1.png",
    "/Rick Owens/Hoodies/Gimp Zip Up Normal/2.jpeg",
  ],
  "Mountain Zip Up": [
    "/Rick Owens/Hoodies/Mountain Zip Up/1.jpeg",
    "/Rick Owens/Hoodies/Mountain Zip Up/2.jpg",
    "/Rick Owens/Hoodies/Mountain Zip Up/3.jpg",
    "/Rick Owens/Hoodies/Mountain Zip Up/4.jpg",
    "/Rick Owens/Hoodies/Mountain Zip Up/5.jpeg",
  ],
  Gimp: [
    "/Rick Owens/Jacket/Gimp/1.jpg",
    "/Rick Owens/Jacket/Gimp/2.jpg",
    "/Rick Owens/Jacket/Gimp/3.jpg",
  ],
  "Bela Neutro White": [
    "/Rick Owens/Pants/Bela Neutro White/1.jpg",
    "/Rick Owens/Pants/Bela Neutro White/2.jpg",
  ],
  "Bolan Banana Cut": [
    "/Rick Owens/Pants/Bolan Banana Cut/1.jpg",
    "/Rick Owens/Pants/Bolan Banana Cut/2.jpg",
  ],
  "Porterville Musculosa": [
    "/Rick Owens/Shirts/Porterville Musculosa/1.jpg",
    "/Rick Owens/Shirts/Porterville Musculosa/2.jpg",
  ],
  "Army Mega Tractor Boots": [
    "/Rick Owens/Shoes/Army Mega Tractor Boots/1.jpg",
    "/Rick Owens/Shoes/Army Mega Tractor Boots/2.jpg",
  ],
  Converse: [
    "/Rick Owens/Shoes/Converse/1.jpg",
    "/Rick Owens/Shoes/Converse/2.jpg",
  ],
  "Big Back Logo": getProductImages(
    "Supreme",
    "Hoodie",
    "Big back logo",
    "jpeg",
  ),
  "Leopard Thermal": [
    "/Supreme/Hoodie/Leopard thermal/1.jpg",
    "/Supreme/Hoodie/Leopard thermal/2.jpg",
  ],
};

export const catalogData: Brand[] = [
  {
    name: "Balenciaga",
    subtitle: "Future archive / distorted luxury",
    categories: [
      { name: "Backpack", products: ["Balenciaga x Adidas Backpack"] },
      {
        name: "Hoodies",
        products: ["Adidas Sleeves Zip Up", "Logo Recto Grande"],
      },
      { name: "Pants", products: ["Cammo Cut", "Cut Up"] },
      { name: "Shirts", products: ["Darkwave", "Tribal"] },
      { name: "Shoes", products: ["3XL", "Alaska"] },
      { name: "Chrome", products: ["Chrome 1", "Chrome Leather Black"] },
    ].map((cat) => ({
      name: cat.name,
      products: cat.products.slice(0, 2).map((p, i) => ({
        id: generateId("Balenciaga", p),
        name: p,
        brand: "Balenciaga",
        category: cat.name,
        price: Math.floor(Math.random() * (1200 - 400 + 1) + 400),
        images: (imageMap[p] || [getPlaceholder(i)]).slice(0, 5),
        provenance: getProvenance("Balenciaga", p),
        isBestSeller: i === 0, // Make the first item of each category a best seller for consistency
      })),
    })),
  },
  {
    name: "Maison Margiela",
    subtitle: "Deconstructed purity",
    categories: [{ name: "Shoes", products: ["Futures", "Gats"] }].map(
      (cat) => ({
        name: cat.name,
        products: cat.products.slice(0, 2).map((p, i) => ({
          id: generateId("Maison Margiela", p),
          name: p,
          brand: "Maison Margiela",
          category: cat.name,
          price: Math.floor(Math.random() * (900 - 400 + 1) + 400),
          images: (imageMap[p] || [getPlaceholder(i + 1)]).slice(0, 5),
          provenance: getProvenance("Maison Margiela", p),
          isBestSeller: i === 0,
        })),
      }),
    ),
  },
  {
    name: "Rick Owens",
    subtitle: "Dark divinity / brutal elegance",
    categories: [
      { name: "Hoodies", products: ["Gimp Zip Up Normal", "Mountain Zip Up"] },
      { name: "Jacket", products: ["Gimp"] },
      { name: "Pants", products: ["Bela Neutro White", "Bolan Banana Cut"] },
      { name: "Shirts", products: ["Porterville Musculosa"] },
      { name: "Shoes", products: ["Army Mega Tractor Boots", "Converse"] },
    ].map((cat) => ({
      name: cat.name,
      products: cat.products.slice(0, 2).map((p, i) => ({
        id: generateId("Rick Owens", p),
        name: p,
        brand: "Rick Owens",
        category: cat.name,
        price: Math.floor(Math.random() * (1500 - 300 + 1) + 300),
        images: (imageMap[p] || [getPlaceholder(i + 2)]).slice(0, 5),
        provenance: getProvenance("Rick Owens", p),
        isBestSeller: i === 0,
      })),
    })),
  },
  {
    name: "Supreme",
    subtitle: "Street relics / iconic rebellion",
    categories: [
      { name: "Hoodie", products: ["Big Back Logo", "Leopard Thermal"] },
    ].map((cat) => ({
      name: cat.name,
      products: cat.products.slice(0, 2).map((p, i) => ({
        id: generateId("Supreme", p),
        name: p,
        brand: "Supreme",
        category: cat.name,
        price: Math.floor(Math.random() * (400 - 150 + 1) + 150),
        images: (imageMap[p] || [getPlaceholder(i + 3)]).slice(0, 5),
        provenance: getProvenance("Supreme", p),
        isBestSeller: i === 0,
      })),
    })),
  },
];

export const allProducts = catalogData.flatMap((b) =>
  b.categories.flatMap((c) => c.products),
);
