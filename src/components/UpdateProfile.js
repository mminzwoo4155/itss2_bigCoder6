import React, { useReducer, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { notification } from "antd"

export default function UpdateProfile() {
  const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const specializedRef = useRef()
  const idRef = useRef()
  const stdIdRef = useRef()
  const phoneRef = useRef()
  const schoolRef = useRef()
  const yearRef = useRef()
  const { currentUser, currentProfile, updateEmail, updateProfile } = useAuth()
  const [error, setError] = useState("")
  // const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function isPhoneNumber(str) {
    if (typeof str != 'string' || str.length !== 10) return false 
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }

  function handleSubmit(e) {
    
    e.preventDefault()

    // if (idRef.current.value.length !== 12) {
    //   return setError('Invalid id')
    // }

    if (stdIdRef.current.value.length !== 0 && stdIdRef.current.value.length !== 8) {
      return setError('Invalid student id')
    }

    if (!isPhoneNumber(phoneRef.current.value)) {
      return setError('Invalid phone number')
    }

    const promises = []
    setLoading(true)
    setError("")

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value))
    // }

    const profile = {
      email: currentUser.email,
      name: nameRef.current.value,
      course: specializedRef.current.value,
      id: currentProfile.id,
      student_id: stdIdRef.current.value,
      phone_number: phoneRef.current.value,
      school: schoolRef.current.value,
      year: yearRef.current.value,
    }

    console.log(profile)

    // promises.push(updateProfile(currentUser.email, profile));

    promises.push(updateProfile(profile));

    // setProfile(profile)

    // const jsonProfile = JSON.stringify(profile)
    // localStorage.setItem('profile', jsonProfile)

    Promise.all(promises)
      .then(() => {
        history.push(`/profile/${currentUser.uid}`)
        notification.success({
          message: "Cập nhật thành công"
        })
      })
      .catch((e) => {
        console.log(e);
        notification.error({
          message: "Đã có lỗi xảy ra"
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cập nhật thông tin</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                disabled
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="identification-number">
              <Form.Label>Identification number</Form.Label>
              <Form.Control
                type="identification-number"
                ref={idRef}
                disabled
                // placeholder="Enter your identification number"
                defaultValue={currentProfile.id}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="name"
                ref={nameRef}
                required
                placeholder="Nhập tên của bạn"
                defaultValue={currentProfile.name}
              />
            </Form.Group>
            <Form.Group id="specialized">
              <Form.Label>Khoa</Form.Label>
              <Form.Control
                type="specialized"
                ref={specializedRef}
                placeholder="Nhập khoa bạn đang theo học"
                defaultValue={currentProfile.course}
              />
            </Form.Group>
            <Form.Group id="school">
              <Form.Label>Trường</Form.Label>
              <Form.Control
                type="school"
                ref={schoolRef}
                placeholder="Điền trường bạn đang theo học"
                defaultValue={currentProfile.school}
              />
            </Form.Group>
            <Form.Group id="year">
              <Form.Label>Niên khóa</Form.Label>
              <Form.Control
                type="year"
                ref={yearRef}
                placeholder="Điền niên khóa của bạn"
                defaultValue={currentProfile.year}
              />
            </Form.Group>
            <Form.Group id="student-id">
              <Form.Label>Mã số sinh viên</Form.Label>
              <Form.Control
                type="student-id"
                ref={stdIdRef}
                placeholder="Nhập mã số sinh viên"
                defaultValue={currentProfile.student_id}
              />
            </Form.Group>
            <Form.Group id="phone-number">
              <Form.Label>Số điện thoại liên lạc</Form.Label>
              <Form.Control
                type="phone-number"
                ref={phoneRef}
                placeholder="Nhập số điện thoại"
                defaultValue={currentProfile.phone_number}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Xác nhận
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Hủy</Link>
      </div>
    </>
  )
}
