(() => {
    let curr = document.querySelector(".valute_5") as HTMLInputElement;

    let currBut = curr!.querySelector("button") as HTMLInputElement;

    let currMenu = curr!.querySelector(".currency-menu") as HTMLInputElement;

    currBut!.addEventListener("click", function () {
        if (currMenu!.classList.contains("hide")) {
            currMenu!.classList.remove("hide");
            currMenu.setAttribute("style","display: grid;")
        } else {
            currMenu!.classList.add("hide");
            currMenu.setAttribute("style","display: none;")

        }

    });
})();
