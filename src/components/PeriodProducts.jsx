import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
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
      "Tampons are small, absorbent cylinders made of cotton or a blend of materials, designed to be inserted into the vagina to absorb menstrual blood directly. Many choose tampons because they are discreet, convenient, and allow for more freedom of movement. Tampons come in various sizes and absorbencies (light, regular, super) to suit different flow levels. To use a tampon, first wash your hands, then unwrap the tampon  and gently insert it into the vagina, aiming toward the small of your back, until it's comfortably placed. If using an applicator, press the plunger to push the tampon inside and discard the applicator. Tampons should be changed every 4-8 hours depending on your flow to prevent leaks. Always remove the tampon by pulling the string gently, then discard it properly in a bin.",
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
  const [darkMode, setDarkMode] = useState(false);

  const { width } = useScreenSize();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
 

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="fixed top-0 left-0 z-50">
        <SideBar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          activeLink={12}
          toggleDarkMode={toggleDarkMode}
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

      <main
        className={`flex-1 px-10 py-6 bg-white transition-all duration-300 ease-in-out ${
          width > 816 && sidebarVisible ? "ml-[256px]" : "ml-0"
        } dark:bg-gray-900 dark:text-white`}
      >
        <h1 className="p-4 text-5xl sm:text-5xl md:text-6xl font-extrabold text-center">
          <span className="text-pink-500">Period Products:</span>{" "}
          <span className="text-gray-700 dark:text-white">
            Comfort & Confidence
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center mb-10">
          Explore useful advice and information to help you choose the right
          period products and effortlessly manage your comfort and protection
          with confidence.
        </p>

        <section className="flex flex-col lg:flex-row gap-6 mb-10">
          <iframe
            className="w-full lg:w-[700px] h-[300px] lg:h-[470px] rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/kmWbOC8Fbb0?si=iNWAD1QCckqcxHm7"
            title="Period Product Hygiene"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>

        <h2 className="text-center text-4xl font-extrabold mb-8 text-pink-500">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {products.map((product, index) => (
            <article
              key={index}
              className="bg-pink-50 dark:bg-gray-800 rounded-xl shadow-md p-4"
            >
              <h3 className="text-xl font-bold text-center mb-4 text-purple-800 font-">
                {product.title}
              </h3>
              <img
                src={product.image}
                alt={product.title}
                className="mx-auto mb-4 h-40 object-contain"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300 text-justify">
                {product.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center bg-pink-50 dark:bg-gray-800 py-8 px-4 rounded-xl shadow-md mb-6">
          <h3 className="text-3xl font-extrabold text-pink-600 font-handwriting mb-4">
            Ready to Shop?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Browse a variety of comfortable and reliable products tailored for your needs. Whether you're starting your period journey or looking to try something new, we've got you covered with trusted, high-quality options.
          </p>
          <a
            href="/ecom"
            className="inline-block bg-pink-500 hover:bg-pink-700 hover:text-white text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Shop Now!
          </a>
        </div>
      </main>
    </div>
  );
};

export default PeriodProducts;
