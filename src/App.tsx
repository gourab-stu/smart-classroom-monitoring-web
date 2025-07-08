import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "@/components/auth/login-form";
import { Dashboard } from "@/pages/Dashboard";
import { useAuthStore } from "@/store/auth";
import { Toaster } from "sonner";

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster theme="system" />
      <span className="fixed top-2 right-2 z-50">
        <ModeToggle />
      </span>
      {accessToken ? <Dashboard /> : <LoginForm />}
    </ThemeProvider>
  );
}

export default App;
