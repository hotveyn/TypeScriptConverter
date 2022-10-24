(() => {
    let curr = document.querySelector(".currency") as HTMLInputElement;

    let currBut = curr!.querySelector("button") as HTMLInputElement;

    let currMenu = curr!.querySelector(".currency-menu") as HTMLInputElement;

    currBut!.addEventListener("click", function () {
        if (currMenu!.classList.contains("hide")) {
            currMenu!.classList.toggle("hide");
            currMenu.setAttribute("style","display: grid;")
        } else {
            currMenu!.classList.toggle("hide");
            currMenu.setAttribute("style","display: none;")

        }
    });
})();