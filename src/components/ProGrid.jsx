"use client";


import { useState, useEffect, useRef, useCallback } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast, { Toaster } from 'react-hot-toast';
import SplitType from "split-type";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/features/cart/cartSlice";
import { useRouter } from "next/navigation";



// ─── Watch Data ─────────────────────────────────────────────────────────────
const watches = [
  {
    id: 1,
    ref: "LUC-01",
    name: "Sunseeker Yellow",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "yellow",
    image: "/images/watch-1.png",
    accent: "#FACC15",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
  {
    id: 2,
    ref: "LUC-02",
    name: "Nova Red",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "red",
    image: "/images/watch-4.png",
    accent: "#EF4444",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
  {
    id: 3,
    ref: "LUC-03",
    name: "Frost Silver",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "silver",
    image: "/images/watch-5.png",
    accent: "#D1D5DB",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
  {
    id: 4,
    ref: "LUC-04",
    name: "Eclipse Black",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "black",
    image: "/images/watch-6.png",
    accent: "#111827",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
  {
    id: 5,
    ref: "LUC-05",
    name: "Aurora Mint",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "mint",
    image: "/images/watch-3.png",
    accent: "#10B981",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
  {
    id: 6,
    ref: "LUC-06",
    name: "Astral Blue",
    subtitle: "Lucent Collection",
    collection: "lucent",
    range: "automatic",
    type: "automatic",
    material: "titanium",
    color: "blue",
    image: "/images/watch-2.png",
    accent: "#3B82F6",
    limited: false,
    price: 499,
    edition: null,
    quantity: 1,
  },
];



// ─── Filter Options ─────────────────────────────────────────────────────────
const filterOptions = {
  collection: [
    { value: "all", label: "All Collections" },
    { value: "lucent", label: "Lucent Collection" },
  ],

  type: [
    { value: "all", label: "All Types" },
    { value: "automatic", label: "Automatic" },
  ],

  material: [
    { value: "all", label: "All Materials" },
    { value: "titanium", label: "Grade 5 Titanium" },
  ],

  color: [
    { value: "all", label: "All Colors" },
    { value: "yellow", label: "Sunseeker Yellow" },
    { value: "red", label: "Nova Red" },
    { value: "silver", label: "Frost Silver" },
    { value: "black", label: "Eclipse Black" },
    { value: "mint", label: "Aurora Mint" },
    { value: "blue", label: "Astral Blue" },
  ],
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function HorizonTimepieces() {
  const router = useRouter();
  const sectionRef = useRef(null)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.value)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    if (!section) return

    // ===========================
    // SPLIT TEXT SETUP (BANNER)
    // ===========================
    const bannerTitle = new SplitType('.ht-header h1', { types: 'chars' })

    // ===========================
    // INITIAL STATES
    // ===========================
    // Banner title chars - staggered from bottom
    bannerTitle.chars?.forEach((char, i) => {
      char.style.display = 'inline-block'
      char.style.opacity = '0'
      char.style.transform = 'translateY(40px) rotateX(90deg)'
      char.style.transformOrigin = 'center bottom'
    })


    // ===========================
    // INTERSECTION OBSERVER
    // ===========================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Banner title - split reveal from bottom
          bannerTitle.chars?.forEach((char, i) => {
            setTimeout(() => {
              char.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
              char.style.opacity = '1'
              char.style.transform = 'translateY(0) rotateX(0deg)'
            }, i * 35)
          })

          // Unobserve after animation completes
          observer.unobserve(section)
        }
      })
    }, observerOptions)

    observer.observe(section)

    // Cleanup
    return () => {
      observer.disconnect()
      bannerTitle.revert?.()
    }
  }, [])
  const [activeFilters, setActiveFilters] = useState({
    collection: "all",
    type: "all",
    material: "all",
    color: "all",
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isListView, setIsListView] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const cardRefs = useRef([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // -----Filter Toggle-------------------------
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  }
  // ─── Filter Logic ───────────────────────────────────────────────────────
  const filteredWatches = products.filter((watch) => {
    return (
      (activeFilters.collection === "all" || watch.collection === activeFilters.collection) &&
      (activeFilters.type === "all" || watch.type === activeFilters.type) &&
      (activeFilters.material === "all" || watch.material === activeFilters.material) &&
      (activeFilters.color === "all" || watch.color === activeFilters.color)
    );
  });

  // -------AOS init----------------
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  // ─── Intersection Observer for entrance animations ────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setAnimatedCards((prev) => new Set([...prev, id]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredWatches.length, isListView]);

  // ─── Close dropdowns on outside click ───────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if clicking outside filter area
      if (!e.target.closest('.ht-filters-left')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFilterChange = useCallback((filterType, value, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveFilters((prev) => ({ ...prev, [filterType]: value }));
    setOpenDropdown(null);
  }, []);

  const handleReset = useCallback(() => {
    setActiveFilters({
      collection: "all",
      type: "all",
      material: "all",
      color: "all",
    });
  }, []);

  const clearFilter = useCallback((key) => {
    setActiveFilters((prev) => ({ ...prev, [key]: "all" }));
  }, []);

  const activeFilterEntries = Object.entries(activeFilters).filter(
    ([_, val]) => val !== "all"
  );

  const getFilterLabel = (type, value) => {
    const option = filterOptions[type]?.find((o) => o.value === value);
    return option ? option.label : value;
  };

  const toggleDropdown = (e, filterType) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === filterType ? null : filterType));
  };


  const handleCart = (w) => {
    try {
      dispatch(addToCart(w))
    } catch (error) {
      toast.error("Something went wrong.", error)
    }

  }

  return (
    <section className="ht-section" ref={sectionRef}>
      <div><Toaster position="bottom-right"
        reverseOrder={false} /></div>
      <div className="ht-glow-1" />
      <div className="ht-glow-2" />
      <div className="ht-noise" />

      <div
        className="container"
      >
        <div className="ht-header" data-aos="fade-up">
          <h1>
            <span>Valour</span> Watches
          </h1>
        </div>

        <div className="ht-filters-bar" data-aos="fade-down">
          <div className="ht-filters-inner">
            <div className="ht-filters-row">
              <div className="ht-filters-left">
                {isFilterOpen == false ? (
                  <div className="filter-toggle" onClick={() => toggleFilters()}>
                    <p>FILTERS</p>
                    <div className="icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="icon-other" onClick={() => toggleFilters()}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                    {

                      Object.entries(filterOptions).map(([filterType, options]) => (
                        <div key={filterType} style={{ position: "relative" }}>
                          <button
                            className={`ht-filter-btn ${activeFilters[filterType] !== "all" ? "active" : ""} ${openDropdown === filterType ? "open" : ""
                              }`}
                            onClick={(e) => toggleDropdown(e, filterType)}
                          >
                            <span>
                              {activeFilters[filterType] === "all"
                                ? filterType
                                : getFilterLabel(filterType, activeFilters[filterType])}
                            </span>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {openDropdown === filterType && (
                            <div className="ht-dropdown" onClick={(e) => e.stopPropagation()}>
                              <div className="ht-dropdown-inner">
                                {options.map((opt) => (
                                  <button
                                    key={opt.value}
                                    className="ht-dropdown-item"
                                    onClick={(e) => handleFilterChange(filterType, opt.value, e)}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                        </div>
                      ))
                      
                    }
                    <button className="ht-reset-btn" onClick={handleReset}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            <span>Reset</span>
                          </button>
                  </>
                )}

              </div>


            </div>

            {activeFilterEntries.length > 0 && (
              <div className="ht-active-filters">
                {activeFilterEntries.map(([key, val]) => (
                  <span key={key} className="ht-active-filter-pill">
                    <span className="pill-label">{key}</span>
                    <span className="pill-value">{val}</span>
                    <button onClick={() => clearFilter(key)} aria-label={`Clear ${key} filter`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredWatches.length === 0 ? (
          <div className="ht-empty">
            <div className="ht-empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3>No watches found</h3>
            <p>Adjust your filters to explore our collection</p>
          </div>
        ) : (
          <div className={`ht-grid ${isListView ? "ht-list-view" : ""}`}>
            {filteredWatches.map((watch, index) => (
              <div
                key={watch.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-id={watch.id}
                className={`ht-card ${animatedCards.has(watch.id) ? "animated" : ""}`}
                style={{ animationDelay: `${index * 80}ms` }}
                // onClick={() => handleCart(watch)}
                onClick={() => router.push("/product-details")}
              >
                <div className="ht-card-inner">
                  <div className="ht-card-glow" />

                  {watch.limited && (
                    <div className="ht-limited-badge">
                      <span>Limited</span>
                    </div>
                  )}

                  <div className="ht-image-wrap">
                    <div className="ht-shimmer" />
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="ht-card-img"
                      loading="lazy"
                    />
                    <div className="ht-hover-overlay">
                      <div className="ht-hover-content">
                        <div className="ht-hover-line">
                          <div className="line" />
                          <span>Explore</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ht-card-info">
                    <div className="ht-card-header">
                      <div>
                        <p className="ht-card-ref">{watch.ref}</p>
                        <h3 className="ht-card-name">{watch.name}</h3>
                      </div>
                      <div className="ht-card-arrow">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="ht-card-subtitle">{watch.subtitle}</p>
                    <div className="ht-card-specs">
                      <span>{watch.material}</span>
                      <div className="dot" />
                      <span>{watch.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}