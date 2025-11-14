const res = await fetch("https://fakestoreapi.com/products");
const data = await res.json();
export default data;

