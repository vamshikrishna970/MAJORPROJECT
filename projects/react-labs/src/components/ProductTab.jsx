function Product({ title, features, oldPrice, newPrice }) {
  const discounted = newPrice < oldPrice;
  return (
    <article className={`product-card ${discounted ? "discounted" : ""}`}>
      <span className="badge">{discounted ? "Limited deal" : "New"}</span>
      <h3>{title}</h3>
      <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <p><s>₹{oldPrice.toLocaleString("en-IN")}</s> <strong>₹{newPrice.toLocaleString("en-IN")}</strong></p>
    </article>
  );
}

export default function ProductTab({ products }) {
  return (
    <>
      <h2>Products built with props</h2>
      <div className="product-grid">
        {products.map((product) => <Product key={product.title} {...product} />)}
      </div>
    </>
  );
}
