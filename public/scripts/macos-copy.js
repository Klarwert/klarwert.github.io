(function(){
  const btn = document.getElementById('copy-mac-cmd');
  const cmd = document.getElementById('mac-cmd');
  if(!btn || !cmd) return;
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(cmd.textContent.trim());
      btn.textContent = 'Kopiert';
      setTimeout(()=> btn.textContent = 'Kopieren', 1500);
    }catch(e){
      btn.textContent = 'Fehler';
      setTimeout(()=> btn.textContent = 'Kopieren', 1500);
    }
  });
})();
