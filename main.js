let deInput = document.getElementById('germ'),
    ruInput = document.getElementById('rus'),
    inputs = document.querySelectorAll('input'),
    table = document.getElementById('table'),
    saveTable = document.getElementById('btn');
let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

let addWord = index =>{
    table.innerHTML += `
    <tr>
        <td> ${words[index].word} </td>
        <td> ${words[index].translation} </td>
    </tr> `;
}

words.forEach((item, index) => {
    addWord(index);
});

class TrnsObj {
    constructor (word, translation){
        this.word = word;
        this.translation = translation;
    }
};

const reset = () => {
    for(input of inputs){
        input.value = '';
    }
}

const addToTable = () =>{
    if(
        deInput.value.length < 1 || 
        ruInput.value.length < 1 ||
        !isNaN(deInput.value) ||
        !isNaN(ruInput.value)
    ){
        for (let input of inputs){
            input.classList.add('error');
        }
    }else{
        for (let input of inputs){
            input.classList.remove('error');
        }
        words.push(new TrnsObj(deInput.value, ruInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWord(words.length-1);
    }
}

saveTable.addEventListener('click', addToTable);
saveTable.addEventListener('click', reset);

document.addEventListener('keypress', event => {
    if(event.keyCode === 13){
       addToTable();
       reset();
    }
});

table.addEventListener('click', event => {
    let tableRow = event.target.closest('tbody'); 
    for(let i = 0; i < table.children.length; i++){
        if(tableRow === table.children[i]){
            words.splice(words.indexOf(words[i]),1);
            localStorage.setItem('words', JSON.stringify(words));
            table.removeChild(tableRow);
        } 
    }
})

