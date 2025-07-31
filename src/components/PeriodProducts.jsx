import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { useTheme } from "../context/ThemeContext";
import prodcup from "../../prod-cup-img.png";
import prodpad from "../../prod-pad-img.png";
import prodtampoon from "../../prod-tampoon-img.png";

const products = [
  {
    title: "Menstrual Pad",
    image: prodpad,
    description:
      "Sanitary pads are a popular and convenient option for menstrual hygiene, providing external protection by absorbing menstrual blood. They come in various sizes and absorbencies, from regular and ultra-thin pads to maxi and night pads for heavier flows or overnight use. Pads are easy to use, making them ideal for those who prefer a non-invasive method of managing their periods, as they simply adhere to the inside of your underwear. To use a pad, you unwrap it, remove the adhesive backing, and place it in the center of your underwear, with wings, if available, folded around the sides for added security. Pads should be changed every 4-6 hours to maintain hygiene and prevent leaks or irritation. They are disposable, widely available, and a comfortable choice for many, especially those who may not want to use internal products like tampons or menstrual cups.",
  },
  {
    title: "Tampon",
    image: prodtampoon,
    description:
      "Tampons are small, absorbent cylinders made of cotton or a blend of materials, designed to be inserted into the vagina to absorb menstrual blood directly. Many choose tampons because they are discreet, convenient, and allow for more freedom of movement. Tampons come in various sizes and absorbencies (light, regular, super) to suit different flow levels. To use a tampon, first wash your hands, then unwrap the tampon and gently insert it into the vagina, aiming toward the small of your back, until it's comfortably placed. If using an applicator, press the plunger to push the tampon inside and discard the applicator. Tampons should be changed every 4-8 hours depending on your flow to prevent leaks. Always remove the tampon by pulling the string gently, then discard it properly in a bin.",
  },
  {
    title: "Menstrual Cup",
    image: prodcup,
    description:
      "Menstrual cups are a reusable, eco-friendly alternative to pads and tampons, made from medical-grade silicone, rubber, or latex, designed to collect, rather than absorb, menstrual blood. They are a great choice for those looking for a long-term, cost-effective, and sustainable solution. Unlike disposable products, cups can be worn for up to 12 hours depending on flow, offering convenience and fewer changes throughout the day. To use, fold the cup and insert it into the vagina, where it will open and form a seal to prevent leaks. After several hours, remove the cup by gently pinching the base to break the seal, empty the contents, rinse it with water, and reinsert. Menstrual cups can last for several years with proper care, making them both economical and environmentally friendly.",
  },
];

const PeriodProducts = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { width } = useScreenSize();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 z-50">
        <SideBar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          activeLink={10}
          toggleDarkMode={toggleTheme}
        />
      </div>

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 z-50 w-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          style={{
            left: sidebarVisible ? "256px" : "0px",
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

      <div
        className={`flex-1 p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
          width > 816 && sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-7 text-purple-900 dark:text-purple-300 mt-5">
            Period{" "}
            <span className="text-pink-700 dark:text-pink-400">Products</span>
          </h2>
          <p className="text-m text-gray-700 dark:text-gray-300 pl-4 pr-4">
            Learn about different menstrual products to find what works best for
            you. Each option has its own benefits and considerations.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-48 h-48 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-pink-700 dark:text-pink-400 text-center mb-4">
                {product.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <strong>Note:</strong> Everyone's body is different, and what works
            best can vary from person to person. It's always a good idea to
            consult with a healthcare provider if you have questions about
            menstrual products or experience any unusual symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeriodProducts;
