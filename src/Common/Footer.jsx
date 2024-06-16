import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h4 className="font-bold">Exclusive</h4>
          <p className="mt-4">Subscribe</p>
          <p>Get 10% off your first order</p>
          <form className="mt-4 flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 w-full text-black" 
            />
            <button className="bg-white text-black p-2">→</button>
          </form>
        </div>
        <div>
          <h4 className="font-bold">Support</h4>
          <address className="not-italic mt-4">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.<br />
            <a href="mailto:exclusive@gmail.com" className="block mt-2">exclusive@gmail.com</a><br />
            <a href="tel:+8801588889999" className="block mt-2">+88015-88888-9999</a>
          </address>
        </div>
        <div>
          <h4 className="font-bold">Account</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Login / Register</a></li>
            <li><a href="#" className="hover:underline">Cart</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Quick Link</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Download App</h4>
          <p className="mt-4">Save $3 with App New User Only</p>
          <div className="mt-4 flex space-x-4">
            <img src="path/to/google-play.png" alt="Google Play" className="w-24" />
            <img src="path/to/app-store.png" alt="App Store" className="w-24" />
          </div>
          <div className="mt-4 flex space-x-4">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
