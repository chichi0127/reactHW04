import { useState } from "react";
import ImgInputRevised from "./ImgInputRevised";

function Eachproduct({ revisedProduct, deleteProduct, product, onClose }) {

    const [showRevisedModal, setShowRevisedModal] = useState(false);
    const [revisedModal, setRevisedModal] = useState({
        title: product.title,
        category: product.category,
        origin_price: product.origin_price,
        price: product.price,
        unit: product.unit,
        description: product.description,
        content: product.content,
        is_enabled: product.is_enabled,
        imageUrl: product.imageUrl,
        imagesUrl: product.imagesUrl,
    });

    const handleRevisedImgUrl = (index, value) => {
        const newImages = [...revisedModal.imagesUrl];
        newImages[index] = value;

        setRevisedModal({
            ...revisedModal,
            imagesUrl: newImages
        });
    }

    const addRevisedImg = () => {
        setRevisedModal({
            ...revisedModal,
            imagesUrl: [...revisedModal.imagesUrl, '']
        });
    };

    const deleteRevisedImg = () => {
        const newImages = [...revisedModal.imagesUrl];
        newImages.pop();
        setRevisedModal({
            ...revisedModal,
            imagesUrl: newImages
        });
    };

    const handleRevisedProduct = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = value;
        if (name === 'origin_price' || name === 'price') {
            finalValue = Number(value);
        }
        if (type === 'checkbox') {
            finalValue = checked ? 1 : 0;
        }
        setRevisedModal({
            ...revisedModal,
            [name]: finalValue
        });
    };


    if (!product) return null;


    return (

        <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-semibold text-center" id="staticBackdropLabel">{product.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">

                        <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                        <div className='d-flex justify-content-between align-items-center '>
                            {product.imagesUrl.map((img, index) =>

                                <div className='col-2' key={`display-img-${index}`} >
                                    <img src={img} alt={`產品編號${index + 1}`} className=' img-fluid' />
                                </div>

                            )}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title my-2 fw-semibold">產品名稱：{product.title}</h5>
                            <h5 className="card-title my-2 fw-semibold">分類：{product.category}</h5>
                            <p className="card-text">{product.content}</p>
                            <p className="card-text">原價：<span className='text-decoration-line-through'>{product.origin_price}</span></p>
                            <p className="card-text fs-5">售價：<span className='text-danger fw-semibold'>{product.price}</span></p>
                        </div>

                    </div>
                    <div className="modal-footer">

                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => setShowRevisedModal(true)}>編輯</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteProduct(product.id)}>刪除</button>

                    </div>
                </div>
            </div>
            {
                showRevisedModal && <div className="modal fade show " style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
                    <div className="modal-dialog " style={{ maxWidth: '60%' }}>
                        <div className="modal-content">
                            <div className="modal-header bg-color">
                                <h1 className="modal-title fs-5 fw-bold text-center  text-light" id="staticBackdropLabel">修改產品</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setShowRevisedModal(false) }} ></button>
                            </div>
                            <div className="modal-body">
                                <div className='container-fluid'>
                                    <div className="row">
                                        <div className="col-5">
                                            <ImgInputRevised revisedModal={revisedModal} handleRevisedProduct={handleRevisedProduct} handleRevisedImgUrl={handleRevisedImgUrl} addRevisedImg={addRevisedImg} deleteRevisedImg={deleteRevisedImg} />
                                        </div>
                                        <div className="col-7">
                                            <label htmlFor="title" className="form-label">標題</label>
                                            <input id='title' name='title' className="form-control" value={revisedModal.title} type="text" onChange={handleRevisedProduct} placeholder="請輸入產品名稱"  ></input>
                                            <div className="row g-2 pb-4 border-bottom">
                                                <div className="col-6 ">
                                                    <label htmlFor="category" className="form-label pt-2">類別
                                                    </label>
                                                    <input id='category' name='category' value={revisedModal.category} onChange={handleRevisedProduct} className="form-control " type="text" placeholder="請輸入類別"  ></input>
                                                    <label htmlFor="unit" className="form-label pt-2">單位</label>
                                                    <input id='unit' name='unit' value={revisedModal.unit} onChange={handleRevisedProduct} className="form-control" type="number" placeholder="請輸入單位"  ></input>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="origin_price" className="form-label pt-2">原價</label>
                                                    <input id='origin_price' value={revisedModal.origin_price} name='origin_price' onChange={handleRevisedProduct} className="form-control" type="number" placeholder="請輸入原價"  ></input>
                                                    <label htmlFor="price" className="form-label pt-2">售價</label>
                                                    <input id='price' name='price' value={revisedModal.price} onChange={handleRevisedProduct} className="form-control" type="number" placeholder="請輸入售價"  ></input>
                                                </div>

                                            </div>
                                            <label htmlFor="description" className="form-label pt-2">產品描述</label>
                                            <input id='description' value={revisedModal.description} name='description' onChange={handleRevisedProduct} className="form-control" type="text" placeholder="請輸入產品描述"  ></input>
                                            <label htmlFor="content" className="form-label pt-2">說明內容</label>
                                            <input id='content' value={revisedModal.content} name='content' onChange={handleRevisedProduct} className="form-control" type="text" placeholder="請輸入說明內容"  ></input>
                                            <div className="form-check pt-4">
                                                <input name='is_enabled' checked={revisedModal.is_enabled} onChange={handleRevisedProduct} className="form-check-input" type="checkbox" id="checkEnable" />
                                                <label className="form-check-label" htmlFor="checkEnable">
                                                    是否啟用
                                                </label>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-color">

                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => { setShowRevisedModal(false) }}>取消</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e) => revisedProduct(product.id, revisedModal)} >確認修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    );

}

export default Eachproduct