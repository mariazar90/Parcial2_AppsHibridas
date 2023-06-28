function createPage(title, content) {
    let html;
    
    html = '<!DOCTYPE html><html><head><meta charset="UTF-8">';
    html += '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
    html += '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'
    html += '<link rel="stylesheet" href="/css/styles.css">';
    html += "<title>" + title + "</title></head><body>";
    html += '<nav class="nav">'
    html += '<ul class="nav justify-content-center">'
    html += `<li class="nav-item"><a class="nav-link" href="/diet">Dietas</a> | <a href="/diet/new">Agregar Dieta</a></li>`
    html += '</ul>'
    html += '</nav>'
    html += content;
    html += `<footer><p>Parcial para la materia Apps Híbridas</p></footer>`
    html += '<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>'
    html += '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>'
    html += "</body></html>";
    return html;
  }

  export{
    createPage
  }