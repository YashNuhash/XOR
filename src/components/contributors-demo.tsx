"use client"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip2"
const people = [
  {
    id: 1,
    name: "Ashraful Nuhash",
    designation: "CSE @RMSTU",
    image:
      "https://i.imgur.com/GBZkd9f.png",
    link: "https://github.com/YashNuhash",
  },
  {
    id: 2,
    name: "Nafis Hasan",
    designation: "CSE @RMSTU",
    image:
      "https://i.imgur.com/bBP1Xzk.png",
    link:"https://github.com/NafisHasan2020",
  }
]

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      {people.map((person) => (
        <a key={person.id} href={person.link} target="_blank" rel="noopener noreferrer">
          <AnimatedTooltip items={[person]} />
        </a>
      ))}
    </div>
  )
}
