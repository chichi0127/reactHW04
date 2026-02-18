import { useState, useEffect } from 'react'
import './assets/all.scss'
import axios from 'axios';

const apiPath = "https://ec-course-api.hexschool.io/v2/api/";

const BPtoken = document.cookie
  .replace(/(?:(?:^|.*;\s*)BPToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");



function Modal({ revisedProduct, deleteProduct, product, onClose }) {


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
  console.log(revisedModal.is_enabled);

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
              {product.imagesUrl.map(img =>

                <div className='col-2'>
                  <img src={img} alt="" className=' img-fluid' />
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
      {showRevisedModal && <div className="modal fade show " style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
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
                    <label htmlFor="imgUrl" className="form-label">輸入主圖網址</label>
                    <input id='imgUrl' name='imageUrl' value={revisedModal.imageUrl} onChange={handleRevisedProduct} className="form-control" type="text" placeholder="請輸入主圖連結"  ></input>
                    {revisedModal.imagesUrl.map((imgUrl, index) => {
                      return (
                        <div>
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
      </div>}
    </div>
  );
}



function App() {

  const [SelectProduct, setSelectProduct] = useState(null);


  const [Products, setProducts] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addProduct, setAddProduct] = useState({
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: [],
  });

  const handleProduct = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;
    if (name === 'origin_price' || name === 'price') {
      finalValue = Number(value);
    }
    if (type === 'checkbox') {
      finalValue = checked ? 1 : 0;
    }
    setAddProduct({
      ...addProduct,
      [name]: finalValue
      //如果不加中括號，JavaScript 會把它當成一個固定的名稱；加了中括號，它才會把它當成一個變數。
    });
  };

  const handleImgUrl = (index, value) => {
    const newImages = [...addProduct.imagesUrl];
    newImages[index] = value;

    setAddProduct({
      ...addProduct,
      imagesUrl: newImages
    });
  }

  const addImg = () => {
    setAddProduct({
      ...addProduct,
      imagesUrl: [...addProduct.imagesUrl, '']
    });
  };

  const deleteImg = () => {
    const newImages = [...addProduct.imagesUrl];
    newImages.pop();
    setAddProduct({
      ...addProduct,
      imagesUrl: newImages
    });
    return (
      <>
      </>
    )
  };



  const getData = async () => {
    axios.get(`${apiPath}hahablackpink/admin/products`, {
      headers: {
        Authorization: BPtoken
      }
    })
      .then((res) => {
        console.log("取得資料:", res);
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("取得資料時發生錯誤:", error);
      });
  };

  const sentProduct = async () => {
    axios.post(`${apiPath}hahablackpink/admin/product`, { data: addProduct }, {
      headers: {
        Authorization: BPtoken
      }
    })
      .then((res) => {
        console.log("新增資料:", res.data);
        setShowAddModal(false); // 關閉視窗

        getData(); // 重新整理列表
      })
      .catch((error) => {
        console.error("新增資料時發生錯誤:", error);
      });

  };

  const deleteProduct = async (id) => {
    axios.delete(`${apiPath}hahablackpink/admin/product/${id}`, {
      headers: {
        Authorization: BPtoken
      }
    })
      .then((res) => {
        console.log("刪除資料:", res);
        setSelectProduct(null); // 關閉視窗
        getData(); // 重新整理列表
      })
      .catch((error) => {
        console.error("刪除資料時發生錯誤:", error);
      });

  };

  const revisedProduct = async (id, revisedModal) => {
    axios.put(`${apiPath}hahablackpink/admin/product/${id}`, { data: revisedModal }, {
      headers: {
        Authorization: BPtoken
      }
    })
      .then((res) => {
        console.log("修改資料:", res.data);
        setSelectProduct(null)
        // setShowRevisedModal(false); // 關閉視窗
        getData(); // 重新整理列表
      })
      .catch((error) => {
        console.error("修改資料時發生錯誤:", error);
      });

  };









  useEffect(() => {
    getData();
  }
    , []);



  return (
    <>
      <div className='bg-color'>


        <h2 className='text-center pt-5 fw-bold text-light'>產品列表
        </h2>
        <div className="w-100 d-flex justify-content-end">
          <button className='mx-3 btn btn-primary' onClick={() => {
            setAddProduct({
              title: '',
              category: '',
              origin_price: 0,
              price: 0,
              unit: '',
              description: '',
              content: '',
              is_enabled: 0,
              imageUrl: '',
              imagesUrl: [],
            });
            setShowAddModal(true);
          }}> 新增產品
          </button>
        </div>
        {showAddModal && <div className="modal fade show " style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
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
        </div>}



        <div className='row'>
          {Products && Products.map(product =>
            < div key={product.id} className="card text-center mx-auto my-3" style={{ width: "18rem" }}>
              <img src={product.imageUrl} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={() => setSelectProduct(product)}>詳細內容</button>
              </div>
            </div>
          )}
        </div>
        {SelectProduct && <Modal addImg={addImg}
          deleteImg={deleteImg} revisedProduct={revisedProduct} deleteProduct={deleteProduct} product={SelectProduct} onClose={() => setSelectProduct(null)} />}

      </div >

    </>
  )
}

export default App
