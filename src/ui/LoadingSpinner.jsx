import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-[#f4f7f5] flex flex-col items-center justify-center gap-4">
            <PulseLoader
                color="#1e4d3b"
                size={12}
                speedMultiplier={0.8}
            />
            <p className="text-sm text-[#1e4d3b] font-medium tracking-wide">
                Loading your friends...
            </p>
        </div>
    );
};

export default LoadingSpinner;