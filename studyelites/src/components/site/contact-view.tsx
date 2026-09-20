"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BackBar } from "@/components/site/back-bar";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import type { PageId } from "@/lib/products";

export function ContactView({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email and message.",
        variant: "destructive",
      });
      return;
    }

    // Basic email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Front-end-only demo: no backend storage. In production, send this to
      // an email service or support ticketing system.
      await new Promise((r) => setTimeout(r, 600));
      toast({
        title: "Message sent",
        description:
          "We'll get back to you at the email you provided. For urgent access issues, also write to ankushjha4806@gmail.com.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <BackBar currentLabel="Contact" onBack={() => onNavigate("home")} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-2">
        <Badge
          variant="outline"
          className="border-blue-300 dark:border-blue-700 bg-background text-blue-700 dark:text-blue-300"
        >
          Contact
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact us
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          For access issues, refund requests or any question about your
          purchase, send us a message below or email
          ankushjha4806@gmail.com. Please include your order ID where
          possible.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="size-5 text-blue-600" />
              Send a message
            </CardTitle>
            <CardDescription>
              We typically respond within 3 business days.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What is this about?"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us a bit more. If you have an order ID, please include it."
                  rows={5}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="mt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Send className="size-4" />
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="size-5 text-blue-600" />
                Support email
              </CardTitle>
              <CardDescription>For any purchase-related query.</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:ankushjha4806@gmail.com"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                ankushjha4806@gmail.com
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                Please include your order ID and payment ID for the fastest
                resolution.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="size-5 text-blue-600" />
                Operations
              </CardTitle>
              <CardDescription>India · online-only store</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-relaxed text-muted-foreground">
                StudyElites operates as an online-only digital store. We do not
                have a physical walk-in office. All products are delivered
                electronically.
              </p>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-xs text-blue-900 dark:text-blue-100">
            <p>
              This contact form is a front-end demo. For guaranteed delivery,
              also email <strong>ankushjha4806@gmail.com</strong> directly with
              your order ID.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
