import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#d4af37",
          colorText: "#ffffff",
          colorBackground: "#000000",
        },
        elements: {
          card: "bg-black border border-accent/20",
          navbar: "bg-black",
          footer: "bg-black",
        }
      }}
    >
      {/* <AuthCelebration /> */}
      <App />
    </ClerkProvider>
  </StrictMode>
);
