interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-top bg-white mt-auto ${className || ''}`}>
      <div className="container py-3 text-center">
        <small className="text-muted">© 2026 Illinois Department of Central Management Services. All rights reserved.</small>
      </div>
    </footer>
  );
}
