// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let i = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.id = i;
        i++;
        newPost.addEventListener('click', ()=>{
          let postState = {name: 'post', id: newPost.id};
          history.pushState(postState, 'Entry', '#entry' + newPost.id);
          setState(postState);
          
        });
        document.querySelector('main').appendChild(newPost);
      });
      document.querySelector('header img').addEventListener('click', ()=>{
        let imgState = {name: "settings", id: -1};
        history.pushState(imgState, 'Setting', '#settings');
        setState(imgState);
      });
      document.querySelector('header h1').addEventListener('click', ()=>{
        let mainState = {name: 'main', id: 0};
        if(history.state != null && history.state.name != 'main'){
          history.pushState(mainState, 'main', location.origin);
          setState(mainState);
        }
      });
    });

      
});


window.addEventListener('popstate', (event)=>{
  setState(event.state);
})