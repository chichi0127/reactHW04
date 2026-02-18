import ImgInputAdd from './ImgInputAdd'

function Addproduct({ setShowAddModal, addProduct, handleProduct, sentProduct, addImg, deleteImg, handleImgUrl }) {
    return (
        <div className="modal fade show " style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog " style={{ maxWidth: '60%' }}>
                <div className="modal-content">
                    <div className="modal-header bg-color">
                        <h1 className="modal-title fs-5 fw-bold text-center  text-light" id="staticBackdropLabel">新增產品</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                            setShowAddModal(false);
                        }} ></button>
                    </div>
                    <div className="modal-body">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col-5">
                                    <ImgInputAdd addProduct={addProduct} handleProduct={handleProduct} addImg={addImg} deleteImg={deleteImg} handleImgUrl={handleImgUrl} />

                                </div>
                                <div className="col-7">
                                    <label htmlFor="title" className="form-label">標題</label>
                                    <input id='title' name='title' className="form-control" value={addProduct.title} type="text" onChange={handleProduct} placeholder="請輸入產品名稱"  ></input>
                                    <div className="row g-2 pb-4 border-bottom">
                                        <div className="col-6 ">
                                            <label htmlFor="category" className="form-label pt-2">類別
                                            </label>
                                            <input id='category' value={addProduct.category} name='category' onChange={handleProduct} className="form-control " type="text" placeholder="請輸入類別"  ></input>
                                            <label htmlFor="unit" className="form-label pt-2">單位</label>
                                            <input id='unit' value={addProduct.unit} name='unit' onChange={handleProduct} className="form-control" type="number" placeholder="請輸入單位"  ></input>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="origin_price" className="form-label pt-2">原價</label>
                                            <input id='origin_price' value={addProduct.origin_price} name='origin_price' onChange={handleProduct} className="form-control" type="number" placeholder="請輸入原價"  ></input>
                                            <label htmlFor="price" className="form-label pt-2">售價</label>
                                            <input id='price' value={addProduct.price} name='price' onChange={handleProduct} className="form-control" type="number" placeholder="請輸入售價"  ></input>
                                        </div>

                                    </div>
                                    <label htmlFor="description" className="form-label pt-2">產品描述</label>
                                    <input id='description' value={addProduct.description} name='description' onChange={handleProduct} className="form-control" type="text" placeholder="請輸入產品描述"  ></input>
                                    <label htmlFor="content" className="form-label pt-2">說明內容</label>
                                    <input id='content' value={addProduct.content} name='content' onChange={handleProduct} className="form-control" type="text" placeholder="請輸入說明內容"  ></input>
                                    <div className="form-check pt-4">
                                        <input name='is_enabled' value={addProduct.is_enabled} onChange={handleProduct} className="form-check-input" type="checkbox" id="checkEnable" />
                                        <label className="form-check-label" htmlFor="checkEnable">
                                            是否啟用
                                        </label>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-color">

                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" >取消</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={sentProduct} >確認</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Addproduct 