import Nav from './Nav';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto h-screen">{children}</div>
    </div>
  );
};

export default Layout;
