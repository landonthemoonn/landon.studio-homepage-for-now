import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d740ea3c/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-d740ea3c/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message, newsletter } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log("Contact form validation error: Missing required fields");
      return c.json({ 
        success: false, 
        error: "Name, email, and message are required" 
      }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(`Contact form validation error: Invalid email format - ${email}`);
      return c.json({ 
        success: false, 
        error: "Invalid email format" 
      }, 400);
    }

    // Store contact submission
    const timestamp = new Date().toISOString();
    const contactKey = `contact:${timestamp}:${email}`;
    await kv.set(contactKey, {
      name,
      email,
      message,
      newsletter: newsletter || false,
      timestamp,
      status: "new"
    });

    // If newsletter signup, also store in newsletter list
    if (newsletter) {
      const newsletterKey = `newsletter:${email}`;
      await kv.set(newsletterKey, {
        email,
        name,
        subscribedAt: timestamp,
        source: "contact-form"
      });
      console.log(`Newsletter subscription added for ${email}`);
    }

    console.log(`Contact form submission successful: ${name} (${email})`);
    
    return c.json({ 
      success: true, 
      message: "Thank you for your message! We'll get back to you soon." 
    });
  } catch (error) {
    console.log(`Contact form submission error: ${error}`);
    return c.json({ 
      success: false, 
      error: "Failed to submit contact form. Please try again." 
    }, 500);
  }
});

// Newsletter signup endpoint (standalone)
app.post("/make-server-d740ea3c/newsletter", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name } = body;

    // Validate email
    if (!email) {
      console.log("Newsletter validation error: Missing email");
      return c.json({ 
        success: false, 
        error: "Email is required" 
      }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(`Newsletter validation error: Invalid email format - ${email}`);
      return c.json({ 
        success: false, 
        error: "Invalid email format" 
      }, 400);
    }

    // Check if already subscribed
    const existingKey = `newsletter:${email}`;
    const existing = await kv.get(existingKey);
    
    if (existing) {
      console.log(`Newsletter subscription already exists for ${email}`);
      return c.json({ 
        success: true, 
        message: "You're already subscribed to our newsletter!" 
      });
    }

    // Store newsletter subscription
    const timestamp = new Date().toISOString();
    await kv.set(existingKey, {
      email,
      name: name || "",
      subscribedAt: timestamp,
      source: "newsletter-form"
    });

    console.log(`Newsletter subscription successful: ${email}`);
    
    return c.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter!" 
    });
  } catch (error) {
    console.log(`Newsletter subscription error: ${error}`);
    return c.json({ 
      success: false, 
      error: "Failed to subscribe. Please try again." 
    }, 500);
  }
});

Deno.serve(app.fetch);