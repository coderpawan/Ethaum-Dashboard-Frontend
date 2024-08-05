import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";

const SellerProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [type, setType] = useState(productData?.type || "");
  const [vendor, setVendor] = useState(productData?.vendor || "");
  const [tags, setTags] = useState(productData?.tags || []);
  const [title, setTitle] = useState(productData?.title || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [marketCost, setMarketCost] = useState(productData?.marketCost || "");
  const [discount, setDiscount] = useState(productData?.discount || "");
  const [realPrice, setRealPrice] = useState(productData?.realPrice || "");
  const [costType, setCostType] = useState(productData?.costType || "");
  const [startingPrice, setStartingPrice] = useState(productData?.startingPrice || "");
  const [website, setWebsite] = useState(productData?.website || "");
  const [benefits, setBenefits] = useState(productData?.benefits || []);
  const [imageUrl, setImageUrl] = useState(productData?.image || null);
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo');
  const userObject = JSON.parse(userInfo);
  const sellerId = userObject._id;

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setType(productData.type);
      setVendor(productData.vendor);
      setTags(productData.tags);
      setTitle(productData.title);
      setDescription(productData.description);
      setMarketCost(productData.marketCost);
      setDiscount(productData.discount);
      setRealPrice(productData.realPrice);
      setCostType(productData.costType);
      setStartingPrice(productData.startingPrice);
      setWebsite(productData.website);
      setBenefits(productData.benefits);
      setImage(productData.image);
      setImageUrl(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
      setImageUrl(res.image);
    } catch (err) {
      toast.error("Image upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", image);
      formData.append("type", type);
      formData.append("vendor", vendor);
      formData.append("seller_id", sellerId);
      formData.append("tags", JSON.stringify(tags));
      formData.append("title", title);
      formData.append("description", description);
      formData.append("marketCost", marketCost);
      formData.append("discount", discount);
      formData.append("realPrice", realPrice);
      formData.append("costType", costType);
      formData.append("startingPrice", startingPrice);
      formData.append("website", website);
      formData.append("benefits", JSON.stringify(benefits));

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/seller/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/seller/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white"}
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="type">Type</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="two ml-10 ">
                  <label htmlFor="vendor">Vendor</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  />
                </div>
              </div>
        
              <label htmlFor="tags" className="my-5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
              />

              <label htmlFor="title" className="my-5">
                Title
              </label>
              <input
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label htmlFor="marketCost" className="my-5">
                Market Cost
              </label>
              <input
                type="number"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={marketCost}
                onChange={(e) => setMarketCost(e.target.value)}
              />

              <label htmlFor="discount" className="my-5">
                Discount
              </label>
              <input
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

              <label htmlFor="realPrice" className="my-5">
                Real Price
              </label>
              <input
                type="number"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={realPrice}
                onChange={(e) => setRealPrice(e.target.value)}
              />

              <label htmlFor="costType" className="my-5">
                Cost Type
              </label>
              <input
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={costType}
                onChange={(e) => setCostType(e.target.value)}
              />

              <label htmlFor="startingPrice" className="my-5">
                Starting Price
              </label>
              <input
                type="number"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
              />

              <label htmlFor="website" className="my-5">
                Website
              </label>
              <input
                type="url"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <label htmlFor="benefits" className="my-5">
                Benefits (comma separated)
              </label>
              <input
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={benefits.join(', ')}
                onChange={(e) => setBenefits(e.target.value.split(',').map(benefit => benefit.trim()))}
              />

              <div className="my-5 flex justify-between">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProductUpdate;
