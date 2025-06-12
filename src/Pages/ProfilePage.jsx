'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { User, ClipboardList, Trash2, LogOut, Menu, X, Check, MapPin, Edit2 } from 'lucide-react';
import { api } from 'axiosApi';

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log('selectedOrder====>', selectedOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const fileInputRef = useRef(null);
  let userID = JSON.parse(localStorage.getItem('userID'));

  // Sample addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      postalCode: '110001',
      phone: '+91 87654 32109',
      email: 'jane.smith@example.com'
    }
  ]);

  const [state, setState] = useState({
    OrderDetail: []
  });
  console.log('state.orderDetail====>', state.OrderDetail);
  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    email: ''
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedOrder(null);
    setSelectedAddress(null);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleAddressClick = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((address) => address.id !== addressId));
    setSelectedAddress(null);
  };

  const openEditPopup = (address) => {
    setIsEditing(true);
    setCurrentAddressId(address.id);
    setNewAddress({ ...address });
    setIsPopupOpen(true);
  };

  const openAddPopup = () => {
    setIsEditing(false);
    setNewAddress({
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
      email: ''
    });
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    if (isEditing) {
      setAddresses(
        addresses.map((address) =>
          address.id === currentAddressId ? { ...newAddress, id: currentAddressId } : address
        )
      );
    } else {
      setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    }
    setIsPopupOpen(false);
    setSelectedAddress(null);
  };

  // const orders = [
  //   {
  //     id: "ORD123456",
  //     date: "May 15, 2024",
  //     status: "Delivered",
  //     trackingNumber: "IND1234567890",
  //     courier: "BlueDart",
  //     estimatedDelivery: "May 18, 2024",
  //     trackingLink: "Track on BlueDart",
  //     history: [
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //       {
  //         status:
  //           "Delivered MUMBAI, MAHARASHTRA Package delivered to recipient",
  //         time: "May 17, 2024, 2:45 PM",
  //       },
  //     ],
  //     items: [
  //       {
  //         name: "Revitalizing Hair Serum",
  //         size: "100ml",
  //         price: 120.0,
  //         image: "/placeholder.svg?height=60&width=60",
  //       },
  //       {
  //         name: "Revitalizing Hair Serum",
  //         size: "100ml",
  //         price: 160.0,
  //         image: "/placeholder.svg?height=60&width=60",
  //       },
  //     ],
  //     subtotal: 120.0,
  //     shipping: 20.0,
  //     tax: 20.0,
  //     total: 160.0,
  //     shippingAddress: {
  //       name: "John Doe",
  //       address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
  //       phone: "+91 98765 43210",
  //     },
  //   },
  //   {
  //     id: "ORD123457",
  //     date: "May 15, 2024",
  //     status: "Pending",
  //     trackingNumber: "IND1234567891",
  //     courier: "BlueDart",
  //     estimatedDelivery: "May 18, 2024",
  //     trackingLink: "Track on BlueDart",
  //     history: [{ status: "Order Placed", time: "May 15, 2024, 10:00 AM" }],
  //     items: [
  //       {
  //         name: "Revitalizing Hair Serum",
  //         size: "100ml",
  //         price: 120.0,
  //         image: "/placeholder.svg?height=60&width=60",
  //       },
  //     ],
  //     subtotal: 120.0,
  //     shipping: 20.0,
  //     tax: 20.0,
  //     total: 160.0,
  //     shippingAddress: {
  //       name: "John Doe",
  //       address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
  //       phone: "+91 98765 43210",
  //     },
  //   },
  //   {
  //     id: "ORD123458",
  //     date: "May 15, 2024",
  //     status: "Cancel",
  //     trackingNumber: "IND1234567892",
  //     courier: "BlueDart",
  //     estimatedDelivery: "May 18, 2024",
  //     trackingLink: "Track on BlueDart",
  //     history: [{ status: "Order Cancelled", time: "May 15, 2024, 11:00 AM" }],
  //     items: [
  //       {
  //         name: "Revitalizing Hair Serum",
  //         size: "100ml",
  //         price: 120.0,
  //         image: "/placeholder.svg?height=60&width=60",
  //       },
  //     ],
  //     subtotal: 120.0,
  //     shipping: 20.0,
  //     tax: 20.0,
  //     total: 160.0,
  //     shippingAddress: {
  //       name: "John Doe",
  //       address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
  //       phone: "+91 98765 43210",
  //     },
  //   },
  // ];

  const orders = state.OrderDetail;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //call api order by userId
  useEffect(() => {
    const fetchOrderByUserId = async () => {
      try {
        const response = await api.get(`/getOrderByUserId/${userID}`);
        changeNameValue({ OrderDetail: response.data.data });
        // Optionally show a success message or update cart state here
      } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
      }
    };

    fetchOrderByUserId();
  }, []);

  //logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Home / My Account</p>
        <h1 className="text-3xl font-medium text-gray-900">My Account</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Conditionally render based on selectedOrder */}
        {!selectedOrder && (
          <aside className="md:w-64 md:h-[617px] bg-white border border-gray-200 p-6 rounded-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 relative">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-[14px] font-medium">John Doe</h2>
                <p className="text-[12px] text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            <nav className="space-y-3">
              <button
                onClick={() => handleTabChange('profile')}
                className={`flex w-full items-center space-x-3 p-3 rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={18} />
                <span className="text-sm font-medium">Profile</span>
              </button>

              <button
                onClick={() => handleTabChange('trackOrder')}
                className={`flex w-full items-center space-x-3 p-3 rounded-md ${
                  activeTab === 'trackOrder'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ClipboardList size={18} />
                <span className="text-sm font-medium">Orders</span>
              </button>

              <button
                onClick={() => handleTabChange('address')}
                className={`flex w-full items-center space-x-3 p-3 rounded-md ${
                  activeTab === 'address'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin size={18} />
                <span className="text-sm font-medium">Address</span>
              </button>

              <button
                className="flex w-full md:mt-71 items-center border-t border-gray-200 justify-center space-x-3 p-3 hover:rounded-md text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Log out</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${selectedOrder ? 'w-full' : ''}`}>
          {activeTab === 'profile' ? (
            <div className="bg-white border border-gray-200 p-8 rounded-md">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-200 relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200" />
                  )}
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <span className="text-xs">✎</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-medium">John Doe</h2>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border rounded-md border-gray-300  focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button className="md:w-[370px] bg-[#7F614F] rounded-md border hover:bg-white hover:text-[#7F614F] text-white py-3 px-6 focus:outline-none  transition-colors md:col-span-2">
                  Save Change
                </button>
              </form>
            </div>
          ) : activeTab === 'trackOrder' && selectedOrder ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Tracking and History */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-md">
                <div className="p-6 bg-[#7F614F]/20 rounded-t-md">
                  <p className="text-sm text-gray-500 mb-2">
                    Placed on {orders.find((order) => order.orderId === selectedOrder).date}
                  </p>
                  <h2 className="text-lg font-medium mb-6">Order #{selectedOrder}</h2>
                </div>

                {/* Tracking History */}
                <div className="p-6">
                  <h3 className="text-base font-medium mb-4 md:pl-10">Tracking History</h3>
                  <div className="relative md:pl-10">
                    <div className="absolute top-2 md:bottom-8 md:left-[47px] left-1.5 bottom-[42px] w-0.5 bg-gray-200"></div>
                    {/* {orders
                      .find((order) => order.orderId === selectedOrder)
                      .history.map((entry, index) => {
                        // Split the status into two parts at "Package"
                        const statusParts = entry.status.split(/(Package.*)/);
                        const location = statusParts[0].trim(); // "Delivered MUMBAI, MAHARASHTRA"
                        const detail = statusParts[1]
                          ? statusParts[1].trim()
                          : ""; // "Package delivered to recipient"

                        return (
                          <div key={index} className="flex items-start mb-15">
                            <div className="md:w-4 md:h-4 h-[15px] w-5 z-10 bg-[#7F614F] rounded-full mr-4 mt-1"></div>
                            <div className="flex w-full justify-between">
                              <div>
                                <p className="text-sm font-medium">
                                  {location}
                                </p>
                                {detail && (
                                  <p className="text-sm text-gray-500">
                                    {detail}
                                  </p>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {entry.time}
                              </p>
                            </div>
                          </div>
                        );
                      })} */}
                  </div>
                </div>
              </div>

              {/* Order Summary, Shipping Address, and Items */}
              <div className="lg:col-span-1 space-y-6">
                {/* Order Summary */}
                <div className="bg-white border border-gray-200 rounded-md">
                  <h3 className="text-base font-medium rounded-t-md mb-4 bg-[#7F614F]/20 p-6">
                    Order Summary
                  </h3>
                  <div className="space-y-3 p-6">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium">
                        ₹
                        {orders
                          .find((order) => order.orderId === selectedOrder)
                          .subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Shipping</p>
                      <p className="text-sm font-medium">
                        ₹
                        {orders
                          .find((order) => order.orderId === selectedOrder)
                          .shipping.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Tax</p>
                      <p className="text-sm font-medium">
                        ₹{orders.find((order) => order.orderId === selectedOrder).tax.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3 rounded-md">
                      <p className="text-base font-medium">Total</p>
                      <p className="text-base font-bold">
                        ₹
                        {orders
                          .find((order) => order.orderId === selectedOrder)
                          .totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-gray-200 rounded-md">
                  <h3 className="text-base font-medium mb-4 p-6 rounded-t-md bg-[#7F614F]/20">
                    Shipping Address
                  </h3>
                  <div className="p-6">
                    <p className="text-sm font-medium">
                      {orders.find((order) => order.orderId === selectedOrder).shippingAddress.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {
                        orders.find((order) => order.orderId === selectedOrder).shippingAddress
                          .address
                      }
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Phone:{' '}
                      {
                        orders.find((order) => order.orderId === selectedOrder).shippingAddress
                          .phone
                      }
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border border-gray-200 rounded-md">
                  <h3 className="text-base font-medium mb-4 bg-[#7F614F]/20 p-6 rounded-t-md">
                    Order Items
                  </h3>
                  <div className="space-y-4 p-6">
                    {orders
                      .find((order) => order.orderId === selectedOrder)
                      .items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <img
                            src={`${import.meta.env.VITE_API_IMAGE_URL}/${item.image[0]}`}
                            alt={item.name}
                            className="w-14 h-14 object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                          <p className="text-sm font-medium">
                            ₹
                            {item.discountedPrice
                              ? parseFloat(item.discountedPrice).toFixed(2)
                              : '0.00'}
                          </p>
                        </div>
                      ))}
                    <div className="flex justify-between border-t border-gray-200 pt-3 rounded-md">
                      <p className="text-base font-medium">Total</p>
                      <p className="text-base font-bold">
                        ₹
                        {orders
                          .find((order) => order.orderId === selectedOrder)
                          .totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'trackOrder' ? (
            <div className="bg-white border border-gray-200 p-8 rounded-md">
              <h2 className="text-lg font-medium mb-6">My Orders</h2>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleOrderClick(order.orderId)}
                  >
                    <div className="flex justify-between items-center rounded-t-md bg-[#7F614F]/20 p-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order #{order.orderId}</p>
                        <p className="text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          order.status === 'Delivered'
                            ? 'text-green-600'
                            : order.status === 'Pending'
                            ? 'text-red-600'
                            : 'text-red-600'
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center mb-4 p-6">
                        <img
                          src={`${import.meta.env.VITE_API_IMAGE_URL}/${item.image[0]}`}
                          alt={item.name}
                          className="w-14 h-14 object-cover mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-medium">
                          ₹
                          {item.discountedPrice
                            ? parseFloat(item.discountedPrice).toFixed(2)
                            : '0.00'}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t p-6 border-gray-200 pt-4 rounded-md">
                      <p className="text-base font-medium">Total</p>
                      <p className="text-base font-bold">₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'address' && selectedAddress ? (
            <div className="bg-white border border-gray-200 p-6 rounded-md">
              <h2 className="text-lg font-medium mb-6">Address Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">
                    {addresses.find((addr) => addr.id === selectedAddress).name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {addresses.find((addr) => addr.id === selectedAddress).address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addresses.find((addr) => addr.id === selectedAddress).city},{' '}
                    {addresses.find((addr) => addr.id === selectedAddress).state}{' '}
                    {addresses.find((addr) => addr.id === selectedAddress).postalCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Phone: {addresses.find((addr) => addr.id === selectedAddress).phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {addresses.find((addr) => addr.id === selectedAddress).email}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4 rounded-md">
                  <button
                    onClick={() => setSelectedAddress(null)}
                    className="text-[#58281C] hover:underline text-sm font-medium"
                  >
                    Back to Addresses
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'address' ? (
            <div className="bg-white border border-gray-200 p-6 rounded-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">My Addresses</h2>
                <button
                  onClick={openAddPopup}
                  className=" bg-[#7F614F] rounded-md border hover:bg-white hover:text-[#7F614F] text-white py-2 px-4 text-sm font-medium transition-colors"
                >
                  Add New Address
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div
                        className="cursor-pointer flex-1"
                        onClick={() => handleAddressClick(address.id)}
                      >
                        <h3 className="text-base font-medium mb-2">{address.name}</h3>
                        <p className="text-sm text-gray-600">{address.address}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Phone: {address.phone}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openEditPopup(address)}
                          className="text-gray-500 hover:text-[#58281C]"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    {/* <div className="border-t border-gray-200 mt-4 rounded-md"></div> */}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </main>
      </div>

      {/* Popup for Adding/Editing Address */}
      {isPopupOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 bg-opacity-50 z-40"
            onClick={() => setIsPopupOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-md w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                  {isEditing ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apartment 4B"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newAddress.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={handleSaveAddress}
                  className="w-full  bg-[#7F614F] rounded-md border hover:bg-white hover:text-[#7F614F] text-white py-3 px-6 focus:outline-none  transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Toggle - Hide when an order is selected */}
      {/* {!selectedOrder && (
        <div className="fixed bottom-4 right-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-[#58281C] text-white p-3 rounded-full shadow-lg"
          >
            <Menu size={24} />
          </button>
        </div>
      )} */}

      {/* Mobile Sidebar - Hide when an order is selected */}
      {/* {sidebarOpen && !selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-6">
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X size={20} />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 relative">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-lg font-medium">John Doe</h2>
                <p className="text-sm text-gray-600">john.doe@example.com</p>
              </div>
            </div>

            <nav className="space-y-3">
              <button
                onClick={() => handleTabChange("profile")}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  activeTab === "profile"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </button>

              <button
                onClick={() => handleTabChange("trackOrder")}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  activeTab === "trackOrder"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ClipboardList size={20} />
                <span className="text-sm font-medium">Orders</span>
              </button>

              <button
                onClick={() => handleTabChange("address")}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  activeTab === "address"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MapPin size={20} />
                <span className="text-sm font-medium">Address</span>
              </button>

              <button className="flex items-center space-x-3 p-3 rounded-md text-gray-700 hover:bg-gray-100">
                <LogOut size={20} />
                <span className="text-sm font-medium">Log out</span>
              </button>
            </nav>
          </div>
        </>
      )} */}
    </div>
  );
}
