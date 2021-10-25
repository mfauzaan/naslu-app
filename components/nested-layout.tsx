import Nav from './Nav';
import dynamic from 'next/dynamic'

const NestedLayout = ({ children, pageProps }: any) => {
  return (
    <div>
      <Nav pageProps={pageProps} />
      <div className="mx-auto my-8 px-2 max-w-7xl sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default NestedLayout;
