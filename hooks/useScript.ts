import * as React from 'react';

const useScript = (id: string, src: string) => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('id', id);
    script.src = src;
    script.async = true;

    document.body.appendChild(script);
    console.log('useScripta: ' + src);

    return () => script.remove();
  }, [id, src]);
};

export default useScript;
