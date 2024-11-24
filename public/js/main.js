// Copy code block buttons
const btns = document.querySelectorAll("button.markdown-it-code-copy");
const clipboard = new ClipboardJS(btns);

clipboard.on("success", function (e) {
  let innerHTML = e.trigger.innerHTML;
  e.trigger.innerHTML = "Copied!";
  setTimeout(() => {
    e.trigger.innerHTML = innerHTML;
  }, 3000);
});