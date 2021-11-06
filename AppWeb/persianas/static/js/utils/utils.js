const apiRequests = (url) => {
	const adminUrl = '/administradores/crud'
	const clientsUrl = '/clientes/crud'
	const productsUrl = '/productos/crud'
	const brandsUrl = '/marcas/crud'
	const categorysUrl = '/categorias/crud'
	const ordersUrl = '/pedidos/crud'
	const cancellationsUrl = '/cancelaciones/crud'
	
	class apiRequest {
		url
		
		constructor(url) {
			this.url = url
		}
		
		get = (params) => {
			return $.get(this.url, params);
		}
		
		post = (params) => {
			return $.post(this.url, params);
		}
		
		postwImage = (params) => {
			return $.ajax({
				url: this.url,
				type: 'post',
				data: params,
				contentType: false,
				processData: false
			})
		}
		
		setAdminUrl = () => {
			this.url = adminUrl
		}
		
		setProductsUrl = () => {
			this.url = productsUrl
		}
		
		setBrandsUrl = () => {
			this.url = brandsUrl
		}
		
		setCategorysUrl = () => {
			this.url = categorysUrl
		}
		
		setOrdersUrl = () => {
			this.url = ordersUrl
		}
		
		setCancellationsUrl = () => {
			this.url = cancellationsUrl
		}
		
	}
	return new apiRequest(url)
}