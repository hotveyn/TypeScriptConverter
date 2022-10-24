(() => {
    type oneOfValutes = {
        ID: string,
        NumCode: string,
        CharCode: string,
        Nominal: number,
        Name: string,
        Value: number,
        Previous: number
    }
    type JSONWithValutes = {
        Valute: any[]
    }

    let chosenValuteHave: string = "";
    let chosenValuteWant: string = "";

    let haveValutesNode = document.querySelectorAll(".have__valute")!;
    let wantValutesNode = document.querySelectorAll(".want__valute")!;

    function chooseValute(valutesNode: NodeListOf<Element>, chosenValute: string): void {
        // Make valute button green and chosen when user click on them
        valutesNode.forEach((valute) => {
            valute.addEventListener("click", () => {
                chosenValute = valute.textContent!;

                valutesNode.forEach((elem) => {
                    elem.classList.remove("valute_chosen");
                })

                valute.classList.toggle("valute_chosen");

                console.log(chosenValute);
            })
        })
    }

    function changeValutes(): void {
        // Valutes that was chosen in currency button will appear in have__valutes block
        let currencyMenu = document.querySelector(".have__currency-menu")!;
        currencyMenu.childNodes.forEach((currP) => {
            currP.addEventListener("click", () => {
                let haveValuteArr: string[] = Array.from(haveValutesNode).map((a) => a.textContent!.trim());
                for (let i = haveValuteArr.length - 1; i > 0; i--) {
                    haveValuteArr[i] = haveValuteArr[i - 1];
                }
                haveValuteArr[0] = currP.textContent!.trim();

                // Change valute_chosen div on first
                for (let i = 0; i < haveValutesNode.length; i++) {
                    haveValutesNode[i].textContent = haveValuteArr[i];
                    haveValutesNode[i].classList.remove("valute_chosen");
                }
                haveValutesNode[0].classList.add("valute_chosen")




            })
        })
    }


    async function getCurrencies(): Promise<void> {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const json = await res.json();
        await chooseValute(haveValutesNode, chosenValuteHave); // For Have block
        await chooseValute(wantValutesNode, chosenValuteWant); // For Want block
        changeValutes();
    }

    getCurrencies();
})();

