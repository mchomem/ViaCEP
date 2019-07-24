Index = {
    self: this
    , init: function() {
        self.$loading = document.querySelector('.loading');
        
        self.$txtCEP = document.getElementById('txtCEP');
        self.$txtCEP.value = '91230325';
        self.$btnCEP = document.getElementById('btnCEP');
        self.$txtEndereco = document.getElementById('txtEndereco');
        self.$txtCidade = document.getElementById('txtCidade');
        self.$txtBairro = document.getElementById('txtBairro');
        self.$selUF = document.getElementById('selUF');
        this.attachEvent();
    }
    , attachEvent: function() {
        self.$btnCEP.addEventListener('click', function() {
            self.$loading.setAttribute('style', 'display:block;');
            self.$btnCEP.setAttribute('disabled', 'disabled');
            Index.consultaCEP(self.$txtCEP.value);
            setTimeout(function() {
                self.$btnCEP.removeAttribute('disabled');
            }, 3000);
        });
    }

    , consultaCEP: function(cep) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                Index.obtemEndereco(JSON.parse(this.responseText));
                self.$loading.setAttribute('style', 'display:none;');
            }
        };
        
        xhttp.open('GET', 'http://viacep.com.br/ws/' + cep + '/json/', true);
        xhttp.send();
    }

    , obtemEndereco: function(endereco) {
        console.log(endereco);
        self.$txtEndereco.value = endereco.logradouro;
        self.$txtCidade.value = endereco.localidade;
        self.$txtBairro.value = endereco.bairro;
        self.$selUF.value = endereco.uf;
    }
}