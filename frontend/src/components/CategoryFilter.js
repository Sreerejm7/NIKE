// CategoryFilter.js
import React, { useEffect, useState } from "react";
import "./CategoryFilter.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function CategoryFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const [expandSize, setExpandSize] = useState(false);
  const [expandGender, setExpandGender] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandColor, setExpandColor] = useState(false);
  const [expandCategory, setExpandCategory] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [dis, setdis] = useState(false);

  const [isActive, setIsActive] = useState(false);


  const [shoe, setShoe] = useState([]);
  const [filteredShoe, setFilteredShoe] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    priceRange: [],
    colors: [],
    sizes: [],
    category: [],
  });

  const location = useLocation();
  const selectedcategory = location.state?.selectedcategory;

  useEffect(() => {
    if (selectedcategory) {
    setFilters((prev) => ({...prev,category: [selectedcategory],}));
    }
  }, [selectedcategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://nike-swe2.onrender.com/getallproducts"
        );
        setShoe(response.data.products);
        setFilteredShoe(response.data.products);
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const HandleSmart = () => {
    setdis(!dis);
  };

  const unCheck = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    if(checkboxes){
      setIsActive(false)
    }
  };

  const afterClear =()=>{
    setFilters({
    gender: [],
    priceRange: [],
    colors: [],
    sizes: [],
    category: [],
    });
    setSortOption('')
  }

  const handleCheckboxChange = () => {
    const hasChecked = document.querySelectorAll('input[type="checkbox"]:checked,input[type="radio"]:checked').length > 0;
    setIsActive(hasChecked);
  };
  

  const applyFilters = () => {
    let filtered = [...shoe];
    if (filters.gender.length > 0) {
      filtered = filtered.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }
    
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter((product) =>
        filters.priceRange.some(
          (range) => product.discountPrice >= range.min && product.discountPrice <= range.max
        )
      );
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.colors.some((color) => product.colors.includes(color))
      );
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        filters.sizes.some((size) => product.sizes.includes(size))
      );
    }
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.some((cat) => product.category.includes(cat))
      );
    }

    if (sortOption === "2") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "3") {
      filtered = filtered.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortOption === "4") {
      filtered = filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    }
    setFilteredShoe(filtered);
  };

  const handleGenderChange = (event) => {
    handleCheckboxChange()
    const { checked, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      gender: checked
        ? [...prevFilters.gender, value]
        : prevFilters.gender.filter((g) => g !== value),
    }));
  };

  

  const handlePriceChange = (min, max) => {
    handleCheckboxChange()
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: prevFilters.priceRange.some(
        (range) => range.min === min && range.max === max
      )
        ? prevFilters.priceRange.filter(
            (range) => range.min !== min || range.max !== max
          )
        : [...prevFilters.priceRange, { min, max }],
    }));
  };

  const handleColorChange = (color) => {
    handleCheckboxChange()
    setFilters((prevFilters) => ({
      ...prevFilters,
      colors: prevFilters.colors.includes(color)
        ? prevFilters.colors.filter((c) => c !== color)
        : [...prevFilters.colors, color],
    }));
  };

  const handleSizeChange = (size) => {
    handleCheckboxChange()
    setFilters((prevFilters) => ({
      ...prevFilters,
      sizes: prevFilters.sizes.includes(size)
        ? prevFilters.sizes.filter((s) => s !== size)
        : [...prevFilters.sizes, size],
    }));
  };

  const handleCategoryChange = (cat) => {
    handleCheckboxChange()
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category.includes(cat)
        ? prevFilters.category.filter((c) => c !== cat)
        : [...prevFilters.category, cat],
    }));
  };

  const handleSortChange = (value) => {
    handleCheckboxChange()
    setSortOption(value);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortOption,shoe]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="CategoryFilter-container">
      <div className="CategoryFilter">
        <div className="shoe-name">
          <h5>Nike By You({filteredShoe.length})</h5>
        </div>
        <div className="sort-fil">
          <button onClick={toggleFilter} className="hide-filter">
            {showFilter ? "Show Filter" : "Hide Filter"}
          </button>

          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-by"
            name="Sort By"
          >
            <option value="1">Sort By</option>
            <option value="2">Newest</option>
            <option value="3">Price:High-Low</option>
            <option value="4">Price:Low-High</option>
          </select>
        </div>

        <div className="rightlasthide" onClick={HandleSmart}>
          Filter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" />
          </svg>
        </div>
      </div>

      <div className="filter">
        <div className={`side-filter ${showFilter ? "close" : ""}`}>
          <h3>Filter Options</h3>

          <div className="filter-section">
            <h6 onClick={() => setExpandGender(!expandGender)}>
              Gender {expandGender ? "▲" : "▼"}
            </h6>
            {expandGender && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Men"
                    onChange={handleGenderChange}
                  />{" "}
                  Men
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={handleGenderChange}
                  />{" "}
                  Women
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Unisex"
                    onChange={handleGenderChange}
                  />{" "}
                  Unisex
                </label>
              </div>
            )}
          </div>

          

          <div className="filter-section">
            <h6 onClick={() => setExpandPrice(!expandPrice)}>
              Price Range {expandPrice ? "▲" : "▼"}
            </h6>
            {expandPrice && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(1000, 4999)}
                  />{" "}
                  ₹1000 - ₹4999
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(5000, 7500)}
                  />{" "}
                  ₹5000 - ₹7500
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(7501, 12999)}
                  />{" "}
                  ₹7501 - ₹12999
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(13000, Infinity)}
                  />{" "}
                  ₹13000 and above
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <h6 onClick={() => setExpandColor(!expandColor)}>
              Colors {expandColor ? "▲" : "▼"}
            </h6>
            {expandColor && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Red")}
                  />{" "}
                  Red
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("White")}
                  />{" "}
                  White
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Blue")}
                  />{" "}
                  Blue
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Green")}
                  />{" "}
                  Green
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Brown")}
                  />{" "}
                  Brown
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Grey")}
                  />{" "}
                  Grey
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Black")}
                  />{" "}
                  Black
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Yellow")}
                  />{" "}
                  Yellow
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <h6 onClick={() => setExpandCategory(!expandCategory)}>
              Category {expandCategory ? "▲" : "▼"}
            </h6>
            {expandCategory && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Air Jordan")}
                  />{" "}
                  Air Jordan
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Nike City")}
                  />{" "}
                  Nike City
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Nike Vomero")}
                  />{" "}
                  Nike Vomero
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Clothing")}
                  />{" "}
                  Clothing
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <h6 onClick={() => setExpandSize(!expandSize)}>
              Size {expandSize ? "▲" : "▼"}
            </h6>
            {expandSize && (
              
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("5")}
                  />{" "}
                  5
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("6")}
                  />{" "}
                  6
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("7")}
                  />{" "}
                  7
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("8")}
                  />{" "}
                  8
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("9")}
                  />{" "}
                  9
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("10")}
                  />{" "}
                  10
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("11")}
                  />{" "}
                  11
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("12")}
                  />{" "}
                  12
                </label>
                <hr />
                <h6>For Cloths</h6>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("S")}
                  />{" "}
                  S
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("M")}
                  />{" "}
                  M
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("L")}
                  />{" "}
                  L
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("XL")}
                  />{" "}
                  XL
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("XXL")}
                  />{" "}
                  XXL
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="filter-body">
          <div className="main-container">
            {filteredShoe.map((option, index) => (
              <div className="sub-container" key={index}>
                <Link to={`/productoverview/${option._id}`}>
                <img className="show-image" src={option.image[0]} alt="shoe" />
                </Link>
                
                <div className="sub-detail">
                  <h4>{option.title}</h4>
                  <p>{option.detail.slice(0, 25) + "..."}</p>
                  <h6 className="strike">
                    MRP: <FaIndianRupeeSign />
                    {option.price}
                  </h6>
                  <h6>
                    MRP: <FaIndianRupeeSign />
                    {option.discountPrice}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`smartphonesidebar ${dis ? "show" : ""}`}>
        <div className="smarttop">
          <p>Filter</p>
          <svg
            onClick={HandleSmart}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
        <div className="smartsort">
          <p>Sort By</p>
          <div className="smartsort1">
            <input
              type="radio"
              name="sortOption"
              id="featuredAgain"
              value="2"
              onChange={(e) => handleSortChange(e.target.value)}
            />
            <label htmlFor="featuredAgain">Newest</label>
          </div>
          <div className="smartsort1">
            <input
              type="radio"
              name="sortOption"
              id="priceHighLow"
              value="3"
              onChange={(e) => handleSortChange(e.target.value)}
            />
            <label htmlFor="priceHighLow">Price: High-Low</label>
          </div>
          <div className="smartsort1">
            <input
              type="radio"
              name="sortOption"
              id="priceLowHigh"
              value="4"
              onChange={(e) => handleSortChange(e.target.value)}
            />
            <label htmlFor="priceLowHigh">Price: Low-High</label>
          </div>
        </div>
        <div className="smart1">
          <p>Gender</p>
          <div className="smartcheck">
          <label>
                  <input
                    type="checkbox"
                    value="Men"
                    onChange={handleGenderChange}
                  />{" "}
                  Men
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={handleGenderChange}
                  />{" "}
                  Women
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Unisex"
                    onChange={handleGenderChange}
                  />{" "}
                  Unisex
                </label>
          </div>
        </div>
        <div className="smart1">
          <p>Shop By Price</p>
          <div className="smartcheck">
          <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(1000, 4999)}
                  />{" "}
                  ₹1000 - ₹4999
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(5000, 7500)}
                  />{" "}
                  ₹5000 - ₹7500
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(7501, 12999)}
                  />{" "}
                  ₹7501 - ₹12999
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceChange(13000, Infinity)}
                  />{" "}
                  ₹13000 and above
                </label>
          </div>
        </div>
        <div className="smart1">
          <p>Colours</p>
          <div className="smartcheck">
          <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Red")}
                  />{" "}
                  Red
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Blue")}
                  />{" "}
                  Blue
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Green")}
                  />{" "}
                  Green
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Brown")}
                  />{" "}
                  Brown
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Grey")}
                  />{" "}
                  Grey
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleColorChange("Black")}
                  />{" "}
                  Black
                </label>
          </div>
        </div>

        <div className="smart1">
          <p>Category</p>
          <div className="smartcheck">
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Air Jordan")}
              />{" "}
              Air Jordan
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Nike City")}
              />{" "}
              Nike City
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Nike Vomero")}
              />{" "}
              Nike Vomero
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Clothing")}
              />{" "}
              Clothing
            </label>
          </div>
        </div>

        <div className="smart1">
          <p>Size</p>
          <div className="smartcheck">
          <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("5")}
                  />{" "}
                  5
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("6")}
                  />{" "}
                  6
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("7")}
                  />{" "}
                  7
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("8")}
                  />{" "}
                  8
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("9")}
                  />{" "}
                  9
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("10")}
                  />{" "}
                  10
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("11")}
                  />{" "}
                  11
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("12")}
                  />{" "}
                  12
                </label>
                <hr />
                <h6>For Cloths</h6>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("S")}
                  />{" "}
                  S
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("M")}
                  />{" "}
                  M
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("L")}
                  />{" "}
                  L
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("XL")}
                  />{" "}
                  XL
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSizeChange("XXL")}
                  />{" "}
                  XXL
                </label>
          </div>
        </div>

        <div className="smart-buttons">
          <button onClick={()=>{unCheck();afterClear();HandleSmart();}} id="smart-clear" className={isActive ? "active" : "" }>Clear</button>
          <button onClick={HandleSmart} id="smart-apply" className={isActive ? "active" : ""}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
