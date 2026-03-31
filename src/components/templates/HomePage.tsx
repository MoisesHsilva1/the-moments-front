import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-black">
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-12">
        <article>
          <h1 className="flex flex-col items-center justify-center text-center tracking-tight">
            <span className="mb-2 text-2xl font-medium text-gray-300 md:text-3xl">
              A resenha mais
            </span>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text py-2 text-6xl font-extrabold text-transparent sm:text-7xl md:text-8xl">
              divertida
            </span>
            <span className="mt-4 text-xl font-medium text-gray-400 sm:text-2xl md:text-3xl max-w-md md:max-w-none text-balance">
              sobre os picos da cidade.
            </span>
          </h1>
        </article>

        <article>
          <Button
            className="size-14 rounded-full mt-6 hover:scale-105 hover:opacity-95 active:scale-100"
            onClick={() => navigate('/posts')}
          >
            <ArrowDown className="size-6 text-white" strokeWidth={2.5} />
          </Button>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
