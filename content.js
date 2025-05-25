console.log("🔄 Extension loaded. Watching for 'Stay logged out'...");

let isLogoutClicked = null;

const observer = new MutationObserver((mutations, obs) => {
  const elements = document.querySelectorAll('button, a, div, span');
  //console.log("Observing chat gpt for 'Stay logged out'");
  for (let el of elements) {
    if (el.textContent.trim() === "Stay logged out") {
      el.click();
      console.log("✅ Clicked 'Stay logged out'");
      obs.disconnect(); // Stop observing
      //clearTimeout(timeoutId); // Cancel the timeout
	  isLogoutClicked = true;
      return;
    }
  }
});

// Start observing changes to the entire document body
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Stop observing after 15 seconds if not found
const timeoutId = setTimeout(() => {
  observer.disconnect();
  if(isLogoutClicked){
      console.log("⏱️ 'Stay logged out' already clicked.");
  }else{
      console.log("⏱️ Gave up after 15 seconds. 'Stay logged out' not found.");
  }
}, 15000);
