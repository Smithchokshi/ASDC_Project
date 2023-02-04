const ServiceWorker = () => {
  const url = `${process.env.PUBLIC_URL}/pwa-sw.js`;
  navigator.serviceWorker.register(url).then(
    registration => {
      // Registration was successful
      // console.log('ServiceWorker registration successful with scope: ', registration.scope);
    },
    err => {
      // registration failed :(
      // console.log('ServiceWorker registration failed: ', err);
    }
  );
};

export default ServiceWorker;
