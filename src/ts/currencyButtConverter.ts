(() => {
    const haveCurr = document.querySelector(".have__currency")!;
    const haveCurrBut = haveCurr.querySelector(".currency-butt")! as HTMLInputElement;
    const haveCurrMenu = haveCurr.querySelector(".currency-menu")! as HTMLInputElement;

    const wantCurr = document.querySelector(".want__currency")!;
    const wantCurrBut = wantCurr.querySelector(".currency__button")! as HTMLInputElement;
    const wantCurrMenu = wantCurr.querySelector(".currency-menu")! as HTMLInputElement;

    ShowHide(haveCurrBut, haveCurrMenu);
    ShowHide(wantCurrBut, wantCurrMenu);

    function ShowHide(but: HTMLInputElement, menu: HTMLInputElement) {
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
