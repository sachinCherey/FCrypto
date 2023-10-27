import React from 'react';

function ShareComponent() {
  const sharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share this page',
          text: 'Check out this page!',
          url: window.location.href, // Get the current page's URL
        });
      } else {
        alert('Sharing not supported on this device.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="share-component">
      <button onClick={sharePage}>Share Page</button>
    </div>
  );
}

export default ShareComponent;
