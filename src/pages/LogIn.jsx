import React from "react";
import "../styles/logIn.scss";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

function LogIn({ setAuth }) {
  async function ApiConnect(data) {
    try {
      const res = await Axios.post("https://challenge-react.alkemy.org/", {
        email: data.emailUser,
        password: data.passwordUser,
      });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Formik
      initialValues={{
        emailUser: "",
        passwordUser: "",
      }}
      validate={(data) => {
        let err = {};
        if (!data.emailUser) {
          err.emailUser = "Enter your email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            data.emailUser
          )
        ) {
          err.nombre = "Invalid email";
        }

        if (!data.passwordUser) {
          err.passwordUser = "Enter your password";
        }
        return err;
      }}
      onSubmit={(data, { resetForm }) => {
        resetForm();
        ApiConnect(data);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Log In</h2>
                </div>
                <div className="card-body">
                  <Form>
                    <div className="mb-4">
                      <label className="form-label">Email</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="username"
                        name="emailUser"
                        placeholder="challenge@alkemy.org"
                      />
                      <ErrorMessage
                        name="emailUser"
                        component={() => (
                          <div className="error"> {errors.emailUser} </div>
                        )}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="passwordUser"
                        placeholder="react"
                      />
                      <ErrorMessage
                        name="passwordUser"
                        component={() => (
                          <div className="error"> {errors.passwordUser} </div>
                        )}
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary text-light"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default LogIn;
