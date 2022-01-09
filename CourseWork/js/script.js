import BigNumber from "./bignumber.mjs";
document.querySelector('#buttoncode').onclick = CodeFunction;
document.querySelector('#buttondecode').onclick = DecodeFunction;

let KEYS;
let EncryptStr;

const isCoprime = (a, b) => {
    let num;
    while ( b ) {
        num = a % b;
        a = b;
        b = num;
    }
    if (Math.abs(a) == 1) {
        return true;
    }
    return false;
}



const isPrime = (n) => {
    for (let i = 2; i < n; i++)
    {
        if (n % i == 0){
            return false
        }
    }
    return true
}

const findE = (phi) => {
    for (let i = 2; i<phi; i++)
    {
        if (isPrime(i))
        {
            if (isCoprime(i,phi)) return i;
        }
    }
    return 0;
}

const findD = (e,phi) => {

    for(let i = 1;i<1000000;i++)
    {
        if ((i*e)%phi == 1) return i
    }
    return 0;
}

const GenerateKey = (p,q) => {

    if (isPrime(p) && isPrime(q)){
        let n = p*q;
        let phi = (p-1)*(q-1);
        let e = findE(phi);
        let d = findD(e,phi);
        return {
            publicKey: {e,n},
            privateKey: {d,n}
        };
    }
    else return
}

$("#ppkeys").on("click",()=>{
    let p = Number($("#p").val());
    let q = Number($("#q").val());
    let keys = GenerateKey(p,q);
    KEYS = keys;
    $(".p").text(p);
    $(".q").text(q);
    $(".n").text(keys.publicKey.n);
    $(".e").text(keys.publicKey.e);
    $(".d").text(keys.privateKey.d);
    $("#epub").text(keys.publicKey.e);
    $("#npub").text(keys.publicKey.n);
    $("#dpriv").text(keys.privateKey.d);
    $("#npriv").text(keys.privateKey.n);
})

const getArray = (str) => {
    let A = [];
    for (let i = 0; i < str.length; i++)
    {
        A.push(str[i].charCodeAt());
    }
    return A;
}

const getString = (array) => {
    let str = '';
    for (let i=0; i < array.length; i++){
        str += String.fromCharCode(array[i])
    }
    return str
}

const encrypt = (publicKey, str) => {
    let e = publicKey.e;
    let n = publicKey.n;
    let array = getArray(str);
    let encarray = [];
    for (let i = 0; i < array.length; i++)
    {
        let num = new BigNumber(array[i]).pow(e).mod(n);
        encarray.push(num.toNumber());
    }
    console.log(encarray)
    return getString(encarray);
}

const decrypt = (privateKey, str) => {
    let d = privateKey.d;
    let n = privateKey.n;
    let encarray = getArray(str);
    let array = [];
    for (let i = 0; i < encarray.length; i++)
    {
        let num = new BigNumber(encarray[i]).pow(d).mod(n);
        array.push(num.toNumber());
    }
    return getString(array);
}

$("#enc").on("click", ()=> {
    let text = $("#stext").val();
    EncryptStr = encrypt(KEYS.publicKey, text)
    $("#shtext").text(EncryptStr);

});

$("#dec").on("click", ()=>{
    $("#dshtext").text(decrypt(KEYS.privateKey, EncryptStr));
})

function CodeFunction()
{
    document.querySelector('#ans').value = '';
    let text = document.querySelector('#simpletext').value;
    let key = document.querySelector('#key1').value;
    document.querySelector('#key2').value = key;
    let codestr = '';
    key = key.repeat(Math.ceil(text.length/key.length));
    for (let i = 0; i < text.length; i++)
    {
        codestr += String.fromCharCode((text[i].charCodeAt())^Number(key[i]));
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

function DecodeFunction()
{
    let text = document.querySelector('#codetext').value;
    let key = document.querySelector('#key2').value;
    let decode = '';
    key = key.repeat(Math.ceil(text.length/key.length));
    for (let i = 0; i < text.length; i++)
    {
        decode += String.fromCharCode((text[i].charCodeAt())^Number(key[i]));
    }
    document.querySelector('#ans').value = decode;
}


