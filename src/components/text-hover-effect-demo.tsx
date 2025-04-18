import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import FooterSection from "./footer"

export default function TextHoverEffectDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center bg-black">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <TextHoverEffect text="XOR" />
      <FooterSection />
    </div>
  )
}
