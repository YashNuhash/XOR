import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInput } from "@/components/ui/sidebar"

export function SidebarOptInForm() {
  return (
    <Card className="shadow-none">
      <form>
        <CardContent className="grid gap-2.5 p-4">
         <Button className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none" size="sm">
            Copy Room ID
          </Button> 
          <Button className="w-full bg-sidebar-foreground text-sidebar-primary-foreground shadow-none" size="sm">
            Leave Room
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
