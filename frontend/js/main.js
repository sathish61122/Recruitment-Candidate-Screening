function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";

    setTimeout(() => {
        toast.className = "";
    }, 3000);
}
console.log("Frontend Loaded");