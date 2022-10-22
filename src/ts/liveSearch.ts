const search = document.querySelector(".search") as HTMLInputElement;
search!.addEventListener('input', () => {
    let text: string = search!.value.trim().toLowerCase();
    let cardArr = document.querySelectorAll(".card") ;
    cardArr.forEach((elem=>{
        if (text !== "") {
                let cardTittle = elem.querySelector(".card__tittle") as HTMLInputElement;
                if (cardTittle!.innerText.toLowerCase().search(text) === -1) {
                    elem.classList.add("hide")
                } else {
                    elem.classList.remove("hide")
                }
        }else{
            elem.classList.remove("hide");
        }
    }))
});
