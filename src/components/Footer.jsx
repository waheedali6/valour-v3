import React from 'react'
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa6'

const Footer = () => {
    return (
        <section className='footer'>
            <footer>
                <div className="container">
                    <div className="mid-footer">
                        <div className="row">
                            <div className="col-md-4">
                                <img src="/images/logo.png" alt="Footer Logo" />
                                <p className='footer-desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptates? Iusto optio temporibus perspiciatis eligendi ipsam error aspernatur velit quos.</p>
                            </div>
                            <div className="col-md-4">
                                <ul>
                                    <li><a className='footer-link' href="/">Home</a></li>
                                    <li><a className='footer-link' href="/">About</a></li>
                                    <li><a className='footer-link' href="/">Our Shop</a></li>
                                    <li><a className='footer-link' href="/">Blog</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className="row border-row">
                                    <div className="col-md-6">
                                        <div className="link-box">
                                            <a className='footer-link2' href="/">Historical models</a>
                                            <a className='footer-link2' href="/">Pre-Owned</a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="link-box">
                                            <a className='footer-link2' href="/">Servicing</a>
                                            <a className='footer-link2' href="/">Book an appointment</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-row two">
                                    <div className="col-md-6">
                                        <div className="link-box two">
                                            <p className='footer-p'>Follow Us</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="icon-box">
                                            <a href="/"><FaFacebook /></a>
                                            <a href="/"><BsTwitter /></a>
                                            <a href="/"><BsInstagram /></a>
                                            <a href="/"><BsYoutube /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-row two border-0">
                                    <div className="col-md-6">
                                        <div className="link-box">
                                            <a className='footer-link2' href="mailto:info@valourwatches.com">info@valourwatches.com</a>
                                            <a className='footer-link2' href="tel:+1 236 598 9866">+1 236 598 9866</a>
                                            <a className='footer-link2' href="/">24/7 Customer Care</a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="link-box">
                                            <a className='footer-link2' href="/">Client Services</a>
                                            <a className='footer-link2' href="/">Purchase Policies</a>
                                            <a className='footer-link2' href="/">Watch Warranty</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="container">
                            <div className="inner-footer">
                                <p>Copyright @ 2026 Valour Watches-All Right Reserved</p>
                                <div>
                                    <a href="/">Privacy Policy</a>&nbsp;-&nbsp;<a href="/">Terms &amp; Conditions</a>&nbsp;-&nbsp;<a href="/">Warranty Policy</a>
                                </div>
                            </div>
                        </div>
                </div>

            </footer>
        </section>
    )
}

export default Footer
