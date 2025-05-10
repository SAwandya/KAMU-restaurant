import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCheck, Clock, Mail } from "lucide-react"
import Link from "next/link"

export default function AwaitingApprovalPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Application Under Review</CardTitle>
          <CardDescription>Your restaurant registration is currently being reviewed by our team.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-start space-x-3">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">What happens next?</p>
                <p className="text-sm text-muted-foreground">
                  Our team will review your application and get back to you within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  We'll send you an email notification once your application is approved.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/login">Check Application Status</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
