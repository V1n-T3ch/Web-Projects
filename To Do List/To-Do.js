let btn = document.getElementById("btn");
let input = document.getElementById("input");
let list = document.getElementById("todo");

btn.addEventListener('click', function(){
    if (input.value.trim() !== '') {
        var paragraph = document.createElement("p");
        paragraph.classList.add("paragraph-styling");
        paragraph.innerText = input.value;
        list.appendChild(paragraph);
        input.value = "";
        
        paragraph.addEventListener('click', function(){
            paragraph.classList.toggle("completed");
        });
        
        paragraph.addEventListener('dblclick', function(){
            list.removeChild(paragraph);
        });
    }
});
