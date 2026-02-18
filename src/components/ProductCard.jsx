
function ProductCard({ product, setSelectProduct }) {
    return (
        < div className="card text-center mx-auto my-3" style={{ width: "18rem" }}>
            <img src={product.imageUrl} className="card-img-top" alt={product.title} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={() => setSelectProduct(product)}>詳細內容</button>
            </div>
        </div>
    )
}

export default ProductCard