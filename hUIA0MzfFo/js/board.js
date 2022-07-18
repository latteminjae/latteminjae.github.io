const sidebar = document.querySelector(".sidebar");
const sidebarToggleBtns = document.querySelector(".sidebarToggleBtn");
const sidebarToggleSwitch = document.querySelector(".sidebarToggleSwitch");

function sidebarToggle() {
    if (sidebar.classList.contains("on")) {
        sidebar.classList.remove("on");
        sidebar.classList.add("off");
        sidebarToggleBtns.classList.remove("on");
        sidebarToggleBtns.classList.add("off");
        sidebarToggleSwitch.checked = true;
        return;
    }

    sidebar.classList.remove("off");
    sidebar.classList.add("on");
    sidebarToggleBtns.classList.remove("off");
    sidebarToggleBtns.classList.add("on");
    sidebarToggleSwitch.checked = false;
}

sidebarToggleBtns.addEventListener("click", () => {
    sidebarToggle();
});

sidebarToggleSwitch.addEventListener("change", (e) => {
    sidebarToggle();
});
