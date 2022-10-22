(()=>{
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

    function CurrencyCardDiff(diffAmount:number):string {
        // get arrow icon;
        const arrow = diffAmount < 0
            ? `<i class="fa fa-arrow-down" aria-hidden="true"></i>`
            : `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;

        //generate class to display price increment / decrement;
        let className = 'diff-amount';
        diffAmount < 0 ? className += " red" : className += " green";

        // return element to display on page;
        return `<span class="${className}">
        ${arrow} (${diffAmount})
    </span>`
    }

    function CurrencyCard(currency:oneOfValutes):string {
        // get currency difference
        const diff:string = (currency.Value - currency.Previous).toFixed(2);
        return `<div">
                <div class="card">
                    <p class="card__tittle">${currency.Name}</p>
                    <div class="change-container" >
                        <p class="inc form" > 1 ${currency.CharCode}
                            ${CurrencyCardDiff(Number(diff))}
                        <div class="separate"></div></p>
                        <p class="to">${currency.Value.toFixed(2)} RUB</p>
                    </div>
                </div>
            </div>`;
    }
    function generateCards(cardsData:JSONWithValutes):void {
        for (let key in cardsData.Valute) {
            cards!.innerHTML += CurrencyCard(cardsData.Valute[key]);
        }
    }

    async function getCurrencies():Promise<void> {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const json = await res.json();
        generateCards(json);
    }
    getCurrencies();
})();
