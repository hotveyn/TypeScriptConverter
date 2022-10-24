(() => {
    const cardsDiv = document.querySelector(".cards");

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

    function CurrencyCardDiff(diffAmount: number, nominal: number, charCode: string): string {
        // get arrow icon;
        const arrow: string = diffAmount < 0
            ? `<i class="fa fa-arrow-down" aria-hidden="true"></i>`
            : `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;

        //generate class to display price increment / decrement;
        let className: string = 'diff-amount';
        diffAmount < 0 ? className += " red" : className += " green";

        // return element to display on page;
        return `<p class="inc form ${className}" > 
                ${nominal} <span class="char-code">${charCode}</span> 
                    <span >
                        <span class="diffA">(${diffAmount})</span> ${arrow}
                    </span>
                    <div class="separate"></div>
                </p>`
    }

    function CurrencyCard(currency: oneOfValutes): string {
        // get currency difference
        const diff: string = (currency.Value - currency.Previous).toFixed(2);
        return `
                <div class="card">
                    <p class="card__tittle">${currency.Name}</p>
                    <div class="change-container" >
                            ${CurrencyCardDiff(Number(diff), currency.Nominal, currency.CharCode)}
                        <p class=""><span class="currency-value">${currency.Value.toFixed(2)}</span> <span class="current-currency">RUB</span></p>
                    </div>
                </div>`;
    }

    function generateCards(cardsData: JSONWithValutes): void {
        for (let key in cardsData.Valute) {
            cardsDiv!.innerHTML += CurrencyCard(cardsData.Valute[key]);
        }
    }

    function changeCurrency(data: any): void {

        const currMenuP = document.querySelectorAll(".currency-menu p");
        const currButP = document.querySelector(".currency-name")!;

        currMenuP.forEach((menuValutes) => {

            // add event that tracks the selected currency in the currency button
            //         and changes the rate ratio in the currency cards
            menuValutes.addEventListener("click", function () {
                currButP!.textContent = menuValutes.textContent;
                let cards = cardsDiv!.querySelectorAll(".card");

                // in each card changes its exchange value to the selected currency
                cards!.forEach(function (card) {
                    card = card!;

                    // Calculated with formula:
                    // Rate of A currency to B currency = (Rate of A currency to RUB) / (Rate of B currency to RUB)

                    let cardCurrency = card.querySelector(".current-currency")!;
                    let chosenCurrencyText:string = currButP.textContent!;
                    let currValue = card.querySelector(".currency-value")!;
                    let charCode = card.querySelector(".char-code")!;

                    if (chosenCurrencyText !== "RUB") {

                        let valueA: number = data.Valute[charCode.textContent!].Value;
                        let valueB: number = data.Valute[chosenCurrencyText!].Value;
                        currValue.textContent = (valueA / valueB).toFixed(2);

                        cardCurrency.textContent = chosenCurrencyText;
                        let previousA: number =
                            data.Valute[charCode!.textContent!].Previous;
                        let previousB: number = data.Valute[chosenCurrencyText!].Previous;


                        card.querySelector(".diffA")!.textContent = `(${(
                            Number((valueA / valueB).toFixed(2)) - Number((previousA / previousB).toFixed(2))
                        ).toFixed(2)})`;

                    } else {
                        let A: number = data.Valute[charCode.textContent!].Value;
                        let AOld: number =
                            data.Valute[card.querySelector(".char-code")!.textContent!].Previous;

                        currValue.textContent = A.toFixed(2);
                        cardCurrency.textContent = "RUB";
                        card.querySelector(".diffA")!.textContent = `(${(A - AOld).toFixed(
                            2
                        )})`;
                    }
                });
            });
        });
    }

    async function getCurrencies(): Promise<void> {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const json = await res.json();
        generateCards(json);
        changeCurrency(json);
    }

    getCurrencies();
})();
