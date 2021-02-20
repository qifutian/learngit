import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'
import './css/index.css'
import axios from 'axios'

const baseUrl = 'https://conduit.productionready.io/api/users'

function Login() {
  const initialValues = {
    email: 'jake@jake.jake',
    password: 'jakejake',
  }
  const handleSubmit = (values) => {
    axios
      .post(`${baseUrl}/login`, { user: values })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        alert(err)
      })
  }
  const schema = Yup.object().shape({
    // username: Yup.string()
    //   .max(15, '用户名的长度不能大于15')
    //   .required('请输入用户名'),
    email: Yup.string().required('请输入邮箱'),
    password: Yup.string().min(6, '密码的长度不能小于6').required('请输入密码'),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <label htmlFor="">
          手机号或邮箱
          <Field name="email" />
        </label>
        <ErrorMessage name="email" />
        <label htmlFor="">
          密码
          <Field name="password" />
        </label>
        <ErrorMessage name="password" />
        <input className="btn" type="submit" />
      </Form>
    </Formik>
  )
}
function Register() {
  const initialValues = {
    username: 'Jacob',
    email: 'jake@jake.jake',
    password: 'jakejake',
  }
  const handleSubmit = (values) => {
    axios
      .post(`${baseUrl}`, { user: values })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        alert(err)
      })
  }
  const schema = Yup.object().shape({
    username: Yup.string()
      .max(15, '用户名的长度不能大于15')
      .required('请输入用户名'),
    email: Yup.string().required('请输入邮箱'),
    password: Yup.string().min(6, '密码的长度不能小于6').required('请输入密码'),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <label htmlFor="">
          你的昵称
          <Field name="username" />
        </label>
        <ErrorMessage name="username" />
        <label htmlFor="">
          手机号或邮箱
          <Field name="email" />
        </label>
        <ErrorMessage name="email" />
        <label htmlFor="">
          密码
          <Field name="password" />
        </label>
        <ErrorMessage name="password" />
        <input className="btn" type="submit" />
      </Form>
    </Formik>
  )
}
function UnitTab() {
  const [select, setSelect] = useState('login')
  const toggleTab = (e) => {
    setSelect(e.target.id)
  }
  return (
    <div className="tab">
      <div>
        <span
          id="login"
          className={select === 'login' ? 'active' : ''}
          onClick={toggleTab}
        >
          登录
        </span>
      </div>
      <div>
        <span
          id="register"
          className={select === 'register' ? 'active' : ''}
          onClick={toggleTab}
        >
          注册
        </span>
      </div>
      {select === 'login' ? <Login></Login> : <Register></Register>}
    </div>
  )
}

function App() {
  return (
    <div>
      <UnitTab />
    </div>
  )
}

export default App
