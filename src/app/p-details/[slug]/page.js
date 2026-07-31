
import "./pdetails.css"
import PageTransition from "@/components/PageTransition";
import ScrollProvider from "@/components/ScrollProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Product from "./components/Product";

export default async function Page({params}) {
   const {slug} = await params;


    return (
        <div className="min-h-full flex flex-col home" style={{ overflow: 'hidden', height: '100vh' }}>
            <PageTransition />
            <ScrollProvider>
                <Header />
                <Product productName={slug}/>
                <div className="snap-section">
                    <Footer />
                </div>
            </ScrollProvider>
        </div>
    );
}