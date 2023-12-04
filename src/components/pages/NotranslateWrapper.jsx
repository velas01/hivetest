// NotranslateWrapper.jsx
import React from 'react';

const NotranslateWrapper = ({ children, excludeServices }) => {
  React.useEffect(() => {
    // Add 'notranslate' class to the body element, excluding Services if needed
    if (!excludeServices) {
      document.body.classList.add('notranslate');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('notranslate');
    };
  }, [excludeServices]); // Run this effect when excludeServices changes

  return <>{children}</>;
};

export default NotranslateWrapper;