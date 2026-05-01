/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { catalogData, allProducts, Product } from "./data";

type ViewState = "landing" | "catalog" | "product";

interface CartItem extends Product {
  selectedSize: string;
  cartId: string;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-bone/50 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-pearl via-bone to-quartz/20" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const LandingView: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 text-center w-full"
    >
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center w-full max-w-4xl px-2"
      >
        <div className="w-full max-w-3xl mb-6 md:mb-8 flex justify-center">
          <img
            src="/logo.png"
            alt="Crstallsx"
            className="w-[90%] sm:w-[80%] md:w-full h-auto object-contain logo-blend"
          />
        </div>

        <p className="text-base sm:text-lg md:text-2xl font-serif italic text-smoke max-w-2xl mx-auto mb-12 md:mb-20 leading-relaxed px-4">
          Archivo celestial de diseñador para los caídos y divinos.
        </p>

        <button
          onClick={onEnter}
          className="group relative px-8 md:px-12 py-4 md:py-5 bg-white/70 backdrop-blur text-ink border border-quartz/60 shadow-[0_0:30px_rgba(255,255,255,0.8)] hover:shadow-[0_0_50px_rgba(255,255,255,1),_inset_0_0_20px_rgba(207,170,112,0.15)] hover:border-gold transition-all duration-700 overflow-hidden rounded-sm cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <span className="relative z-10 flex items-center justify-center gap-4 text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] font-serif font-bold text-ink group-hover:text-gold transition-colors">
            Ver Catálogo
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};

const CatalogView: React.FC<{ onProductSelect: (p: Product) => void }> = ({
  onProductSelect,
}) => {
  const [activeBrand, setActiveBrand] = useState<string | "Todos">("Todos");
  const [activeCategory, setActiveCategory] = useState<string | "Todos">(
    "Todos",
  );

  useEffect(() => {
    setActiveCategory("Todos");
  }, [activeBrand]);

  const filteredData =
    activeBrand === "Todos"
      ? [
          {
            name: "Colección General",
            subtitle: "Piezas más codiciadas de nuestro archivo",
            categories: [
              {
                name: "Más Vendidos",
                products: allProducts.filter((p) => p.isBestSeller),
              },
            ],
          },
        ]
      : catalogData.filter((b) => b.name === activeBrand);

  const availableCategories =
    activeBrand !== "Todos"
      ? [
          "Todos",
          ...catalogData
            .find((b) => b.name === activeBrand)!
            .categories.map((c) => c.name),
        ]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 w-full"
    >
      <header className="mb-6 md:mb-8 flex flex-col items-center text-center mt-4 md:mt-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-widest mb-4 font-bold text-ink hover:opacity-80 transition-opacity">
          {activeBrand === "Todos" ? "Más Vendidos" : "Archivo"}
        </h1>
        <div className="h-px w-12 md:w-16 bg-gold mb-6 md:mb-8"></div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-6 mt-2 text-[10px] md:text-xs uppercase tracking-[0.15em] font-serif px-2">
          <button
            onClick={() => setActiveBrand("Todos")}
            className={`transition-all duration-500 py-1 px-2 md:py-1.5 md:px-3 border cursor-pointer ${activeBrand === "Todos" ? "border-gold text-gold bg-white/50 shadow-[0_0_10px_rgba(207,170,112,0.2)]" : "border-transparent text-smoke hover:text-ink hover:border-quartz/50"}`}
          >
            Más Vendidos
          </button>
          {catalogData.map((b) => (
            <button
              key={b.name}
              onClick={() => setActiveBrand(b.name)}
              className={`transition-all duration-500 py-1 px-2 md:py-1.5 md:px-3 border cursor-pointer ${activeBrand === b.name ? "border-gold text-gold bg-white/50 shadow-[0_0_10px_rgba(207,170,112,0.2)]" : "border-transparent text-smoke hover:text-ink hover:border-quartz/50"}`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeBrand !== "Todos" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 md:mt-8 flex flex-row flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto md:overflow-hidden pb-4 md:pb-0 w-full no-scrollbar px-4"
            >
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 transition-all duration-300 py-1 px-3 md:px-4 text-[9px] md:text-[10px] uppercase tracking-widest font-serif border-b-2 cursor-pointer ${
                    activeCategory === cat
                      ? "border-gold text-gold font-bold"
                      : "border-transparent text-smoke hover:text-ink hover:border-quartz/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="space-y-12 md:space-y-20">
        {filteredData.map((brand) => (
          <section key={brand.name} className="relative">
            {activeBrand !== "Todos" && (
              <div className="mb-8 md:mb-10 text-center border-y border-quartz/40 py-6 md:py-8 bg-white/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-ink">
                  {brand.name}
                </h2>
                <p className="text-xs md:text-lg font-serif text-smoke mt-2 md:mt-3 font-medium uppercase tracking-[0.2em] px-4">
                  {brand.subtitle}
                </p>
              </div>
            )}

            <div
              className={
                activeCategory === "Todos" ? "space-y-8 md:space-y-12" : ""
              }
            >
              {(activeBrand === "Todos"
                ? brand.categories
                : brand.categories.filter(
                    (c) =>
                      activeCategory === "Todos" || c.name === activeCategory,
                  )
              ).map((category) => (
                <div
                  key={category.name}
                  className={activeCategory === "Todos" ? "mb-6 md:mb-8" : ""}
                >
                  {activeCategory === "Todos" && activeBrand !== "Todos" && (
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <span className="h-px w-6 md:w-8 bg-gold/50"></span>
                      <h3 className="text-sm md:text-lg font-serif uppercase tracking-[0.3em] font-bold text-ink">
                        {category.name}
                      </h3>
                      <span className="h-px w-6 md:w-8 bg-gold/50"></span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
                    {category.products.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -10 }}
                        layoutId={`product-card-${product.id}`}
                        className="group cursor-pointer flex flex-col bg-white/60 p-2 sm:p-4 border border-quartz/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(207,170,112,0.15)] transition-all duration-500 rounded-sm"
                        onClick={() => onProductSelect(product)}
                      >
                        <motion.div
                          layoutId={`product-image-${product.id}`}
                          className="aspect-[3/4] bg-pearl mb-3 sm:mb-6 overflow-hidden relative border border-quartz/40 halo"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30 z-10 mix-blend-overlay" />
                          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                          <OptimizedImage
                            src={product.images[0]}
                            alt={product.name}
                            className={`mix-blend-multiply opacity-90 transition-all duration-[1.5s] ease-out brightness-105 contrast-125 grayscale-[20%] ${
                              product.images.length > 1
                                ? "group-hover:opacity-0"
                                : "group-hover:scale-110"
                            }`}
                          />

                          {product.images.length > 1 && (
                            <OptimizedImage
                              src={product.images[1]}
                              alt={`${product.name} alt`}
                              className="absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-[1.5s] ease-out brightness-105 contrast-125 grayscale-[20%]"
                            />
                          )}
                        </motion.div>
                        <div className="flex flex-col items-center text-center gap-1 md:gap-2 px-1 md:px-2">
                          <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-gold font-serif font-bold">
                            {product.brand}
                          </span>
                          <h4 className="text-sm sm:text-lg font-serif italic tracking-wide group-hover:text-gold transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs sm:text-base text-ink font-serif mt-1 md:mt-2">
                            ${product.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
};

const ProductView: React.FC<{
  product: Product;
  onBack: () => void;
  onAdd: (product: Product, size: string) => void;
}> = ({ product, onBack, onAdd }) => {
  const [size, setSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-12"
    >
      <AnimatePresence>
        {showSizeGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[200] cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bone p-8 md:p-12 z-[210] w-[90%] max-w-2xl border border-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl uppercase tracking-[0.2em] font-bold">
                  Medidas del Archivo
                </h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={24} strokeWidth={1} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-serif text-sm">
                  <thead>
                    <tr className="border-b border-quartz/60 text-smoke uppercase tracking-widest text-[10px]">
                      <th className="py-4 font-normal">Talla</th>
                      <th className="py-4 font-normal">Pecho (cm)</th>
                      <th className="py-4 font-normal">Largo (cm)</th>
                      <th className="py-4 font-normal">Hombros (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["S", "M", "L", "XL"].map((s, i) => (
                      <tr
                        key={s}
                        className="border-b border-quartz/20 hover:bg-white/40 transition-colors"
                      >
                        <td className="py-4 font-bold">{s}</td>
                        <td className="py-4 text-smoke">{54 + i * 2}</td>
                        <td className="py-4 text-smoke">{68 + i * 2}</td>
                        <td className="py-4 text-smoke">{48 + i * 2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-[10px] text-smoke font-serif uppercase tracking-widest italic text-center">
                * Las medidas son aproximadas debido a la naturaleza
                deconstruida de {product.brand}.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6 md:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] md:text-xs font-serif uppercase tracking-widest text-smoke hover:text-gold transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={1} />
          <span className="mt-1">Volver</span>
        </button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`flex items-center gap-2 text-[10px] font-serif uppercase tracking-widest transition-all duration-300 cursor-pointer ${
            isWishlisted ? "text-gold" : "text-smoke hover:text-ink"
          }`}
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
          >
            <Heart
              size={16}
              strokeWidth={1}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </motion.div>
          <span className="hidden sm:inline mt-1">
            {isWishlisted ? "Guardado" : "Guardar"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <motion.div
          layoutId={`product-image-${product.id}`}
          initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="aspect-[4/5] bg-pearl relative ornate-border p-1 md:p-1.5 bg-white/50 group"
        >
          <div className="w-full h-full relative overflow-hidden halo bg-bone">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-black/5 mix-blend-overlay z-10" />
            <OptimizedImage
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="mix-blend-multiply opacity-95 brightness-105 contrast-125 grayscale-[10%]"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 md:p-2 rounded-full transition-all duration-200 opacity-60 md:opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                >
                  <ChevronLeft size={18} md:size={20} />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 md:p-2 rounded-full transition-all duration-200 opacity-60 md:opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                >
                  <ChevronRight size={18} md:size={20} />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex gap-1 md:gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border transition-all duration-300 cursor-pointer ${
                    selectedImageIndex === index
                      ? "border-gold shadow-[0_0_8px_rgba(207,170,112,0.4)]"
                      : "border-quartz/40 hover:border-gold/40"
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="flex flex-col pt-0 lg:pt-4"
        >
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <span className="h-px w-4 md:w-6 bg-gold"></span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold font-serif font-bold">
              {product.brand}
            </span>
          </div>

          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-widest mb-3 md:mb-4 leading-tight font-bold text-ink">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <p className="text-xl md:text-2xl font-serif text-ink">
              ${product.price}
            </p>
            {product.isBestSeller && (
              <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-ink text-gold border border-gold/30">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold animate-pulse"></div>
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-serif font-bold">
                  Destacado
                </span>
              </div>
            )}
          </div>

          <div className="w-6 md:w-8 h-px bg-quartz/60 mb-4 md:mb-6"></div>

          <p className="text-xs md:text-sm text-smoke font-serif leading-relaxed mb-6 md:mb-8 italic border-l-2 border-gold/40 pl-3 md:pl-4">
            {product.provenance}
          </p>

          <div className="mb-6 md:mb-8 bg-white/40 p-4 md:p-5 border border-quartz/40 shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            <div className="flex justify-between items-end mb-3 md:mb-4">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-serif font-bold">
                Talla
              </span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-[9px] md:text-[10px] font-serif uppercase tracking-widest text-smoke hover:text-gold transition-colors border-b border-smoke/30 hover:border-gold pb-0.5 cursor-pointer"
              >
                Guía
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 md:py-3 text-xs md:text-sm font-serif transition-all duration-300 border cursor-pointer ${
                    size === s
                      ? "border-gold bg-gold text-white shadow-[0_0:10px_rgba(207,170,112,0.3)]"
                      : "border-quartz/40 bg-white hover:border-gold hover:text-gold text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (!size) {
                alert("Por favor selecciona una talla divina.");
                return;
              }
              onAdd(product, size);
            }}
            className="group relative w-full bg-ink text-white py-3.5 md:py-4 overflow-hidden border border-transparent shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(207,170,112,0.2)] transition-all duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <span className="relative z-10 flex justify-center items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-serif font-bold">
              {size ? "Agregar al Archivo" : "Seleccionar Talla"}
            </span>
          </button>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-quartz/60 text-[9px] md:text-[10px] font-serif uppercase tracking-widest text-smoke flex flex-row gap-3 md:gap-4">
            <div className="flex-1 flex justify-between items-center bg-white/30 p-2 md:p-3 border border-white">
              <span className="hidden xs:inline">Envíos</span>
              <span className="text-ink font-bold">3-5 Días</span>
            </div>
            <div className="flex-1 flex justify-between items-center bg-white/30 p-2 md:p-3 border border-white">
              <span className="hidden xs:inline">Devoluciones</span>
              <span className="text-ink font-bold">Sin costo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>("landing");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product: Product, size: string) => {
    const newItem: CartItem = {
      ...product,
      selectedSize: size,
      cartId: Math.random().toString(36).substr(2, 9),
    };
    setCart((prev) => [...prev, newItem]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const navigateTo = (newView: ViewState, product?: Product) => {
    setView(newView);
    if (product) setSelectedProduct(product);
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-fog selection:bg-gold selection:text-white relative overflow-hidden flex flex-col">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-[100] bg-ink text-gold border border-gold px-8 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 min-w-[280px] justify-center"
          >
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="font-serif uppercase tracking-[0.2em] text-xs font-bold">
              Producto agregado
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 absolute top-0 z-50"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-bone/80 backdrop-blur-md border-b border-quartz/40 text-ink px-4 md:px-12 py-3 md:py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(255,255,255,0.5)] transition-all duration-300">
        <button
          onClick={() => navigateTo("landing")}
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Crstallsx"
            className="h-6 sm:h-8 md:h-12 object-contain logo-blend"
          />
        </button>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="hover:text-gold transition-colors cursor-pointer p-1">
            <Search size={20} md:size={22} strokeWidth={1} />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-gold transition-colors relative group cursor-pointer p-1"
          >
            <ShoppingBag size={20} md:size={22} strokeWidth={1} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-ink text-gold border border-gold text-[9px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-serif shadow-[0_0_10px_rgba(207,170,112,0.5)]">
                {cart.length}
              </span>
            )}
          </button>
          <button
            className="md:hidden hover:text-gold transition-colors cursor-pointer p-1"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-bone text-ink flex flex-col p-6 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
          >
            <div className="flex justify-between items-center mb-12 border-b border-quartz/50 pb-4">
              <img
                src="/logo.png"
                alt="Crstallsx"
                className="h-6 object-contain logo-blend"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gold transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col gap-8 items-center justify-center flex-grow py-12">
              {[
                "Más Vendidos",
                "Balenciaga",
                "Rick Owens",
                "Maison Margiela",
                "Supreme",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    // Logic to set brand would go here if we were in CatalogView
                    // For now just close menu as a placeholder
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-serif uppercase tracking-[0.3em] hover:text-gold transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-auto text-center w-full pb-8">
              <span className="text-xs font-serif italic text-smoke">
                Designed for the fallen and divine.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[60] cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-quartz/40 flex flex-col"
            >
              <div className="p-8 border-b border-quartz/40 flex justify-between items-center">
                <h2 className="font-serif text-2xl uppercase tracking-[0.2em] font-bold">
                  Tu Archivo
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={24} strokeWidth={1} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-smoke font-serif italic">
                    <p className="text-lg">Tu archivo está vacío.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 text-sm uppercase tracking-widest border-b border-gold text-gold cursor-pointer"
                    >
                      Seguir Explorando
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex gap-6 group">
                      <div className="w-24 h-32 bg-pearl flex-shrink-0 border border-quartz/30 p-1">
                        <OptimizedImage
                          src={item.images[0]}
                          alt={item.name}
                          className="mix-blend-multiply grayscale-[20%]"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">
                          {item.brand}
                        </span>
                        <h3 className="font-serif text-lg leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-smoke font-serif">
                          Talla: {item.selectedSize}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-serif font-bold text-ink">
                            ${item.price}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-[10px] uppercase tracking-tighter text-smoke hover:text-red-500 transition-colors cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-quartz/40 bg-bone/30">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-serif uppercase tracking-widest text-smoke">
                      Total
                    </span>
                    <span className="font-serif text-2xl font-bold">
                      ${cart.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                  <button className="w-full bg-ink text-white py-5 uppercase tracking-[0.3em] font-serif font-bold text-sm hover:bg-gold transition-all duration-500 shadow-lg cursor-pointer">
                    Finalizar Pedido
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-28 pb-12 w-full flex-grow flex flex-col relative z-10">
        <AnimatePresence
          mode="wait"
          onExitComplete={() =>
            window.scrollTo({ top: 0, behavior: "instant" })
          }
        >
          {view === "landing" && (
            <LandingView key="landing" onEnter={() => navigateTo("catalog")} />
          )}
          {view === "catalog" && (
            <CatalogView
              key="catalog"
              onProductSelect={(p) => navigateTo("product", p)}
            />
          )}
          {view === "product" && selectedProduct && (
            <ProductView
              key="product"
              product={selectedProduct}
              onBack={() => navigateTo("catalog")}
              onAdd={addToCart}
            />
          )}
        </AnimatePresence>
      </main>

      {view !== "landing" && (
        <footer className="w-full relative z-10 bg-white/40 backdrop-blur border-t-2 border-quartz/60 py-16 px-6 md:px-12 mt-12 shadow-[0_-10px_30px_rgba(255,255,255,0.7)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <img
                src="/logo.png"
                alt="Crstallsx"
                className="h-10 object-contain logo-blend mb-6"
              />
              <p className="text-lg text-smoke font-serif italic leading-relaxed">
                Archivo celestial de diseñador.
                <br />
                Para los caídos y divinos.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em] text-ink font-serif text-center md:text-left md:items-end">
              <span className="text-gold mb-2 block">Redes</span>
              <button className="hover:text-gold transition-colors cursor-pointer">
                Instagram
              </button>
            </div>
          </div>
          <p className="text-center text-smoke/50 text-xs font-serif mt-16 tracking-widest">
            © 2026 CRSTALLSX. ALL RIGHTS RESERVED.
          </p>
        </footer>
      )}
    </div>
  );
}
