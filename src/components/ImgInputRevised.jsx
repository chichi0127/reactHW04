
function ImgInputRevised({ revisedModal, handleRevisedProduct, handleRevisedImgUrl, addRevisedImg, deleteRevisedImg }) {
    return (
        <>
            <label htmlFor="imgUrl" className="form-label">輸入主圖網址</label>
            <input id='imgUrl' name='imageUrl' value={revisedModal.imageUrl} onChange={handleRevisedProduct} className="form-control" type="text" placeholder="請輸入主圖連結"  ></input>
            {
                revisedModal.imagesUrl.map((imgUrl, index) => {
                    return (
                        <div key={`new-img${index}`}>
                            <label htmlFor={`imgUrl${index + 1}`} className="form-label pt-2">輸入圖片網址</label>
                            <input id={`imgUrl${index + 1}`} value={imgUrl} className="form-control" type="text" onChange={(e) => handleRevisedImgUrl(index, e.target.value)} placeholder={`請輸入圖片連結${index + 1}`}  ></input>
                        </div>
                    )
                })
            }
            <div className='d-flex justify-content-evenly pt-2'>
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={addRevisedImg} >新增圖片</button>
                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={deleteRevisedImg} >刪除圖片</button>
            </div>
        </>
    )
}

export default ImgInputRevised