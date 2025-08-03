"use client";

import { useState, useCallback, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  HeartHandshake,
  AppWindowMac,
  DollarSign,
  ChevronDown,
  Gamepad2,
  Sun,
  Moon,
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  Handshake,
  ChevronRight,
  Loader2,
  Filter,
  Calendar,
  Video,
  Phone,
  Languages,
  IndianRupee,
  ArrowUpDown,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Dialog, Transition } from "@headlessui/react";
import { format, addDays, parse, isBefore, isAfter } from "date-fns";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const libraries = ["places"];

const specializations = [
  "Gynecology",
  "Obstetrics",
  "Reproductive Endocrinology",
  "Hormonal Therapy",
  "Fertility Specialist",
  "Nutrition & Dietetics",
  "Menstrual Health Specialist",
  "Endometriosis Specialist",
  "Postpartum Care",
];

const consultationTypes = ["In-Person", "Video Consultation", "Both"];
const languageOptions = [
  "English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Bengali",
  "Tamil",
  "Telugu",
];
const experienceRanges = [
  "0-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years",
];
const priceRanges = ["₹500-1000", "₹1000-2000", "₹2000-3000", "₹3000+"];

export function Consultations() {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiDoctors, setApiDoctors] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const [filters, setFilters] = useState({
    specialization: "",
    consultationType: "",
    language: "",
    experience: "",
    priceRange: "",
    rating: 0,
    availability: false,
  });

  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedConsultationType, setSelectedConsultationType] =
    useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCIbAtB0SC6j13FLT4RTDDGgMud74q3-5A",
    libraries,
  });

  // Map handlers
  const onMapLoad = useCallback((map) => setMap(map), []);
  const handleMapDrag = () => {
    if (map) {
      const center = map.getCenter();
      setMapCenter({ lat: center.lat(), lng: center.lng() });
      handleSearch(center);
    }
  };

  // Unified search handler
  const handleSearch = async (location = null) => {
    try {
      setIsSearching(true);
      setSearchError("");

      let searchLocation = location || userLocation;

      // If we have a search query, geocode it
      if (searchQuery && !location) {
        const geocoder = new window.google.maps.Geocoder();
        const results = await new Promise((resolve, reject) => {
          geocoder.geocode({ address: searchQuery }, (results, status) => {
            status === "OK" ? resolve(results) : reject(status);
          });
        });

        if (results.length === 0) {
          setSearchError("Location not found");
          setIsSearching(false);
          return;
        }

        searchLocation = results[0].geometry.location;
        setUserLocation(searchLocation);
        setMapCenter({ lat: searchLocation.lat(), lng: searchLocation.lng() });
      }

      if (!searchLocation) {
        setSearchError("Please enable location access or enter a location");
        setIsSearching(false);
        return;
      }

      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: searchLocation,
        radius: 50000,
        keyword: "gynecologist",
        type: "doctor",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const newMarkers = results.map((place) => ({
            id: place.place_id,
            name: place.name,
            location: place.geometry.location,
            rating: place.rating,
            address: place.vicinity,
          }));

          setMarkers(newMarkers);
          setApiDoctors(
            results.map((place) => ({
              id: place.place_id,
              name: place.name,
              specialization: place.types.includes("doctor")
                ? "Gynecologist"
                : "Women's Health Specialist",
              rating: place.rating || 4.5,
              reviewCount: place.user_ratings_total || 0,
              availableDate: new Date().toISOString().split("T")[0],
              price: Math.floor(Math.random() * 100) + 100,
              image: "/images/women.jpeg",
            }))
          );
        } else {
          setSearchError("No doctors found in this area");
        }
        setIsSearching(false);
      });
    } catch (error) {
      setSearchError("Error searching locations");
      setIsSearching(false);
    }
  };

  // Location handlers
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          setSearchQuery(""); // Clear search query when using current location
          handleSearch(location);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setSearchError("Please enable location access to use this feature");
        }
      );
    } else {
      setSearchError("Geolocation is not supported by this browser");
    }
  };

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // UI Components
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
  const DoctorCard = ({ doctor }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {doctor.specialization}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-sm text-gray-500">
                  ({doctor.reviewCount})
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{doctor.experience || "10+ years experience"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Languages className="h-4 w-4 mr-2" />
                <span>{doctor.languages?.join(", ") || "English, Hindi"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{doctor.address || "2.5 km away"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-green-600 dark:text-green-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Next: Today</span>
                </span>
                <div className="flex items-center space-x-1">
                  <Video className="h-4 w-4 text-blue-500" />
                  <Phone className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                ₹{doctor.price}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => handleBooking(doctor, "video")}
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Video className="h-4 w-4 mr-2" />
            Video Consult
          </button>
          <button
            onClick={() => handleBooking(doctor, "clinic")}
            className="w-full bg-pink-100 text-pink-600 py-2 px-4 rounded-md hover:bg-pink-200 transition-colors duration-300 flex items-center justify-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Visit
          </button>
        </div>
      </div>
    </motion.div>
  );

  const DoctorCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-4/5" />
          <div className="h-3 bg-gray-300 rounded w-3/4" />
        </div>
      </div>
    </div>
  );

  const FilterSection = ({ filters, setFilters, showFilters }) => (
    <motion.div
      initial={!hasMounted ? { height: 0, opacity: 0 } : false}
      animate={{
        height: showFilters ? "auto" : 0,
        opacity: showFilters ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg mb-6 transition-all"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Specialization
            </label>
            <select
              value={filters.specialization}
              onChange={(e) =>
                setFilters({ ...filters, specialization: e.target.value })
              }
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Consultation Type
            </label>
            <select
              value={filters.consultationType}
              onChange={(e) =>
                setFilters({ ...filters, consultationType: e.target.value })
              }
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">All Types</option>
              {consultationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">All Languages</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Experience
            </label>
            <select
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Any Experience</option>
              {experienceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters({ ...filters, priceRange: e.target.value })
              }
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Any Price</option>
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
              Minimum Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`p-2 rounded-full transition-colors ${
                    filters.rating >= rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const SortingControls = ({ sortBy, setSortBy }) => (
    <div className="flex items-center space-x-4 mb-6">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </span>
      <button
        onClick={() => setSortBy("rating")}
        className={`flex items-center px-3 py-1 rounded-full text-sm ${
          sortBy === "rating"
            ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
            : "text-gray-600 bg-white border border-black dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Star className="h-4 w-4 mr-1" />
        Rating
      </button>
      <button
        onClick={() => setSortBy("price")}
        className={`flex items-center px-3 py-1 rounded-full text-sm ${
          sortBy === "price"
            ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
            : "text-gray-600 bg-white border border-black dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <IndianRupee className="h-4 w-4 mr-1" />
        Price
      </button>
      <button
        onClick={() => setSortBy("distance")}
        className={`flex items-center px-3 py-1 rounded-full text-sm ${
          sortBy === "distance"
            ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
            : "text-gray-600 bg-white border border-black dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <MapPin className="h-4 w-4 mr-1" />
        Distance
      </button>
    </div>
  );

  const BookingModal = ({ isOpen, closeModal, doctor }) => {
    const timeSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
    ];

    const renderStep = () => {
      switch (bookingStep) {
        case 1:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Select Consultation Type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setSelectedConsultationType("video");
                    setBookingStep(2);
                  }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType === "video"
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                  }`}
                >
                  <Video className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                  <span className="block text-sm font-medium">
                    Video Consultation
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ₹{doctor.price} for 30 mins
                  </span>
                </button>
                <button
                  onClick={() => {
                    setSelectedConsultationType("clinic");
                    setBookingStep(2);
                  }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedConsultationType === "clinic"
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                  }`}
                >
                  <Stethoscope className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                  <span className="block text-sm font-medium">
                    Clinic Visit
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ₹{doctor.price + 200} for 30 mins
                  </span>
                </button>
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Select Date
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(7)].map((_, index) => {
                  const date = addDays(new Date(), index);
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date);
                        setBookingStep(3);
                      }}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedDate &&
                        format(selectedDate, "yyyy-MM-dd") ===
                          format(date, "yyyy-MM-dd")
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                      }`}
                    >
                      <span className="block text-sm font-medium">
                        {format(date, "EEE")}
                      </span>
                      <span className="block text-lg font-semibold mt-1">
                        {format(date, "d")}
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        {format(date, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Select Time Slot
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setBookingStep(4);
                    }}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedTimeSlot === slot
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                    }`}
                  >
                    <span className="block text-sm font-medium">{slot}</span>
                  </button>
                ))}
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Payment Details
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Consultation Fee</span>
                  <span>
                    ₹
                    {selectedConsultationType === "clinic"
                      ? doctor.price + 200
                      : doctor.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Platform Fee</span>
                  <span>₹50</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {selectedConsultationType === "clinic"
                        ? doctor.price + 250
                        : doctor.price + 50}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Payment Method
                </label>
                <div className="space-y-2">
                  {["UPI", "Card", "Net Banking"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        paymentMethod === method
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                      }`}
                    >
                      <span className="font-medium">{method}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Book Appointment
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {renderStep()}

                  <div className="mt-6 flex justify-between">
                    {bookingStep > 1 && (
                      <button
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Back
                      </button>
                    )}
                    {bookingStep === 4 && (
                      <button
                        onClick={() => {
                          // Handle payment and booking confirmation
                          closeModal();
                          // Show success message
                        }}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                      >
                        Confirm & Pay
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const handleBooking = (doctor, type) => {
    setSelectedDoctor(doctor);
    setSelectedConsultationType(type);
    setBookingStep(1);
    setIsBookingModalOpen(true);
  };

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={7}
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

      {/* Main content */}

      <main
        className={`flex-1 p-8 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto py-8 px-4">
          {/* Header (keep the same as before) */}
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              className="text-4xl font-bold text-center text-pink-600 dark:text-pink-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Expert Consultations
            </motion.h2>
          </div>

          {/* Enhanced Search Section */}
          {isLoaded && (
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Find Nearby Gynecologists
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <div className="relative flex items-center">
                    <input
                      id="search"
                      type="text"
                      placeholder="Enter location or 'Near Me'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pl-3 pr-24 py-2 text-gray-900 bg-white dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-900"
                    />
                    <div className="absolute right-0 flex space-x-1">
                      <button
                        onClick={() => handleSearch()}
                        disabled={isSearching}
                        className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50"
                      >
                        {isSearching ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={getUserLocation}
                  disabled={isSearching}
                  className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50"
                >
                  <MapPin className="inline-block mr-2 h-4 w-4" />
                  Near Me
                </button>
              </div>

              {searchError && (
                <div className="text-red-500 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {searchError}
                </div>
              )}

              <div className="h-96 w-full rounded-lg overflow-hidden relative">
                {isSearching && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-white h-8 w-8" />
                  </div>
                )}
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapCenter}
                  zoom={12}
                  onLoad={onMapLoad}
                  onDragEnd={handleMapDrag}
                >
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={marker.location}
                      onClick={() => setSelectedMarker(marker)}
                    >
                      {selectedMarker?.id === marker.id && (
                        <InfoWindow
                          onCloseClick={() => setSelectedMarker(null)}
                        >
                          <div className="p-2 text-sm">
                            <h3 className="font-semibold">{marker.name}</h3>
                            <p>Rating: {marker.rating || "N/A"}</p>
                            <p>Address: {marker.address}</p>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>
              </div>
            </motion.div>
          )}

          {/* Inside the main content section, after the search section */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-white bg-[#e73e8f] dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
            >
              <Filter className="h-5 w-5" />
              <span className="text-white ">{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
            <button
              onClick={() =>
                setSortBy(sortBy === "rating" ? "distance" : "rating")
              }
              className="flex items-center space-x-2 bg-[#e73e8f] text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
            >
              <ArrowUpDown className="h-5 w-5" />
              <span className="text-white">Sort</span>
            </button>
          </div>

          <FilterSection
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
          />
          <SortingControls sortBy={sortBy} setSortBy={setSortBy} />

          {/* Doctors List (keep the same as before) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isSearching ? (
              Array(6)
                .fill()
                .map((_, i) => <DoctorCardSkeleton key={i} />)
            ) : apiDoctors.length > 0 ? (
              apiDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 col-span-full py-8">
                No doctors found. Try adjusting your search criteria.
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedDoctor && (
        <BookingModal
          isOpen={isBookingModalOpen}
          closeModal={() => {
            setIsBookingModalOpen(false);
            setSelectedDoctor(null);
            setSelectedDate(null);
            setSelectedTimeSlot(null);
            setSelectedConsultationType(null);
            setBookingStep(1);
            setPaymentMethod("");
          }}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}
