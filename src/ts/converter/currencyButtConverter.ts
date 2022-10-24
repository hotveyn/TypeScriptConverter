(() => {
    const haveCurr = document.querySelector(".have__currency")!;
    const haveCurrBut = haveCurr.querySelector(".currency-butt")! as HTMLButtonElement;
    const haveCurrMenu = haveCurr.querySelector(".currency-menu")! as HTMLButtonElement;

    const wantCurr = document.querySelector(".want__currency")!;
    const wantCurrBut = wantCurr.querySelector(".currency__button")! as HTMLButtonElement;
    const wantCurrMenu = wantCurr.querySelector(".currency-menu")! as HTMLButtonElement;

    ShowHide(haveCurrBut, haveCurrMenu);
    ShowHide(wantCurrBut, wantCurrMenu);

    function ShowHide(but: HTMLButtonElement, menu: HTMLButtonElement) {
        but!.addEventListener("click", () => {
            if (menu!.classList.contains("hide")) {
                menu!.classList.toggle("hide");
                but.classList.toggle("valute_active");
                menu.setAttribute("style", "display: grid;")
            } else {
                menu!.classList.toggle("hide");
                but.classList.toggle("valute_active");
                menu.setAttribute("style", "display: none;")

            }
        })
    }
})();
