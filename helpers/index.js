function generarIdRandom() {
    var longitud = 8;
    var caracteres = '0123456789abcdef';
    var idRandom = '';
  
    for (var i = 0; i < longitud; i++) {
      var indice = Math.floor(Math.random() * caracteres.length);
      idRandom += caracteres.charAt(indice);
    }
  
    return idRandom;
}

export {generarIdRandom}