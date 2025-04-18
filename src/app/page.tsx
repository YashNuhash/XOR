import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import TextHoverEffectDemo from "@/components/text-hover-effect-demo";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative h-full w-full bg-black">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <main>
                <HeroSection />
            </main>
            <Features />
            <TextHoverEffectDemo />
        </div>
    );
}
