import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import SellerMenu from "./SellerMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { FaPlus, FaMinus } from "react-icons/fa";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [tags, setTags] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marketCost, setMarketCost] = useState("");
  const [discount, setDiscount] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [costType, setCostType] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [website, setWebsite] = useState("");
  const [benefits, setBenefits] = useState([""]);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  const userInfo = localStorage.getItem("userInfo");
  const userObject = JSON.parse(userInfo);
  const sellerId = userObject._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("category", category);
      productData.append("vendor", vendor);
      productData.append("seller_id", sellerId);
      productData.append("tags", JSON.stringify(tags));
      productData.append("title", title);
      productData.append("description", description);
      productData.append("marketCost", marketCost);
      productData.append("discount", discount);
      productData.append("realPrice", realPrice);
      productData.append("costType", costType);
      productData.append("startingPrice", startingPrice);
      productData.append("website", website);
      productData.append("benefits", JSON.stringify(benefits));

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.title} has been created and sent for approval of admin`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => setTags([...tags, ""]);
  const removeTag = (index) => setTags(tags.filter((_, i) => i !== index));

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (index) => setBenefits(benefits.filter((_, i) => i !== index));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <SellerMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="text-2xl font-bold mb-6">Create Product</h2>

          {imageUrl && (
            <div className="text-center mb-6">
              <img src={imageUrl} alt="product" className="block mx-auto max-h-60" />
            </div>
          )}

          <div className="mb-3">
            <label className="block text-white text-center border rounded-lg cursor-pointer font-bold py-11 bg-gray-800">
              {image ? image.name : "Upload Image"}
              <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="hidden" />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block mb-2">Category</label>
                <select
                  id="category"
                  className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="vendor" className="block mb-2">Vendor</label>
                <input
                  id="vendor"
                  type="text"
                  className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block mb-2">Tags</label>
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                  />
                  <button type="button" onClick={() => removeTag(index)} className="text-red-500">
                    <FaMinus />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addTag} className="flex items-center gap-2 text-blue-500">
                <FaPlus /> Add Tag
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block mb-2">Title</label>
              <input
                id="title"
                type="text"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                id="description"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label htmlFor="marketCost" className="block mb-2">Market Cost</label>
              <input
                id="marketCost"
                type="number"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={marketCost}
                onChange={(e) => setMarketCost(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="discount" className="block mb-2">Discount</label>
              <input
                id="discount"
                type="text"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="realPrice" className="block mb-2">Real Price</label>
              <input
                id="realPrice"
                type="number"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={realPrice}
                onChange={(e) => setRealPrice(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="costType" className="block mb-2">Cost Type</label>
              <input
                id="costType"
                type="text"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={costType}
                onChange={(e) => setCostType(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="startingPrice" className="block mb-2">Starting Price</label>
              <input
                id="startingPrice"
                type="number"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="website" className="block mb-2">Website URL</label>
              <input
                id="website"
                type="text"
                className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="benefits" className="block mb-2">Benefits</label>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className="block w-full p-3 border rounded-lg bg-gray-800 text-white"
                  />
                  <button type="button" onClick={() => removeBenefit(index)} className="text-red-500">
                    <FaMinus />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addBenefit} className="flex items-center gap-2 text-blue-500">
                <FaPlus /> Add Benefit
              </button>
            </div>

            <button type="submit" className="block w-full py-3 mt-6 rounded-lg text-lg font-bold bg-blue-600 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
