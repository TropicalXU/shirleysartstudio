//COOKIE STORAGE JAVASCRIPT CODE-->

    const cookieStorage = {
       getItem: (item) => {
           const cookies = document.cookie
               .split(';')
               .map(cookie => cookie.split('='))
               .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
           return cookies[item];
       },
       setItem: (item, value) => {
           document.cookie = `${item}=${value};`
       }
   }
   
   const storageType = cookieStorage;
   const consentPropertyName = 'shirleys_studio';
   const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
   const saveToStorage = () => storageType.setItem(consentPropertyName, true);
   
   window.onload = () => {
   
       const acceptFn = () => {
           saveToStorage(storageType);
           consentPopup.classList.add('hidden');
       }
   
       const closeFn = () => {
          consentPopup.classList.add('hidden');
       }
       const closeBtn = document.querySelector('.close-btn');
       const consentPopup = document.getElementById('consent-popup');
       const acceptBtn = document.getElementById('accept');
       acceptBtn.addEventListener('click', acceptFn);
       closeBtn.addEventListener('click', closeFn)
   
       if (shouldShowPopup(storageType)) {
           setTimeout(() => {
               consentPopup.classList.remove('hidden');
              
           }, 2000);
       }
   
    
   };
   
