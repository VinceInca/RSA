function RSA() {
  let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 
    43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 
    107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167,
    173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
    239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
    311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 
    379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 
    443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 
    599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 
    751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 
    829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 
    919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
  ];

  let p = primes[Math.floor(Math.random() * primes.length)];
  let q = primes[Math.floor(Math.random() * primes.length)];

  let N = p * q;
  let V = (p - 1) * (q - 1);


  function gcd(a, b) {
    while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  let nPriv;
  for (let i = 2; i < V; i++) {
    if (gcd(i, V) === 1) {
      nPriv = i;
      break;
    }
  }


  let nPub = 1;
  while ((nPriv * nPub) % V !== 1) {
    nPub++;
  }



  document.getElementById("campoP").value = p;
  document.getElementById("campoQ").value = q;
  document.getElementById("campoN").value = N;
  document.getElementById("campoV").value = V;
  document.getElementById("npriv").value = nPriv;
  document.getElementById("campoNPub").value = nPub;
}




function calcolaHash(testo) {
  let h1 = 2;
  let h2 = 1;

  for (let i = 0; i < testo.length; i++) {
    let codice = testo.charCodeAt(i);
    h1 = (h1 * 31 * codice) % 1000000;
    h2 = (h2 * 156 * codice) % 1000000;
  }

  let hash = (h1 ^ h2) % 10000;
  return hash;
}



function firmaMessaggio() {
  let messaggio = document.getElementById("campoMessaggio").value;
  let nPriv = parseInt(document.getElementById("npriv").value);
  let N = parseInt(document.getElementById("campoN").value);


  let hash = calcolaHash(messaggio);
  let firma = (BigInt(hash) ** BigInt(nPriv)) % BigInt(N);

  document.getElementById("campoHash").value = hash;
  document.getElementById("campoFirma").value = firma.toString();
}


function preparaVerifica() {
  document.getElementById("campoMessaggioVerifica").value = document.getElementById("campoMessaggio").value;
  document.getElementById("campoFirmaVerifica").value = document.getElementById("campoFirma").value;
}


function verificaFirma() {
  let messaggio = document.getElementById("campoMessaggioVerifica").value;
  let firma = BigInt(document.getElementById("campoFirmaVerifica").value);
  let nPub = BigInt(document.getElementById("campoNPub").value);
  let N = BigInt(document.getElementById("campoN").value);


  let nuovoHash = BigInt(calcolaHash(messaggio));


  let hashDecriptato = (firma ** nPub) % N;


  let risultato;
  if (hashDecriptato === nuovoHash) {
    risultato = "✅ Firma valida: messaggio autentico e integro.";
  } else {
    risultato = "❌ Firma NON valida: il messaggio è stato alterato.";
  }

  document.getElementById("campoRisultato").value = risultato;
}
