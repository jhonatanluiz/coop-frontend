const LoaderService = {
    show: () => {
      const element = document.getElementById('loader');
      element.classList.add('show');
    },
  
    hide: () => {
      const element = document.getElementById('loader');
      element.classList.remove('show');
    }
  };
  
  export default LoaderService;
  