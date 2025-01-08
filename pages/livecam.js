import { useState } from "react";
import Header from "../components/Header";
import LiveCamCalculator from "../components/LiveCamCalculator";
import Footer from "../components/Footer";

export default function LiveCam() {
  return (
    <div className="min-h-screen bg-black text-white mt-12">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Video Player Section */}
        <section className="mb-16 relative">
          <div className="aspect-video max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden relative">
            {/* Statisches Rauschen Effekt */}
            <div className="absolute inset-0 noise-effect"></div>
            
            {/* Offline Message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#e3cbaa] mb-4">
                  Offline
                </h2>
                <p className="text-xl text-[#d0b48f]">
                  Buche jetzt deine private Show
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-20 pt-8 mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#e3cbaa] mb-8">
            Live Cam Preisrechner
          </h2>
          <LiveCamCalculator />
        </section>
      </main>

      <Footer />
    </div>
  );
} 