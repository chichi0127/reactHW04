
function ImgInputAdd({ addProduct, handleProduct, addImg, deleteImg, handleImgUrl }) {
    return (
        <>
            <label htmlFor="imgUrl" className="form-label">輸入主圖網址</label>
            <input id='imgUrl' name='imageUrl' value={addProduct.imageUrl} onChange={handleProduct} className="form-control" type="text" placeholder="請輸入主圖連結"  ></input>
            {addProduct.imagesUrl.map((imgUrl, index) => {
                return (
                    <div>
                        <label htmlFor={`imgUrl${index + 1}`} className="form-label pt-2">輸入圖片網址</label>
                        <input id={`imgUrl${index + 1}`} value={imgUrl} className="form-control" type="text" onChange={(e) => handleImgUrl(index, e.target.value)} placeholder={`請輸入圖片連結${index + 1}`}  ></input>
                    </div>
                )
            })
            }
            <div className='d-flex justify-content-evenly pt-2'>
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={addImg} >新增圖片</button>
                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={deleteImg} >刪除圖片</button>
            </div>
        </>
    )
}

export default ImgInputAdd