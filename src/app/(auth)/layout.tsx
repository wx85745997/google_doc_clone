interface DocumentLayoutProps {
  children: React.ReactNode
}


const AuthLayout = ({ children }: DocumentLayoutProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="w-full bg-red-500">Auth navbar</nav>
      {children}
    </div>
  );
}

export default AuthLayout;