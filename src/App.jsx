import { useState, useEffect } from 'react'
import './assets/all.scss'
import axios from 'axios';
import Addproduct from './components/Addproduct';
import Eachproduct from './components/Eachproduct';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;




function App() {

  const BPtoken = document.cookie
    .replace(/(?:(?:^|.*;\s*)BPToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");


  const [SelectProduct, setSelectProduct] = useState(null);
  const [pagination, setPagination] = useState();
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
  };


  const getData = async () => {
    try {
      const res = await axios.get(`${apiBase}v2/api/${apiPath}/admin/products`, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("取得資料:", res.data);
      setProducts(res.data.products);

    } catch (error) {
      console.error("取得資料時發生錯誤:", error.response
        .data);
    }

  };

  const goPage = async (pageLocation) => {

    try {
      const res = await axios.get(`${apiPath}hahablackpink/admin/products?page=${pageLocation}`, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("前往頁面:", res);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("前往頁面時發生錯誤:", error);
    }

  };

  const sentProduct = async () => {
    try {
      const res = await axios.post(`${apiBase}v2/api/${apiPath}/admin/product`, { data: addProduct }, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("新增資料:", res.data.message);
      setShowAddModal(false); // 關閉視窗
      getData(); // 重新整理列表

    } catch (error) {
      console.error("新增資料時發生錯誤:", error.response);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${apiBase}v2/api/${apiPath}/admin/product/${id}`, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("刪除資料:", res.data.message);
      setSelectProduct(null); // 關閉視窗
      getData(); // 重新整理列表

    } catch (error) {
      console.error("刪除資料時發生錯誤:", error.response);
    }
  };

  const revisedProduct = async (id, revisedModal) => {
    try {
      const res = await axios.put(`${apiBase}v2/api/${apiPath}/admin/product/${id}`, { data: revisedModal }, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("修改資料:", res.data);
      setSelectProduct(null)
      getData(); // 重新整理列表
    } catch (error) {
      console.error("修改資料時發生錯誤:", error.response);
    }
  };


  useEffect(() => {
    getData();
  }
    , []);



  return (
    <>
      <div className='bg-color pb-5'>

        <div className='container-fluid'>
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
          {showAddModal &&
            <Addproduct setShowAddModal={setShowAddModal} addProduct={addProduct} handleProduct={handleProduct} sentProduct={sentProduct} addImg={addImg} deleteImg={deleteImg} handleImgUrl={handleImgUrl} />
          }

          <div className='row'>
            {Products && Products.map(product =>
              <ProductCard key={product.id} product={product} setSelectProduct={setSelectProduct} />
            )}
          </div>
          {SelectProduct && <Eachproduct addImg={addImg}
            deleteImg={deleteImg} revisedProduct={revisedProduct} deleteProduct={deleteProduct} product={SelectProduct} onClose={() => setSelectProduct(null)} />}

          <Pagination pagination={pagination} goPage={goPage} />

        </div>
      </div >



    </>
  )
}

export default App
