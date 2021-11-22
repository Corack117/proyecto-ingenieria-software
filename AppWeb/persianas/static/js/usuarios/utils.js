const requestCustomerPersianas = () =>  {
    url = '/clientes/crud/';
    return {
        'get': (params) => {
            return $.get(url);
        },
        'post': (params) => {
            return $.post(url,params);
        },
        'postwImage': (params) => {
            return $.ajax({
                url,
                type:'post',
                data:params,
                contentType: false,
                processData: false
            });
        }
    }
}

const requestAdminPersianas = () =>  {
    url = '/administradores/crud/';
    return {
        'get': (params) => {
            return $.get(url);
        },
        'post': (params) => {
            return $.post(url,params);
        },
    }
}