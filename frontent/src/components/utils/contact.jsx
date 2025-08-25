import React from "react";

export default function ContactUs() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-4">
        Have questions or need support? Reach out to our team, and we'll get back to you as soon as
        possible.
      </p>
      <div className="text-gray-600">
        <p className="mb-2"><strong>Email:</strong> support@librarysystem.com</p>
        <p className="mb-2"><strong>Phone:</strong> +1 (123) 456-7890</p>
        <p className="mb-2"><strong>Address:</strong> 123 Library Lane, Booktown, BK 12345</p>
      </div>
    </div>
  );
}