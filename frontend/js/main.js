function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = "";
    }, 300);
}
console.log("Frontend Loaded");
