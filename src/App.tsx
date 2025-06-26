"use server";

import "./App.css";
import { LoginForm } from "./components/login-form";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <span className="flex items-end justify-end fixed top-2 right-2 z-50">
          <ModeToggle />
        </span>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm className="sm:text-sm lg:text-base" />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
