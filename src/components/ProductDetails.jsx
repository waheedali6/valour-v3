"use client"
import React, { useEffect, useState, useRef } from 'react';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'aos/dist/aos.css';
import { ChevronDown, FileText } from 'lucide-react';
import { Fancybox } from '@fancyapps/ui';
import SplitType from 'split-type';
import AOS from 'aos';
import Link from 'next/link';

const ProductDetails = () => {
    const [activeImage, setActiveImage] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedEdition, setSelectedEdition] = useState('17/100');
    const [specsOpen, setSpecsOpen] = useState(false);

    // Animation refs
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const mainImageRef = useRef(null);

    // Product data
const product = {
    name: 'Sunseeker Yellow',
    subtitle: 'P-01 • Automatic Collection',
    tagline: 'Engineered for Everyday Adventure',
    price: 3200,
    description: [
        {
            text: 'The ',
            bold: 'Sunseeker Yellow',
            suffix: ' embodies the spirit of exploration and optimism, combining contemporary design with dependable Swiss-inspired craftsmanship.'
        },
        {
            text: 'Built with a lightweight ',
            bold: 'titanium case',
            suffix: ' and powered by a precision ',
            bold2: 'automatic movement',
            suffix2: ', it delivers exceptional reliability and smooth performance for every occasion.',
            bold3: 'Designed for modern lifestyles',
            suffix3: ', Sunseeker Yellow balances bold aesthetics with everyday practicality.'
        },
        {
            text: 'Distinctive, versatile, and unmistakably Valour—',
            bold: 'Sunseeker Yellow is made for those who move forward with confidence.'
        }
    ],

    thumbnails: [
        { id: 1, img: '/images/watch-1.png' },
        { id: 2, img: '/images/watch-2.png' },
        { id: 3, img: '/images/watch-3.png' },
        { id: 4, img: '/images/watch-4.png' },
        { id: 5, img: '/images/watch-5.png' },
        { id: 6, img: '/images/watch-6.png' }
    ],

    mainImage: '/images/watch-1.png',

    editions: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05'],

    specs: [
        { label: 'Case Material', value: 'Titanium' },
        { label: 'Case Diameter', value: '40mm' },
        { label: 'Case Thickness', value: '11.2mm' },
        { label: 'Movement', value: 'Automatic Mechanical' },
        { label: 'Power Reserve', value: '72 Hours' },
        { label: 'Water Resistance', value: '100m / 10 ATM' },
        { label: 'Strap Material', value: 'Premium Textile Strap' },
        { label: 'Crystal', value: 'Scratch-Resistant Sapphire' },
        { label: 'Dial Finish', value: 'Sunburst Yellow' },
        { label: 'Weight', value: '78g' },
        { label: 'Warranty', value: '5 Years International' }
    ]
};

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            mirror: false,
        });

        const section = sectionRef.current;
        if (!section) return;

        // ===========================
        // SPLIT TEXT SETUP
        // ===========================
        const productTitle = new SplitType('.product-title', { types: 'words,chars' });

        // Wrap words for title
        const titleWords = section.querySelectorAll('.product-title .word');
        titleWords.forEach(word => {
            word.style.overflow = 'hidden';
            word.style.display = 'inline-block';
        });

        // ===========================
        // INITIAL STATES
        // ===========================
        // Title chars - staggered from bottom
        productTitle.chars?.forEach((char, i) => {
            char.style.display = 'inline-block';
            char.style.opacity = '0';
            char.style.transform = 'translateY(40px) rotateX(90deg)';
            char.style.transformOrigin = 'center bottom';
        });

        // Description - fade + blur
        if (descriptionRef.current) {
            descriptionRef.current.style.opacity = '0';
            descriptionRef.current.style.transform = 'translateY(30px)';
            descriptionRef.current.style.filter = 'blur(8px)';
        }

        // Main Image - scale, rotate, blur
        if (mainImageRef.current) {
            mainImageRef.current.style.opacity = '0';
            mainImageRef.current.style.transform = 'scale(0.7) rotateY(-15deg) rotateX(10deg) translateZ(0)';
            mainImageRef.current.style.filter = 'blur(12px) brightness(0.8)';
        }

        // ===========================
        // INTERSECTION OBSERVER
        // ===========================
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Title - split reveal from bottom with stagger
                    productTitle.chars?.forEach((char, i) => {
                        setTimeout(() => {
                            char.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                            char.style.opacity = '1';
                            char.style.transform = 'translateY(0) rotateX(0deg)';
                        }, i * 35);
                    });

                    // Description - fade up with blur removal
                    if (descriptionRef.current) {
                        setTimeout(() => {
                            descriptionRef.current.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
                            descriptionRef.current.style.opacity = '1';
                            descriptionRef.current.style.transform = 'translateY(0)';
                            descriptionRef.current.style.filter = 'blur(0px)';
                        }, 200);
                    }

                    // Main Image - premium entrance
                    if (mainImageRef.current) {
                        setTimeout(() => {
                            mainImageRef.current.style.transition = 'all 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            mainImageRef.current.style.opacity = '1';
                            mainImageRef.current.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg) translateZ(0)';
                            mainImageRef.current.style.filter = 'blur(0px) brightness(1)';
                        }, 100);
                    }

                    // Unobserve after animation completes
                    observer.unobserve(section);
                }
            });
        }, observerOptions);

        observer.observe(section);

        // Cleanup
        return () => {
            observer.disconnect();
            productTitle.revert?.();
        };
    }, []);

    useEffect(() => {
        const newImg = product.thumbnails.find((item) => item.id == activeImage)
        setSelectedImage(newImg)

    }, [activeImage])

    

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };


    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {
            // options
        });

        return () => {
            Fancybox.destroy();
        };
    }, []);



    return (
        <>
            <section className="product-page" ref={sectionRef}>
                <div className="container">

                    <div className="row">
                        {/* Left Column - Images */}
                        <div className="col-lg-6">
                            <div className="d-flex gap-3">
                                {/* Thumbnails */}
                                <div className="thumbnail-sidebar d-none d-lg-flex" data-aos="fade-right">
                                    {product.thumbnails.map((thumb, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail-item ${activeImage - 1 == index ? 'active' : ''}`}
                                            onClick={() => setActiveImage(index + 1)}
                                        >
                                            <img src={thumb.img} alt={`View ${index + 1}`} loading="lazy" />
                                        </div>
                                    ))}
                                </div>

                                {/* Main Image */}
                                <div className='w-100'>
                                    <div
                                        className="main-image-container"
                                        ref={mainImageRef}
                                    >

                                        <a
                                            data-fancybox="gallery"
                                            href={selectedImage?.img}
                                        >
                                            <img
                                                src={selectedImage?.img}
                                                alt={product.name}
                                                style={{
                                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                                                }}
                                            />
                                        </a>

                                    </div>

                                    {/* Mobile Thumbnails */}
                                    <div className="thumbnail-sidebar d-flex d-lg-none mt-3">
                                        {product.thumbnails.map((thumb, index) => (
                                            <div
                                                key={index}
                                                className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                                                onClick={() => setSelectedImage(index)}
                                            >
                                                <img src={thumb} alt={`View ${index + 1}`} loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="col-lg-6">
                            <div className="ps-lg-4">
                                <h1 className="product-title" ref={titleRef}>
                                    {product.name}<br />{product.subtitle}
                                </h1>

                                <p className="tagline" data-aos="fade-up">{product.tagline}</p>

                                <div className="product-description" ref={descriptionRef}>
                                    {product.description.map((block, index) => (
                                        <p key={index} className="description-block">
                                            {block.text}
                                            {block.bold && <span className="highlight">{block.bold}</span>}
                                            {block.suffix}
                                            {block.bold2 && <span className="highlight">{block.bold2}</span>}
                                            {block.suffix2}
                                            {block.bold3 && <span className="highlight">{block.bold3}</span>}
                                            {block.suffix3}
                                        </p>
                                    ))}
                                </div>

                                {/* Technical Specs Accordion */}
                                <div className="specs-accordion" data-aos="fade-up">
                                    <div
                                        className="specs-header"
                                        onClick={() => setSpecsOpen(!specsOpen)}
                                        
                                    >
                                        <div className="specs-title">
                                            <FileText size={18} className="specs-icon" />
                                            Technical Specifications
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            className={`chevron-icon ${specsOpen ? 'rotate' : ''}`}
                                            style={{ color: 'var(--text-muted)' }}
                                        />
                                    </div>

                                    <div className={`specs-content ${specsOpen ? 'open' : ''}`}>
                                        {product.specs.map((spec, index) => (
                                            <div key={index} className="spec-row">
                                                <span className="spec-label">{spec.label}</span>
                                                <span className="spec-value">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Edition Selector */}
                                <div className="edition-section" data-aos="fade-up">
                                    <p className="edition-label">
                                        Watch Number: <span>{selectedEdition}</span>
                                    </p>
                                    <select
                                        className="edition-select"
                                        value={selectedEdition}
                                        onChange={(e) => setSelectedEdition(e.target.value)}
                                    >
                                        {product.editions.map((edition) => (
                                            <option key={edition} value={edition}>
                                                {edition}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Add to Cart Button */}
                                <Link href="/cart" className="add-to-cart-btn">
                                    <span>Add to cart</span>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="btn-divider"></span>
                                        <span className="btn-price">{formatPrice(product.price)}</span>
                                    </span>
                                </Link>

                                <div className="mobile-spacer d-block d-md-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;