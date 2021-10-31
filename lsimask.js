/**
 * @name LSIMask
 *
 * @description Mascara para campos de formulários com gatilho personalizável
 *
 * @author Felipe "LipESprY" Moraes <felipemdeoliveira@live.com>
 *
 * @param elem QueryString do campo a ser utilizado a máscara
 *
 * @method .cpf()           define máscara para CPF;
 * @method .cnpj()          define máscara para CNPJ;
 * @method .cpfcnpj()       define máscara para CPF e CNPJ no mesmo campo;
 * @method .cep()           define máscara para CEP;
 * @method .tel()           define máscara para telefone `(dd)nnnn-nnnn` ou
 * `(dd)9nnnn-nnnn`;
 * @method .dataBr()        define máscara para data no formato BR: dd/mm/aaaa;
 * @method .addEvent(ev)    define o evento para executar a máscara - deve ser
 * chamado após o método da máscara;
 *
 * @example
 * // Mascara para CPF com gatilho ao inserir/remover caracteres do campo:
 * LSIMask('#input_cpf').cpf().addEvent('input');`
 *
 * @example
 * // Mascara para CEP com gatilho ao alterar o valor do campo:
 * LSIMask('#input_cep').cep().addEvent('change');`
 *
 * @returns LSIMaskObj
 *
 * @see https://github.com/lipespry/lsimask-js
 *
 * @license https://github.com/lipespry/lsimask-js/blob/main/LICENSE
 */
 const LSIMask = (() => {
    const LSIMaskObj = function (elem) {
        this.elem = document.querySelector(elem);
        this.fMask = null;

        this.cpf = () => {
            this.fMask = () => {
                this.val(/\D+/g, '');
                this.val(/(\d{3})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d{1,2})/, '$1-$2');
                this.val(/^(\d{3}\.\d{3}\.\d{3}\-\d{2})(.+)$/, '$1');
            }
            return this;
        }

        this.cnpj = () => {
            this.fMask = () => {
                this.val(/\D+/g, '');
                this.val(/(\d{2})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d)/, '$1/$2');
                this.val(/(\d{4})(\d{1,2})/, '$1-$2');
                this.val(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})(.+)$/, '$1');
            }
            return this;
        }

        this.cpfcnpj = () => {
            this.fMask = () => {
                this.val(/\D+/g, '');
                this.val(/(\d{3})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d{1,2})/, '$1-$2');
                if (this.elem.value.length > 14) {
                    console.log(this.elem.value.length);
                    this.val(/\D+/g, '');
                    this.val(/(\d{2})(\d)/, '$1.$2');
                    this.val(/(\d{3})(\d)/, '$1.$2');
                    this.val(/(\d{3})(\d)/, '$1/$2');
                    this.val(/(\d{4})(\d{1,2})/, '$1-$2');
                    this.val(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})(.+)/, '$1');
                }
            }
            return this;
        }

        this.cep = () => {
            this.fMask = () => {
                this.val(/\D/g, '');
                this.val(/(\d{2})(\d)/, '$1.$2');
                this.val(/(\d{3})(\d)/, '$1-$2');
                this.val(/^(\d{2}\.\d{3}\-\d{3})(.+)$/, '$1');
            }
            return this;
        }

        this.tel = () => {
            this.fMask = () => {
                this.val(/\D/g, '');
                this.val(/(\d{2})(\d)/, '($1)$2');
                if (this.elem.value.length < 13)
                    this.val(/(\d{4})(\d)/, '$1-$2');
                else
                    this.val(/(\d{5})(\d{4})/, '$1-$2');
                    this.val(/^(\(\d{2}\)\d{5}\-\d{4})(.+)$/, '$1');
            }
            return this;
        }

        this.dataBr = () => {
            this.fMask = () => {
                this.val(/\D/g, '');
                this.val(/(\d{2})(\d)/, '$1/$2');
                this.val(/(\d{2})(\d{1,4})/, '$1/$2');
                this.val(/^(\d{2}\/\d{2}\/\d{4})(.+)$/, '$1');
            }
            return this;
        }

        this.val = (sv, re) => {
            this.elem.value = this.elem.value.replace(sv, re);
        }

        this.addEvent = (event) => {
            this.elem.addEventListener(
                event,
                this.fMask,
                false
            );
        }
    }

    return (elem) => new LSIMaskObj(elem);
})();
