document.querySelector('#buttoncode').onclick = CodeFunction;
document.querySelector('#buttondecode').onclick = DecodeFunction;

function CodeFunction()
{
    document.querySelector('#ans').value = '';
    let text = document.querySelector('#simpletext').value;
    let key = document.querySelector('#key1').value;
    console.log("I'm key = "+key + " " + typeof(key));
    document.querySelector('#key2').value = key;

    let codestr = '';
    for (let i = 0; i < text.length; i++)
    {
        codestr += String.fromCharCode((text[i].charCodeAt())^Number(key));
    }
    console.log(codestr);
    document.querySelector('#codetext').value = codestr;

    if (text === '') //проверка пустых полей
    {
        let t = document.getElementById("simpletext");
        t.classList.add("empty");
        setTimeout(function (){
            t.classList.remove("empty");
        }, 2000);
    }
    if (key === '')
    {
        let k = document.getElementById("key1");
        k.classList.add("empty");
        setTimeout(function (){
            k.classList.remove("empty");
        }, 2000);
    }
    if(text === '' || key === '')
    {
        return;
    }
}

String.fromCharCode("D".charCodeAt()^12)

function DecodeFunction()
{
    let text = document.querySelector('#codetext').value;
    let key = document.querySelector('#key2').value;
    let decode = '';
    for (let i = 0; i < text.length; i++)
    {
        decode += String.fromCharCode((text[i].charCodeAt())^Number(key));
    }
    document.querySelector('#ans').value = decode;
}
