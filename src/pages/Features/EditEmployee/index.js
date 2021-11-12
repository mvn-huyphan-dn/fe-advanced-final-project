import { Form, Input, Button, Row, Col, Checkbox, Radio, Select, PageHeader, Upload, Spin } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '../../../components'
import {
  birthFormat,
  dateFormat,
} from '../../../core/constants'
import {
  disabledStartDate,
  disabledEndDate,
  disabledWorkAge
} from '../../../utils'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { editEmployee } from '../../../features/employee/employeeSlice';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { setLoadingFalse, setLoadingTrue } from '../../../features/loading/loadingSlice';

const { Option } = Select;

export default function EditEmployee() {
  const loading = useSelector(state => state.loading.loading)
  let params = useParams();
  const dispatch = useDispatch()
  const [employee, setEmployee] = useState({})

  const { control, handleSubmit, setValue, formState: { errors }, watch, getValues } = useForm();
  const options = [
    { label: 'Macbook', value: 1 },
    { label: 'Windows Laptop', value: 2 },
    { label: 'iPhone', value: 3 },
    { label: 'Android Phone', value: 4 },
  ];

  let uploadWatch = watch('avatar') ? watch('avatar') : { fileList: [] }
  const history = useHistory()

  const statusCondition = watch("status") === 3;
  const [url, setUrl] = useState('')

  useEffect(() => {
    dispatch(setLoadingTrue({ tip: 'Loading...' }))
    const response = JSON.parse(localStorage.getItem('employee'))
    const index = response ? response.findIndex(e => e.id === +params.employeeId) : -1;
    if (response && index !== -1) {
      const item = response[index]
      setTimeout(() => {
        setEmployee(item)
        if (item.avatar) {
          setUrl(item.avatar)
        }
        dispatch(setLoadingFalse({}))
      }, 3000);
    }
  }, [params, dispatch])

  const handledReaderLoaded = (obj) => {
    let binaryString = obj.target.result;
    setUrl(btoa(binaryString))
    return btoa(binaryString)
  }

  const onSubmit = (obj) => {
    const data = JSON.parse(JSON.stringify(obj))
    data.id = +employee.id
    if (!url) {
      data.avatar = ''
    } else if (!url.includes("data:image/png;base64,")) {
      data.avatar = "data:image/png;base64," + url;
    } else data.avatar = url;
    data.birth = dayjs(obj.birth).format(birthFormat)

    if (obj.status !== 3) {
      data.startDate = ""
      data.endDate = ""
      dispatch(editEmployee(data))
    } else {
      const timeStartDate = obj.startDate.hour(7).minute(0).second(0).millisecond(0)
      const timeEndDate = obj.endDate.hour(7).minute(0).second(0).millisecond(0)
      data.startDate = dayjs(timeStartDate).format(dateFormat)
      data.endDate = dayjs(timeEndDate).format(dateFormat)
      dispatch(editEmployee(data))
    }
    history.replace('/employees')
  }

  const removeUploadAvatar = () => {
    setUrl('')
    setValue('avatar', { fileList: [] })
  }

  return (
    <div className='page-edit'>
      <PageHeader
        className="content-page-header flex-center"
        title='EDIT EMPLOYEE'>
      </PageHeader>
      {Object.keys(employee).length === 0 || !employee ?
        <div className='flex-center loading-wrapper'>
          <Spin spinning={loading.loading} tip={loading.tip} />
        </div>
        :
        <Row className='row' align='middle' justify='center'>
          <Col span={12}>
            <form
              className='form-add'
              onSubmit={handleSubmit(onSubmit)}>

              <Form.Item
                label="Name"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                className={`${!errors.name ? 'ant-form-item-has-success' : 'ant-form-item-with-help ant-form-item-has-error'}`}>
                <Controller
                  name="name"
                  defaultValue={employee.name}
                  control={control}
                  rules={{
                    required: "This field can't be empty"
                  }}
                  render={({ field }) => (
                    <div className='flex flex-column custom-input'>
                      <Input
                        {...field}
                        placeholder='Input employee name' />
                      {errors.name &&
                        <div className="ant-form-item-explain ant-form-item-explain-connected form-error-text">
                          <div role="alert" className="ant-form-item-explain-error">{errors.name.message}</div>
                        </div>}
                    </div>
                  )} />
              </Form.Item>

              <Form.Item
                label="Gender"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="gender"
                  defaultValue={employee.gender}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group onChange={(e) => onChange(e.target.value)} value={value} defaultValue={1}>
                      <Radio value={1}>Male</Radio>
                      <Radio value={2}>Female</Radio>
                    </Radio.Group>
                  )} />
              </Form.Item>

              <Form.Item
                label="Birth"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="birth"
                  control={control}
                  defaultValue={dayjs(employee.birth)}
                  rules={{
                    validate: {
                      required: v => v || "This field can't be empty",
                    }
                  }}
                  render={({ field, rules }) => (
                    <div className='flex flex-column custom-input'>
                      <DatePicker
                        rule={rules}
                        {...field}
                        disabledDate={disabledWorkAge}
                        format={birthFormat}
                      />
                      {errors.birth &&
                        <div className="ant-form-item-explain ant-form-item-explain-connected form-error-text">
                          <div role="alert" className="ant-form-item-explain-error">{errors.birth.message}</div>
                        </div>}
                    </div>
                  )} />
              </Form.Item>

              <Form.Item
                label="Job"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="job"
                  defaultValue={employee.job}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <Option value={1}>FE Engineer</Option>
                      <Option value={2}>PHP Engineer</Option>
                      <Option value={3}>Mobile Developer</Option>
                      <Option value={4}>Infra Engineer</Option>
                      <Option value={5}>QC & Tester Engineer</Option>
                    </Select>
                  )} />
              </Form.Item>

              <Form.Item
                label="Equipment"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="equipment"
                  control={control}
                  defaultValue={employee.equipment}
                  render={({ field }) => (
                    <Checkbox.Group
                      options={options}
                      {...field}
                      defaultValue={employee.equipment}
                      checked={field['value'] ?? false}
                    />
                  )} />
              </Form.Item>

              <Form.Item
                label="Status"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="status"
                  defaultValue={employee.status}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group onChange={(e) => onChange(e.target.value)} value={value}>
                      <Radio value={1}>NEW</Radio>
                      <Radio value={2}>WORKING</Radio>
                      <Radio value={3}>VACATION</Radio>
                    </Radio.Group>
                  )} />
              </Form.Item>

              {statusCondition
                &&
                <>
                  <Form.Item
                    label="Start Date"
                    labelAlign='left'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    className={`${!errors.startDate ? 'ant-form-item-has-success' : 'ant-form-item-with-help ant-form-item-has-error'}`}>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        validate: {
                          required: v => v || "This field can't be empty",
                          notSame: v =>
                            (getValues('endDate')
                              && v.format('YYYY-MM-DD') !== getValues('endDate').format('YYYY-MM-DD')) || "Please choose valid past day"
                        }
                      }}
                      defaultValue={dayjs(employee.startDate, dateFormat)}
                      render={({ field: { rules, onChange, value } }) => (
                        <div className='flex flex-column custom-input'>
                          <DatePicker
                            rule={rules}
                            onChange={onChange}
                            disabledDate={disabledStartDate}
                            format={dateFormat}
                            defaultValue={employee.startDate ? dayjs(employee.startDate, dateFormat) : dayjs().hour(7).minute(0).second(0).millisecond(0)}
                          />
                          {errors.startDate &&
                            <div className="ant-form-item-explain ant-form-item-explain-connected form-error-text">
                              <div role="alert" className="ant-form-item-explain-error">{errors.startDate.message}</div>
                            </div>}
                        </div>
                      )} />
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    labelAlign='left'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    className={`${!errors.endDate ? 'ant-form-item-has-success' : 'ant-form-item-with-help ant-form-item-has-error'}`}>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        validate: {
                          required: v => v || "This field can't be empty",
                          notSame: v =>
                            (getValues('startDate')
                              && v.format('YYYY-MM-DD') !== getValues('startDate').format('YYYY-MM-DD')) || "Please choose valid future day"
                        }
                      }}
                      defaultValue={dayjs(employee.endDate, dateFormat)}
                      render={({ field: { rules, onChange, value } }) => (
                        <div className='flex flex-column custom-input'>
                          <DatePicker
                            rule={rules}
                            onChange={onChange}
                            disabledDate={disabledEndDate}
                            format={dateFormat}
                            defaultValue={employee.endDate ? dayjs(employee.endDate, dateFormat) : dayjs().add(1, 'day').hour(7).minute(0).second(0).millisecond(0)}
                          />
                          {errors.endDate &&
                            <div className="ant-form-item-explain ant-form-item-explain-connected form-error-text">
                              <div role="alert" className="ant-form-item-explain-error">{errors.endDate.message}</div>
                            </div>}
                        </div>
                      )} />
                  </Form.Item>
                </>}
              <Form.Item
                label="Avatar"
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <div className='custom-upload'>
                      <Upload
                        onChange={onChange}
                        accept='.jpg, .jpeg, .png'
                        maxCount={1}
                        listType='picture'
                        beforeUpload={(file) => {
                          const reader = new FileReader();
                          reader.onload = handledReaderLoaded
                          reader.readAsBinaryString(file)
                          return false
                        }}
                        showUploadList={uploadWatch.fileList.length ? true : false} // return false so that antd doesn't upload the picture right away
                        onRemove={() => removeUploadAvatar()}>
                        <Button icon={<AiOutlineUpload />} className='upload-button'>Click to upload</Button>
                      </Upload>
                      {url && !uploadWatch.fileList.length ?
                        <div className='custom-upload-preview flex'>
                          <div className='image-preview flex-center'>
                            <img src={url} alt='preview-img' />
                          </div>
                          <Button
                            danger
                            icon={<AiOutlineDelete />}
                            className='remove-avatar-button'
                            onClick={() => removeUploadAvatar()}
                          ></Button>
                        </div>
                        : null
                      }
                    </div>
                  )} />
              </Form.Item>

              <Form.Item
                label=""
                wrapperCol={{ offset: 4, span: 20 }}
                className='submit-button-wrapper'>
                <div className='action-group-button'>
                  <Button danger type="primary" htmlType="button" className='cancel-button' onClick={() => history.goBack()}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" className='submit-button'>
                    Save
                  </Button>
                </div>

              </Form.Item>
            </form>
          </Col>
        </Row>}
    </div>
  )
}
