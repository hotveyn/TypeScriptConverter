(() => {
    const cards = document.querySelector(".cards");

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
                ${nominal} ${charCode}
                    <span >
                        (${diffAmount}) ${arrow}
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
                        <p class="to">${currency.Value.toFixed(2)} RUB</p>
                    </div>
                </div>`;
    }

    function generateCards(cardsData: JSONWithValutes): void {
        for (let key in cardsData.Valute) {
            cards!.innerHTML += CurrencyCard(cardsData.Valute[key]);
        }
    }

    async function getCurrencies(): Promise<void> {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const json = await res.json();
        generateCards(json);
    }

    getCurrencies();
})();
