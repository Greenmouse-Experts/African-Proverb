import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg" alt="African Proverbs" className="h-16" />
          </div>
          <p className="text-sm leading-relaxed">
            Wisdom from the Motherland,<br />At your finger Tip
          </p>
          <div className="flex space-x-2">
            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741170266/image_mkgrkf.png" alt="App Store" className="h-10 cursor-pointer" />
            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741170266/image_4_vg0oc6.png" alt="Google Play" className="h-10 cursor-pointer" />
          </div>
        </div>

        {/* Column 2 - Social Media Links */}
        <div className="space-y-4">
          <h3 className="text-[#BB5D06]  font-semibold">Social Media</h3>
          <ul className="space-y-6 text-sm">
            <li><a href="#" className="hover:text-[#BB5D06] ">Instagram</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">Twitter</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">Threads</a></li>
          </ul>
        </div>

        {/* Column 3 - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-[#BB5D06]  font-semibold">Quick Links</h3>
          <ul className="space-y-6 text-sm">
            <li><a href="#" className="hover:text-[#BB5D06] ">Home</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">About Us</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">Proverbs</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div className="space-y-4">
          <h3 className="text-[#BB5D06]  font-semibold">Contact</h3>
          <ul className="space-y-6 text-sm">
            <li><a href="#" className="hover:text-[#BB5D06] ">118b, Ilupeju Street, Dolphin Estate<br />
            Ikoyi, Lagos</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">Contact@calmglobal.com</a></li>
            <li><a href="#" className="hover:text-[#BB5D06] ">+234 810 7536 218</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
