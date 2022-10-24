(() => {





    let haveValutesNode = document.querySelectorAll(".have__valute")!;
    let wantValutesNode = document.querySelectorAll(".want__valute")!;

    let chosenValuteHave: string = document.querySelector(".have__valutes .valute_chosen")!.textContent!.trim();
    let chosenValuteWant: string = document.querySelector(".want__valutes .valute_chosen")!.textContent!.trim();

    function chooseValute(valutesNode: NodeListOf<Element>, haveOrWant: string, valutesData:JSONWithValutes): void {
        // Make valute button green and chosen when user click on them
        valutesNode.forEach((valute) => {
            valute.addEventListener("click", () => {
                haveOrWant === "have" ?
                    chosenValuteHave = valute.textContent!.trim() :
                    chosenValuteWant = valute.textContent!.trim();
                valutesNode.forEach((elem) => {
                    elem.classList.remove("valute_chosen");
                })
                valute.classList.add("valute_chosen");

                changeCurrency(valutesData);
            });
        })
    }

    function changeValutes(haveOrWant: string, valutesData:JSONWithValutes): void {
        // Valutes that was chosen in currency button will appear in have__valutes block
        let currencyMenu = document.querySelector(`.${haveOrWant}__currency-menu`)!;
        let valutesNode = haveOrWant === "have" ? haveValutesNode : wantValutesNode;
        currencyMenu.childNodes.forEach((currP) => {
            currP.addEventListener("click", () => {
                let ValuteArr: string[] = Array.from(valutesNode).map((a) => a.textContent!.trim());

                if (!ValuteArr.includes(currP.textContent!.trim())) {
                    for (let i = ValuteArr.length - 1; i > 0; i--) {
                        ValuteArr[i] = ValuteArr[i - 1];
                    }
                    ValuteArr[0] = currP.textContent!.trim();

                    // Change valute_chosen div on first
                    for (let i = 0; i < valutesNode.length; i++) {
                        valutesNode[i].textContent = ValuteArr[i];
                        valutesNode[i].classList.remove("valute_chosen");
                    }
                    valutesNode[0].classList.add("valute_chosen")
                    haveOrWant === "have" ?
                        chosenValuteHave = valutesNode[0].textContent!.trim() :
                        chosenValuteWant = valutesNode[0].textContent!.trim()

                    changeCurrency(valutesData);
                } else {
                    // If currency is already on the valutes block just choose it
                    valutesNode.forEach((elem) => {
                        elem.classList.remove("valute_chosen")
                    })
                    for (let i = 0; i < valutesNode.length; i++) {
                        if (valutesNode[i].textContent!.trim() === currP.textContent!.trim()) {
                            valutesNode[i].classList.add("valute_chosen")
                            haveOrWant === "have" ?
                                chosenValuteHave = valutesNode[0].textContent!.trim() :
                                chosenValuteWant = valutesNode[0].textContent!.trim()

                            break
                        }
                    }
                    changeCurrency(valutesData);
                }
            })
        })
    }

    // type oneOfValutes = {
    //     ID: string,
    //     NumCode: string,
    //     CharCode: string,
    //     Nominal: number,
    //     Name: string,
    //     Value: number,
    //     Previous: number
    // }
    type JSONWithValutes = {
        Valute : any[]
    }
    function changeCurrency(valutesData:JSONWithValutes): void {
        for (let key in valutesData.Valute){
            if(valutesData.Valute[key].CharCode === chosenValuteHave ){
                // let haveRate = document.querySelector(".have__rate")!;
                // let haveCharCode = haveRate.querySelector(".have__char-code")
                // let haveToNominal = haveRate.querySelector(".have__to-nominal")
                // let haveToCharCode = haveRate.querySelector(".have__to-char-code")
                // haveRate.innerHTML = `
                //       <span class="have__nominal">1</span>
                //       <span class="have__char-code">${valutesData.Valute[key].CharCode}</span> =
                //       <span class="have__to-nominal">${(valutesData.Valute[key].Nominal / valutesData.Valute[key].Value).toFixed(2)}</span>
                //       <span class="have__to-char-code">${valutesData.Valute[key].CharCode}</span>
                //       `;
            }if(valutesData.Valute[key].CharCode === chosenValuteWant ){
            }
        }
    }


    async function getCurrencies(): Promise<void> {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const json = await res.json();
        changeCurrency(json);

        chooseValute(haveValutesNode, "have",json); // For Have block
        chooseValute(wantValutesNode, "want",json); // For Want block

        changeValutes("have", json); // For Have block
        changeValutes("want", json); // For Want block
        // changeCurrencyRateWithClickOnValute("have", json);
        // changeCurrencyRateWithClickOnValute("want", json);
    }

    getCurrencies();
})();

