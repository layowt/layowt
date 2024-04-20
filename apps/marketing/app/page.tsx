import { TypewriterComponent } from '@/components/sign-up/typewriter';
import SignUpContent from '@/components/sign-up/sign-up-content';

export default function App() {
  return (
    <div className="min-w-[100vw] mx-auto h-screen overflow-hidden">
      {/** Main content */}
      <div className="flex items-center flex-col justify-center px-3.5 md:px-10  py-4 w-full h-full font-inter">
        <h2
          className="
              animate-text text-4xl md:text-6xl font-bold text-center z-20 
              bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text
            "
        >
          From idea to product, <br />
          <span className="flex items-center gap-x-3 justify-center mt-2">
            in
            <TypewriterComponent />
          </span>
        </h2>
        <p className="text-white text-center mt-4 text-sm md:text-lg font-inter w-3/5 md:w-auto">
          A drag and drop website builder, that{'  '}
          <span className="font-semibold text-electric-violet italic">
            actually{'  '}
          </span>
          {'  '}
          requires no code.
        </p>
        <SignUpContent />
      </div>
    </div>
  );
}
