"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation"
import {
  ShoppingCart,
  LayoutDashboard,
  GraduationCap,
  HeartHandshake,
  Home,
  ChevronRight,
  AppWindowMac,
  BookOpen,
  ActivitySquare,
  ClipboardList,
  Bot,
  HeartPulse,
  MessageSquare,
  ShoppingBag,
  Activity,
  Stethoscope,
  MessageCircle,
  Sun,
  Moon,
  Search,
  Filter,
  Heart,
  Star,
  Package,
  Droplet,
  Gamepad2,
  Zap,
  Leaf,
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  Sparkles,
  ArrowRight,
  Send,
  Calendar,
  Bath,
  HandHeart,
  Handshake,
} from "lucide-react";
import { element } from "prop-types";
import { Dashboard } from "./Dashboard";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import SideBar from "./SideBar";
const products = [
  {
    id: 1,
    name: <div className="text-pink-600">Organic Cotton Pads</div>,
    brand: "EcoFlow",
    price: 8.99,
    oldPrice: 10.99,
    icon: (
      <img
        src="/images/products/organic-pads.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.5,
    category: "Pads",
    isNew: true,
    featured: true,
  },
  {
    id: 2,
    name: <div className="text-pink-600">Menstrual Cup</div>,
    brand: "LunaCup",
    price: 29.99,
    oldPrice: 34.99,
    icon: (
      <img
        src="/images/products/mes_cup.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.8,
    category: "Menstrual Cups",
    featured: true,
  },
  {
    id: 3,
    name: <div className="text-pink-600">Period Pain Relief Patches</div>,
    brand: "ComfortEase",
    price: 15.99,
    oldPrice: 19.99,
    icon: (
      <img
        src="/images/products/relief_patches.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.2,
    category: "Pain Relief",
    isNew: true,
  },
  {
    id: 4,
    name: <div className="text-pink-600">Reusable Cloth Pads</div>,
    brand: "GreenCycle",
    price: 24.99,
    oldPrice: 29.99,
    icon: (
      <img
        src="/images/products/sponge_8707445.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.6,
    category: "Pads",
  },
  {
    id: 5,
    name: <div className="text-pink-600">Organic Tampons</div>,
    brand: "PureFlow",
    price: 7.99,
    oldPrice: 9.99,
    icon: (
      <img
        src="/images/products/tampon.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.4,
    category: "Tampons",
    featured: true,
  },
  {
    id: 6,
    name: <div className="text-pink-600">Period Tracking Bracelet</div>,
    brand: "CycleSync",
    price: 49.99,
    oldPrice: 59.99,
    icon: (
      <img
        src="/images/products/smart-band.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.1,
    category: "Accessories",
    isNew: true,
  },
  {
    id: 7,
    name: <div className="text-pink-600">Herbal Tea Collection</div>,
    brand: "MoonBloom",
    price: 19.99,
    oldPrice: 24.99,
    icon: (
      <img
        src="/images/products/herbal_tea.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.7,
    category: "Wellness",
    isNew: true,
  },
  {
    id: 8,
    name: <div className="text-pink-600">Natural Pain Relief Pills</div>,
    brand: "HerbalEase",
    price: 22.99,
    oldPrice: 27.99,
    icon: (
      <img
        src="/images/products/herbs.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.3,
    category: "Pain Relief",
  },
  {
    id: 9,
    name: <div className="text-pink-600">Relaxing Bath Bombs</div>,
    brand: "SpaFlow",
    price: 16.99,
    oldPrice: 21.99,
    icon: <Bath className="h-12 w-12 text-teal-500" />,
    rating: 4.9,
    category: "Wellness",
    featured: true,
  },
  {
    id: 10,
    name: <div className="text-pink-600">Aromatherapy Diffuser</div>,
    brand: "CalmScents",
    price: 39.99,
    oldPrice: 49.99,
    icon: (
      <img
        src="/images/products/therapy.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.6,
    category: "Wellness",
    isNew: true,
  },
  {
    id: 11,
    name: <div className="text-pink-600">Hot Water Bag</div>,
    brand: "SheFort",
    price: 10.99,
    oldPrice: 12.99,
    icon: (
      <img
        src="/images/products/hot-water-bag.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.5,
    category: "Pain Relief",
    isNew: true,
  },
  {
    id: 12,
    name: <div className="text-pink-600">Periods UnderWear</div>,
    brand: "flowDays",
    price: 5.99,
    oldPrice: 8.99,
    icon: <HandHeart className="h-12 w-12 text-pink-500" />,
    rating: 3.9,
    category: "Tampons",
    isNew: true,
  },
  {
    id: 13,
    name: <div className="text-pink-600">Menstrual Disc</div>,
    brand: "Nirvana",
    price: 12.99,
    oldPrice: 15.0,
    icon: (
      <img
        src="/images/products/disc.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.0,
    category: "Menstrual Cups",
    isNew: true,
  },
  {
    id: 14,
    name: <div className="text-pink-600">Thermo Flask</div>,
    brand: "Comfy",
    price: 20.99,
    oldPrice: 25.99,
    icon: (
      <img
        src="/images/products/thermo.png"
        alt="Organic Pads"
        className="h-12 w-12 object-contain"
      />
    ),
    rating: 4.9,
    category: "Accessories",
  },
];

const SidebarLink = ({ icon, label, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
        active
          ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const categories = [
  "All",
  "Pads",
  "Tampons",
  "Menstrual Cups",
  "Pain Relief",
  "Wellness",
  "Accessories",
];

const specialOffers = [
  {
    title: <div className="text-pink-600">Summer Sale</div>,
    description: "Get 20% off on all menstrual cups",
    code: "SUMMER20",
    expiry: "Limited time offer",
  },
  {
    title: <div className="text-pink-600">Bundle & Save</div>,
    description: "Buy any 3 wellness products and save 15%",
    code: "WELLNESS15",
    expiry: "Valid until stocks last",
  },
  {
    title: <div className="text-pink-600">First Purchase</div>,
    description: "10% off on your first order",
    code: "WELCOME10",
    expiry: "For new customers",
  },
];

export function Ecom() {
  // const router = useRouter()
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prev) =>
      quantity === 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setEmail("");
  };

  const sendMailWithCartItems = async () => {
    const formspreeEndpoint = "https://formspree.io/f/mqaagdkg"; // Replace with your actual Formspree endpoint

    const emailBody = {
      subject: "SheSync Order Form - New Order",
      message: `
        New order details:
        
        ${cartItems
          .map(
            (item) =>
              `${item.name} (${item.quantity}) - $${(
                item.price * item.quantity
              ).toFixed(2)}`
          )
          .join("\n")}
        
        Total: $${total.toFixed(2)}
      `,
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
      });

      if (response.ok) {
        alert("Order details sent successfully!");
        setIsCartOpen(false); // Close the cart after sending
        setCartItems([]); // Clear the cart
      } else {
        throw new Error("Failed to send order details");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send order details. Please try again.");
    }
  };

  const filteredProducts = products
    .filter((product) => {
      console.log("Product:", product.name, "Search:", searchQuery); // Add this line
      return (
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (searchQuery === "" ||
          String(product.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          String(product.brand || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const featuredProducts = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.isNew);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={3}
      />
      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          style={{
            transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
          }}
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 block m-auto ${
              sidebarVisible ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}

      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Shop
            </h2>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                  >
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products"
                className="text-white w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white
              hover:bg-pink-100 dark:hover:bg-gray-600 hover:border-pink-400 "
              />

              <Search
                className=" max-w-[300px] text-gray-400 dark:text-gray-300 hover:scale-110 transition-transform duration-200 ease-in-out
             absolute  right-3 top-2.5 h-5 w-5"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hover:bg-pink-100 dark:hover:bg-gray-600 hover:border-pink-400
            px-4 py-2 text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white"
            >
              <option disabled value="">
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hover:bg-pink-100 dark:hover:bg-gray-600 hover:border-pink-400
            px-4 py-2 text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white"
            >
              <option disabled value="">
                Sort By
              </option>
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Lowest First</option>
              <option value="priceHighToLow">Highest First</option>
              <option value="rating">Top Rated</option>
            </select>
          </motion.div>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-pink-500 dark:text-pink-400">
                Featured Products
              </h2>
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-pink-500 dark:text-pink-400"
              >
                View All <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 flex justify-center"
                  >
                    {product.icon}
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </p>
                    <div className="mt-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full ${
                          favorites.includes(product.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          className="h-6 w-6"
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                New Arrivals <Sparkles className="h-6 w-6" />
              </h2>
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-pink-500 dark:text-pink-400"
              >
                View All <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {newArrivals.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 flex justify-center"
                  >
                    {product.icon}
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </p>
                    <div className="mt-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full ${
                          favorites.includes(product.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          className="h-6 w-6"
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories
                .filter((cat) => cat !== "All")
                .map((category, index) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-6 rounded-xl border text-center transition-colors ${
                      selectedCategory === category
                        ? "bg-gradient-to-r  from-pink-500 to-purple-600 text-black border-transparent"
                        : "bg-white text-pink-600 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
                    }`}
                  >
                    <h3 className="font-medium">{category}</h3>
                    <p className="text-sm mt-1 opacity-75">
                      {products.filter((p) => p.category === category).length}{" "}
                      Products
                    </p>
                  </motion.button>
                ))}
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Special Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialOffers.map((offer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br text-white from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-100 dark:border-pink-800"
                >
                  <Gift className="h-8 w-8 text-pink-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {offer.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {offer.code}
                    </span>
                    <span className="text-sm text-white">{offer.expiry}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-10" />
            <div className="relative p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl text-pink-600 md:text-3xl font-bold">
                  Stay Updated
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter for exclusive offers and period
                  care tips.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-4 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg flex items-center gap-2"
                  >
                    Subscribe <Send className="h-4 w-4" />
                  </motion.button>
                </form>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              All Products
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 flex justify-center"
                  >
                    {product.icon}
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </p>
                    <div className="mt-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full ${
                          favorites.includes(product.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          className="h-6 w-6"
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <AnimatePresence>
            {isCartOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black"
                  onClick={() => setIsCartOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 overflow-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                      <ShoppingCart className="h-6 w-6 dark:text-white" />
                      Your Cart
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="h-6 w-6 dark:text-white" />
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 dark:text-white">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-4 rounded-full bg-pink-100 dark:bg-pink-900/30"
                      >
                        <ShoppingBag className="h-8 w-8 text-pink-500" />
                      </motion.div>
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        Your cart is empty
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        <AnimatePresence mode="popLayout">
                          {cartItems.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.95, opacity: 0 }}
                              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <div className="p-2 rounded-md bg-pink-100 dark:bg-pink-900/30">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.brand}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateCartItemQuantity(
                                      item.id,
                                      Math.max(0, item.quantity - 1)
                                    )
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Minus className="h-4 w-4 dark:text-white" />
                                </motion.button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateCartItemQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Plus className="h-4 w-4 dark:text-white" />
                                </motion.button>
                              </div>
                              <div className="flex items-center gap-4 dark:text-white">
                                <p className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeCartItem(item.id)}
                                  className="p-1 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-bold text-lg">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg"
                        >
                          Proceed to Checkout
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={sendMailWithCartItems}
                          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg"
                        >
                          Send Order Details
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
