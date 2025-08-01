export function Watermark() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <img 
        src="/lovable-uploads/ed443ced-22f0-4bb1-91d8-924f4ac238ac.png" 
        alt="Watermark" 
        className="w-96 h-96 object-contain opacity-10"
      />
    </div>
  );
}