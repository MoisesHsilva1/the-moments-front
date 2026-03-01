import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="relative flex flex-col w-full min-h-screen bg-black items-center justify-center overflow-hidden">
        <img
          src="/assets/Gradients.png"
          alt="Not Found Background"
          className="absolute   object-contain  pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-8xl font-bold text-white">404 Not Found</h1>
          <Button
            size="lg"
            className="mt-4"
            onClick={() => {
              navigate("/home");
            }}
          >
            Voltar para Home
          </Button>
        </div>
      </main>
    </>
  );
};
export default NotFound;
