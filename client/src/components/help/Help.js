import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Help() {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  //Handle Input
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMsg({ ...msg, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/message/create", msg);

      console.log(res.status);
      if (res.status === 400 || !res) {
        window.alert("Message Not Sent. Try Again Later");
      } else if (msg.name.length < 3) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid name!",
        });
      } else if (msg.message.length < 3) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid message!",
        });
      }
      else {
        Swal.fire("Good job!", "Message Sent!", "success");

        setMsg({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section>
        <div className="container my-5 py-5 ">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fd-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b>Questions?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="/imgs/contact.png" alt="Contact" className="w-75" />
            </div>
            <form className="col-md-6" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label for="name" className="form-label">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="User Name"
                  name="name"
                  value={msg.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  name="email"
                  value={msg.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  name="message"
                  value={msg.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Send Message
                <i className="fa fa-paper-plane ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
