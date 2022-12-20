const divCadastrar = document.getElementById("item-cadastrar");
const divVizualizar = document.getElementById("item-vizualizar");
const divAlterar = document.getElementById("item-atualizar");
const divExcluir = document.getElementById("item-excluir");

const table = document.getElementById("main-table");

const formCad = document.getElementById('form-cadastrar');
const formEx = document.getElementById('form-excluir');
const formAtu = document.getElementById('form-atualizar');

let options = ['Vizualizar', 'Alterar', 'Excluir'];

var cadastros = [
    ['001', 'Leonardo Silva', 19,'Developer'],
    ['002', 'Hugo Souza', 17, 'Estudante'],
    ['003', 'Ana Maia', 19, 'Desing'],
]

function verCadastrar(){
    divCadastrar.style.display = "block";
    divVizualizar.style.display = "none";
    divAlterar.style.display = "none";
    divExcluir.style.display = "none";
}

function verVizualizar(id){
    divCadastrar.style.display = "none";
    divVizualizar.style.display = "block";
    divAlterar.style.display = "none";
    divExcluir.style.display = "none";

    var pessoa;
    for(var i = 0; i < cadastros.length; i++){
        if(cadastros[i][0] == id){
            pessoa = cadastros[i];
        }
    }

    document.getElementById("nomeViz").value = pessoa[1];    
    document.getElementById("idadeViz").value = pessoa[2];    
    document.getElementById("profissaoViz").value = pessoa[3];
}

function verAlterar(id){
    divCadastrar.style.display = "none";
    divVizualizar.style.display = "none";
    divAlterar.style.display = "block";
    divExcluir.style.display = "none";

    var pessoa;
    for(var i = 0; i < cadastros.length; i++){
        if(cadastros[i][0] == id){
            pessoa = cadastros[i];
        }
    }

    document.getElementById("uidAtu").value = pessoa[0];
    document.getElementById("nomeAtu").value = pessoa[1];    
    document.getElementById("idadeAtu").value = pessoa[2];    
    document.getElementById("profissaoAtu").value = pessoa[3];
}

function verExcluir(id){
    divCadastrar.style.display = "none";
    divVizualizar.style.display = "none";
    divAlterar.style.display = "none";
    divExcluir.style.display = "block";

    var pessoa;
    for(var i = 0; i < cadastros.length; i++){
        if(cadastros[i][0] == id){
            pessoa = cadastros[i];
        }
    }

    document.getElementById("uidEx").value = pessoa[0];
    document.getElementById("nomeEx").value = pessoa[1];    
    document.getElementById("idadeEx").value = pessoa[2];    
    document.getElementById("profissaoEx").value = pessoa[3];
}

function atualizarTabela(){
    for(let i = 0; i < cadastros.length; i++){
        const tr = table.insertRow();
        for(let j = 0; j < cadastros[i].length + 1; j++){
            const td = tr.insertCell();
            if(j == cadastros[i].length){ 
                for(let k = 0; k < 3; k++){
                    var btn = document.createElement('input');
                    btn.type = "button";
                    if(options[k] == "Vizualizar"){
                        btn.className = "button-options vizualizar";
                    } else if(options[k] == "Alterar"){                        
                        btn.className = "button-options alterar";
                    } else{
                        btn.className = "button-options excluir";
                    }                    
                    btn.value = options[k];
                    if(options[k] == "Vizualizar"){
                        btn.onclick = (function() {return verVizualizar(cadastros[i][0])});
                    } else if(options[k] == "Alterar"){                        
                        btn.onclick = (function() {return verAlterar(cadastros[i][0])});
                    } else{
                        btn.onclick = (function() {return verExcluir(cadastros[i][0])});
                    }                  
                    td.appendChild(btn);
                }    
            }
            else{
                td.appendChild(document.createTextNode(cadastros[i][j]));
            }
                     
        }
    }
}

function limparTabela(){
    try {
        for(let x = 0; x < cadastros.length; x++){
            table.deleteRow(1);
        }
      } catch (error) {
        return;
      }
    
}

formCad.addEventListener('submit', function (event){
    event.preventDefault();
    cadastrar();
});

formEx.addEventListener('submit', function (event){
    event.preventDefault();
    excluir();
});

formAtu.addEventListener('submit', function (event){
    event.preventDefault();
    alterar();
});

function cadastrar(){    
    var pessoa = [];
    var uid;
    for(let j = 0; j < cadastros.length; j++){
        uid = parseInt(cadastros[j][0]) + 1;
    }
    
    uidComZero = ('000' + uid).substr(-3)
    pessoa.push(uidComZero);
    
    for(let i = 0; i < 3; i++){
        pessoa.push(formCad.elements[i].value);
    }

    cadastros.push(pessoa);

    limparTabela();
    atualizarTabela();
}

function excluir(){
    var uid = document.getElementById("uidEx").value;   
    for(let i = 0; i < cadastros.length; i++){
        if(uid === cadastros[i][0]){
            limparTabela();
            cadastros.splice(i, 1);
            atualizarTabela();            
        }
        
    }    
}

function alterar(){
    var uid = document.getElementById("uidAtu").value;   
    for(let i = 0; i < cadastros.length; i++){
        if(uid === cadastros[i][0]){
            for(let j = 0; j < 4; j++){
                cadastros[i][j] = formAtu.elements[j].value;
            }
            limparTabela();
            atualizarTabela();            
        }
        
    } 
}

atualizarTabela();
