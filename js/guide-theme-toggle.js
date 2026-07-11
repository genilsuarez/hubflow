(function(){
  var btn=document.getElementById('guideThemeToggle');
  if(!btn)return;
  function upd(){var d=document.documentElement.getAttribute('data-theme')==='dark';btn.textContent=d?'☀️':'🌙';}
  upd();
  btn.addEventListener('click',function(){
    var isDark=document.documentElement.getAttribute('data-theme')==='dark';
    var next=isDark?'light':'dark';
    document.documentElement.setAttribute('data-theme',next==='dark'?'dark':'');
    localStorage.setItem('lp-theme',next);
    if(location.search.includes('theme=')){var u=new URL(location.href);u.searchParams.set('theme',next);history.replaceState(null,'',u);}
    upd();
  });
})();
