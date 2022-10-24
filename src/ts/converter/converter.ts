(() => {
    // type oneOfValutes = {
    //     ID: string,
    //     NumCode: string,
    //     CharCode: string,
    //     Nominal: number,
    //     Name: string,
    //     Value: number,
    //     Previous: number
    // }
    // type JSONWithValutes = {
    //     Valute: any[]
    // }

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

    function changeValutes(which:string): void {
        // Valutes that was chosen in currency button will appear in have__valutes block
        let currencyMenu = document.querySelector(`.${which}__currency-menu`)!;
        let valutesNode = which === "have"? haveValutesNode: wantValutesNode;
        currencyMenu.childNodes.forEach((currP) => {
            currP.addEventListener("click", () => {
                let ValuteArr: string[] = Array.from(valutesNode).map((a) => a.textContent!.trim());
                if(!ValuteArr.includes(currP.textContent!.trim())){
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
                }else{
                    for (let i = 0; i < valutesNode.length; i++) {
                        if(valutesNode[i].textContent!.trim() === currP.textContent!.trim()){
                            valutesNode.forEach((elem)=>{
                                elem.classList.remove("valute_chosen")
                            })
                            valutesNode[i].classList.add("valute_chosen")
                            break
                        }
                    }
                }
            })
        })
    }


    async function getCurrencies(): Promise<void> {
        //const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        //const json = await res.json();
        await chooseValute(haveValutesNode, chosenValuteHave); // For Have block
        await chooseValute(wantValutesNode, chosenValuteWant); // For Want block
        await changeValutes("have");
        await changeValutes("want");
    }

    getCurrencies();
})();

