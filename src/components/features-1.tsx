import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Code } from "lucide-react"
import type { ReactNode } from "react"

export default function Features() {
  return (
    <section className="relative h-full w-full bg-black py-16 md:py-32 text-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-gray-300 text-balance text-4xl font-bold lg:text-5xl">Make Coding Together an Enjoyable Experience</h2>
          <p className="mt-4 text-gray-300">Seamless Collaboration, Fully Customizable, and Intuitive Design for an enhanced development experience.</p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group bg-zinc-900/50 text-white border-zinc-800 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/20">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-gray-300">Collaborate</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-300">
              Empower teams to code together seamlessly with real-time collaboration tools, enhancing productivity and teamwork
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-zinc-900/50 text-white border-zinc-800 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/20">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-gray-300">Control</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-gray-300">
              Tailor the platform to your needs with extensive customization options, ensuring a personalized and efficient coding experience.
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-zinc-900/50 text-white border-zinc-800 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/20">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-gray-300">Continous Workflow</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-gray-300">
                Simplify your development process with tools designed to enhance collaboration and efficiency.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)30%,transparent)]">
    <div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"
    />
    <div aria-hidden className="bg-radial to-zinc-900 absolute inset-0 from-transparent to-75%" />
    <div className="bg-zinc-900 absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-zinc-700 group-hover:border-zinc-600 transition-colors duration-300">
      {children}
    </div>
  </div>
)
