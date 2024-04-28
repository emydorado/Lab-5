const getFakestore = async () => {
	try {
		const getData = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
		console.log(getData);
		return getData;
	} catch (error) {
		console.error(error);
	}
};

export default getFakestore;
